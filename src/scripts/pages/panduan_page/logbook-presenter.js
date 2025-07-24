import { LogbookService } from "./logbook-service";

export class LogbookPresenter {
  constructor(view) {
    this.view = view;
    this.logbookService = new LogbookService();
  }

  async createPost(content, photos) {
    try {
      // Show loading state
      this.setCreatePostLoading(true);

      // Extract files from photo objects
      const files =
        photos && photos.length > 0 ? photos.map((photo) => photo.file) : [];

      console.log("Creating post with:", { content, filesCount: files.length });

      const response = await this.logbookService.createPost({
        content: content,
        files: files,
      });

      if (!response.error) {
        console.log("Post created successfully:", response.data);
        this.clearPostForm();
        await this.loadPosts(); // Refresh posts
        this.showSuccessMessage("Post created successfully!");
        return true;
      } else {
        console.error("Create post failed:", response.data.message);
        this.showErrorMessage(response.data.message || "Failed to create post");
        return false;
      }
    } catch (error) {
      console.error("Error creating post:", error);
      this.showErrorMessage("Network error. Please try again.");
      return false;
    } finally {
      this.setCreatePostLoading(false);
    }
  }

  // Helper method untuk set loading state
  setCreatePostLoading(isLoading) {
    const createBtn = document.querySelector(".create-post-btn");
    if (createBtn) {
      if (isLoading) {
        createBtn.disabled = true;
        createBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Posting...
        `;
      } else {
        createBtn.disabled = false;
        createBtn.innerHTML = "Post";
      }
    }
  }

  // Helper method untuk show success message
  showSuccessMessage(message) {
    this.showNotification(message, "success");
  }

  // Helper method untuk show error message
  showErrorMessage(message) {
    this.showNotification(message, "error");
  }

  // Method untuk show notification
  showNotification(message, type = "info") {
    // Remove existing notification
    const existingNotification = document.querySelector(".notification-toast");
    if (existingNotification) {
      existingNotification.remove();
    }

    const bgColor =
      type === "success"
        ? "bg-green-500"
        : type === "error"
        ? "bg-red-500"
        : "bg-blue-500";

    const notification = `
      <div class="notification-toast fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full">
        <div class="flex items-center">
          <span>${message}</span>
          <button class="ml-4 text-white hover:text-gray-200 close-notification">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", notification);

    const notificationEl = document.querySelector(".notification-toast");

    // Show notification
    setTimeout(() => {
      notificationEl.classList.remove("translate-x-full");
    }, 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
      if (notificationEl) {
        notificationEl.classList.add("translate-x-full");
        setTimeout(() => {
          if (notificationEl) notificationEl.remove();
        }, 300);
      }
    }, 5000);

    // Close button handler
    notificationEl
      .querySelector(".close-notification")
      .addEventListener("click", () => {
        notificationEl.classList.add("translate-x-full");
        setTimeout(() => {
          if (notificationEl) notificationEl.remove();
        }, 300);
      });
  }

  clearPostForm() {
    const textarea = document.querySelector(".post-content-textarea");
    if (textarea) {
      textarea.value = "";
    }

    // Clear selected photos
    this.view.clearSelectedPhotos();
  }

  setupEventListeners() {
    // Event listener untuk create post button
    document.addEventListener("click", async (e) => {
      if (e.target.classList.contains("create-post-btn")) {
        e.preventDefault();

        // Prevent double submit
        if (e.target.disabled) return;

        const textarea = document.querySelector(".post-content-textarea");
        const content = textarea?.value.trim();

        if (!content) {
          this.showErrorMessage("Please enter some content");
          return;
        }

        const photos = this.view.getSelectedPhotos();
        console.log("Photos to upload:", photos);

        await this.createPost(content, photos);
      }

      // Event listener untuk delete post button
      if (e.target.closest(".delete-post-btn")) {
        const postId = e.target.closest(".delete-post-btn").dataset.id;

        if (confirm("Are you sure you want to delete this post?")) {
          await this.deletePost(parseInt(postId));
        }
      }
    });

    // Event listeners untuk pagination
    document.addEventListener("click", async (e) => {
      if (e.target.classList.contains("prev-page-btn")) {
        const currentPage = this.view.postsData.pagination.currentPage;
        if (currentPage > 1) {
          await this.loadPosts(currentPage - 1);
        }
      }

      if (e.target.classList.contains("next-page-btn")) {
        const pagination = this.view.postsData.pagination;
        if (pagination.hasNext) {
          await this.loadPosts(pagination.currentPage + 1);
        }
      }
    });
  }

  async loadPosts(page = 1) {
    try {
      this.view.showLoading();
      const response = await this.logbookService.getAllPosts(page);

      if (!response.error) {
        this.view.showPosts(response.data);
      } else {
        this.view.showError(response.data.message || "Failed to load posts");
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      this.view.showError("Failed to load posts");
    }
  }

  async deletePost(postId) {
    try {
      const response = await this.logbookService.deletePost(postId);

      if (!response.error) {
        await this.loadPosts();
        this.showSuccessMessage("Post deleted successfully!");
        return true;
      } else {
        console.error("Delete post failed:", response.data.message);
        this.showErrorMessage(response.data.message || "Failed to delete post");
        return false;
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      this.showErrorMessage("Network error. Please try again.");
      return false;
    }
  }
}

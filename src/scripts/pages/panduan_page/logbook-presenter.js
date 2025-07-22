// src/views/pages/logbook-presenter.js
import { createPost, getAllPosts, deletePost } from "../../data/api";

export class LogbookPresenter {
  constructor(view) {
    this.view = view;
    this.currentPage = 1;
    this.selectedFile = null;
  }

  async loadPosts(page = 1) {
    try {
      this.view.showLoading();
      this.currentPage = page;

      const response = await getAllPosts(page);

      if (response.error) {
        this.view.showError(response.data.message || "Failed to load posts");
        return;
      }

      this.view.showPosts(response.data.data);
    } catch (error) {
      this.view.showError("Network error occurred");
    }
  }

  setupEventListeners() {
    // Create post event
    const createPostBtn = document.querySelector(".create-post-btn");
    const postContentTextarea = document.querySelector(
      ".post-content-textarea"
    );
    const photoUploadBtn = document.querySelector(".photo-upload-btn");
    const photoUploadInput = document.querySelector(".photo-upload-input");

    if (createPostBtn && postContentTextarea) {
      createPostBtn.addEventListener("click", async () => {
        const content = postContentTextarea.value.trim();

        if (!content) {
          alert("Please enter some content for your post");
          return;
        }

        try {
          createPostBtn.disabled = true;
          createPostBtn.textContent = "Posting...";

          const response = await createPost({
            content,
            file: this.selectedFile,
          });

          if (response.error) {
            alert(response.data.message || "Failed to create post");
            return;
          }

          // Clear form
          postContentTextarea.value = "";
          this.selectedFile = null;
          const fileLabel = photoUploadBtn.querySelector("span");
          if (fileLabel) {
            fileLabel.textContent = "Photo";
          }

          // Reload posts
          await this.loadPosts(this.currentPage);
        } catch (error) {
          alert("An error occurred while creating post");
        } finally {
          createPostBtn.disabled = false;
          createPostBtn.textContent = "Post";
        }
      });
    }

    // Photo upload event
    if (photoUploadBtn && photoUploadInput) {
      photoUploadBtn.addEventListener("click", () => {
        photoUploadInput.click();
      });

      photoUploadInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
          this.selectedFile = e.target.files[0];
          const fileLabel = photoUploadBtn.querySelector("span");
          if (fileLabel) {
            fileLabel.textContent = this.selectedFile.name;
          }
        }
      });
    }

    // Delete post event (using event delegation)
    document.addEventListener("click", async (e) => {
      if (e.target.closest(".delete-post-btn")) {
        const postId = e.target.closest(".delete-post-btn").dataset.id;
        if (confirm("Are you sure you want to delete this post?")) {
          try {
            const response = await deletePost(postId);

            if (response.error) {
              alert(response.data.message || "Failed to delete post");
              return;
            }

            // Reload posts after successful deletion
            await this.loadPosts(this.currentPage);
          } catch (error) {
            alert("An error occurred while deleting post");
          }
        }
      }
    });

    // Pagination events
    const prevPageBtn = document.querySelector(".prev-page-btn");
    const nextPageBtn = document.querySelector(".next-page-btn");

    if (prevPageBtn) {
      prevPageBtn.addEventListener("click", () => {
        if (this.view.postsData.pagination.hasPrev) {
          this.loadPosts(this.currentPage - 1);
        }
      });
    }

    if (nextPageBtn) {
      nextPageBtn.addEventListener("click", () => {
        if (this.view.postsData.pagination.hasNext) {
          this.loadPosts(this.currentPage + 1);
        }
      });
    }
  }
}

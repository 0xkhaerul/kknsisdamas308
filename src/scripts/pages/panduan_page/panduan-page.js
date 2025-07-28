// src/views/pages/logbook-page.js
import { LogbookPresenter } from "./logbook-presenter";

export default class LogbookPage {
  constructor() {
    this.presenter = new LogbookPresenter(this);
    this.postsData = {
      posts: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        hasNext: false,
        hasPrev: false,
      },
    };
    // Array untuk menyimpan foto yang dipilih sementara
    this.selectedPhotos = [];
  }

  // Add this function near the top of the class, after the constructor
  convertMarkdown(text) {
    if (!text) return "";

    // Escape HTML tags to prevent XSS
    const escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Convert **text** to <strong>text</strong> for bold
    const withBold = escaped.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert *text* to <em>text</em> for italics
    const withItalics = withBold.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Convert URLs to links
    const withLinks = withItalics.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" class="text-indigo-600 hover:text-indigo-800 transition-colors">$1</a>'
    );

    // Convert newlines to <br> tags
    const withLineBreaks = withLinks.replace(/\n/g, "<br>");

    return withLineBreaks;
  }

  limitContentLines(content, maxLines = 7) {
    const lines = content.split("\n");
    const isTruncated = lines.length > maxLines;
    const visibleContent = lines.slice(0, maxLines).join("\n");
    return {
      visibleContent,
      isTruncated,
    };
  }

  // Method untuk menambah foto ke preview
  addPhotoToPreview(file) {
    // Check maximum photos limit
    const maxPhotos = 10;
    if (this.selectedPhotos.length >= maxPhotos) {
      console.warn(`Maximum ${maxPhotos} photos allowed`);
      return;
    }

    // Validasi file
    if (!file || !file.type.startsWith("image/")) {
      console.error("Invalid file type:", file?.type);
      return;
    }

    // Check file size (max 5MB per image)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      console.error("File too large:", file.name, "Size:", file.size);
      alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
      return;
    }

    // Cek apakah file sudah ada (berdasarkan nama dan ukuran)
    const existingPhoto = this.selectedPhotos.find(
      (photo) => photo.name === file.name && photo.file.size === file.size
    );

    if (existingPhoto) {
      console.log("Photo already exists:", file.name);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const photoData = {
          id: Date.now() + Math.random(), // ID unik untuk setiap foto
          file: file,
          url: e.target.result,
          name: file.name,
          size: file.size,
        };
        this.selectedPhotos.push(photoData);
        this.updatePhotoPreview();
        this.updatePhotoCount();
        console.log("Photo added successfully:", file.name);
      } catch (error) {
        console.error("Error adding photo to preview:", error);
      }
    };

    reader.onerror = () => {
      console.error("Error reading file:", file.name);
    };

    reader.readAsDataURL(file);
  }

  // Method untuk menghapus foto dari preview
  removePhotoFromPreview(photoId) {
    this.selectedPhotos = this.selectedPhotos.filter(
      (photo) => photo.id !== photoId
    );
    this.updatePhotoPreview();
  }

  // Method untuk update tampilan preview foto
  updatePhotoPreview() {
    // Cek apakah sudah ada container dan grid di DOM
    const previewContainer = document.querySelector(".photo-preview-container");
    if (!previewContainer) {
      console.error("Preview container not found");
      return;
    }

    if (this.selectedPhotos.length === 0) {
      previewContainer.style.display = "none";
      return;
    }

    // Show container first
    previewContainer.style.display = "block";

    // Check if grid already exists
    let previewGrid = previewContainer.querySelector(".photo-preview-grid");

    if (!previewGrid) {
      console.log("Preview grid not found, creating it...");
      // Buat struktur grid jika belum ada
      const gridContainer = document.createElement("div");
      gridContainer.innerHTML = `
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-sm font-medium text-gray-700">Selected Photos</h4>
          <button class="text-sm text-red-500 hover:text-red-700 transition-colors clear-photos-btn">
            Clear All
          </button>
        </div>
        <div class="photo-preview-grid grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <!-- Photo previews will be inserted here -->
        </div>
      `;

      // Clear container dan tambahkan struktur baru
      previewContainer.innerHTML = "";
      previewContainer.appendChild(gridContainer);

      // Get the new grid
      previewGrid = previewContainer.querySelector(".photo-preview-grid");
    }

    if (previewGrid) {
      this.renderPhotosToGrid(previewGrid);
    } else {
      console.error("Failed to create or find preview grid");
    }
  }

  // Method terpisah untuk render photos ke grid
  renderPhotosToGrid(previewGrid) {
    try {
      previewGrid.innerHTML = this.selectedPhotos
        .map(
          (photo) => `
        <div class="relative group">
          <div class="relative pt-[100%] rounded-lg overflow-hidden border-2 border-gray-200">
            <img src="${photo.url}" 
                 alt="${photo.name}" 
                 class="absolute top-0 left-0 w-full h-full object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <button class="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 remove-photo-btn" data-photo-id="${photo.id}">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-1 truncate">${photo.name}</p>
        </div>
      `
        )
        .join("");

      console.log(
        "Photo preview updated successfully, total photos:",
        this.selectedPhotos.length
      );
    } catch (error) {
      console.error("Error rendering photos to grid:", error);
    }
  }

  // Method untuk clear semua foto yang dipilih
  clearSelectedPhotos() {
    this.selectedPhotos = [];
    this.isProcessingFiles = false;
    this.updatePhotoPreview();
    this.updatePhotoCount();

    // Re-enable upload button
    const uploadBtn = document.querySelector(".photo-upload-btn");
    if (uploadBtn) {
      uploadBtn.style.opacity = "1";
      uploadBtn.style.pointerEvents = "auto";
    }
  }

  // Method untuk mendapatkan semua foto yang dipilih
  getSelectedPhotos() {
    return this.selectedPhotos;
  }

   createPostElement(post) {
    // Limit tampilan foto maksimal 3
    const maxDisplayPhotos = 3;
    const totalPhotos = post.images ? post.images.length : 0;
    const displayPhotos = post.images
      ? post.images.slice(0, maxDisplayPhotos)
      : [];
    const remainingPhotos =
      totalPhotos > maxDisplayPhotos ? totalPhotos - maxDisplayPhotos : 0;

    const { visibleContent, isTruncated } = this.limitContentLines(
      post.content
    );

    return `
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 pr-8 post-item" data-id="${
        post.id
      }">
        <div class="flex items-start space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-lg">${post.user.nama_lengkap.charAt(
              0
            )}</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-bold text-gray-900">${
                  post.user.nama_lengkap
                }</h3>
                <p class="text-sm text-gray-500">${new Date(
                  post.created_at
                ).toLocaleString()}</p>
              </div>
              <button class="text-red-500 hover:text-red-700 transition-colors delete-post-btn" data-id="${
                post.id
              }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
         <p class="mt-3 text-gray-700 prose prose-sm text-justify post-content" data-full-content="${encodeURIComponent(
           post.content
         )}">

            ${this.convertMarkdown(visibleContent)}
            ${
              isTruncated
                ? `<span class="text-blue-600 cursor-pointer read-more-btn">Baca Selengkapnya</span>`
                : ""
            }
          </p>
            ${
              totalPhotos > 0
                ? `
              <div class="mt-4 photo-gallery" data-post-id="${post.id}">
                <div class="grid ${
                  totalPhotos === 1
                    ? "grid-cols-1"
                    : totalPhotos === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                } gap-2">
                  ${displayPhotos
                    .map(
                      (image, index) => `
                    <div class="relative cursor-pointer photo-item hover:opacity-90 transition-opacity" 
                         data-photo-index="${index}" 
                         data-photo-url="${image.imageUrl}"
                         data-total-photos="${totalPhotos}">
                      <div class="relative pt-[100%] rounded-lg overflow-hidden">
                        <img src="${image.imageUrl}" 
                             alt="Post image" 
                             class="absolute top-0 left-0 w-full h-full object-cover">
                        ${
                          index === maxDisplayPhotos - 1 && remainingPhotos > 0
                            ? `
                          <div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <span class="text-white text-xl font-bold">+${remainingPhotos}</span>
                          </div>
                        `
                            : ""
                        }
                      </div>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `;
  }
  
  // Method untuk membuat modal photo viewer
  createPhotoModal() {
    const modalHTML = `
    <div id="photo-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-90">
      <div class="relative max-w-4xl max-h-screen w-full h-full flex items-center justify-center p-4">
        
        <!-- Close Button -->
        <button class="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors close-modal-btn">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>

        <!-- Photo Counter -->
        <div class="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm photo-counter">
          1 / 1
        </div>

        <!-- Previous Button -->
        <button class="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors prev-photo-btn">
          <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </button>

        <!-- Next Button -->
        <button class="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors next-photo-btn">
          <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
          </svg>
        </button>

        <!-- Main Photo Container -->
        <div class="w-full h-full flex items-center justify-center">
          <img id="modal-photo" src="" alt="Photo" class="max-w-full max-h-full object-contain rounded-lg">
        </div>

        <!-- Thumbnail Strip (untuk multiple photos) -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 thumbnail-strip hidden">
          <div class="flex space-x-2 bg-black bg-opacity-50 p-2 rounded-lg">
            <!-- Thumbnails akan diisi dinamis -->
          </div>
        </div>
      </div>
    </div>
  `;

    // Hapus modal lama jika ada
    const existingModal = document.getElementById("photo-modal");
    if (existingModal) {
      existingModal.remove();
    }

    // Tambahkan modal ke body
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  // Method untuk membuka photo modal
  openPhotoModal(postId, startIndex = 0) {
    // Ambil semua foto dari post
    const post = this.postsData.posts.find((p) => p.id == postId);
    if (!post || !post.images || post.images.length === 0) return;

    const photos = post.images;
    this.currentModalPhotos = photos;
    this.currentPhotoIndex = startIndex;

    // Buat modal jika belum ada
    if (!document.getElementById("photo-modal")) {
      this.createPhotoModal();
    }

    // Update modal content
    this.updateModalPhoto();

    // Show modal
    const modal = document.getElementById("photo-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  // Method untuk update foto di modal
  updateModalPhoto() {
    if (!this.currentModalPhotos || this.currentModalPhotos.length === 0)
      return;

    const modal = document.getElementById("photo-modal");
    const photoImg = modal.querySelector("#modal-photo");
    const counter = modal.querySelector(".photo-counter");
    const prevBtn = modal.querySelector(".prev-photo-btn");
    const nextBtn = modal.querySelector(".next-photo-btn");
    const thumbnailStrip = modal.querySelector(".thumbnail-strip");

    const currentPhoto = this.currentModalPhotos[this.currentPhotoIndex];
    const totalPhotos = this.currentModalPhotos.length;

    // Update main photo
    photoImg.src = currentPhoto.imageUrl;
    photoImg.alt = `Photo ${this.currentPhotoIndex + 1} of ${totalPhotos}`;

    // Update counter
    counter.textContent = `${this.currentPhotoIndex + 1} / ${totalPhotos}`;

    // Show/hide navigation buttons
    prevBtn.style.display = totalPhotos > 1 ? "block" : "none";
    nextBtn.style.display = totalPhotos > 1 ? "block" : "none";

    // Update thumbnail strip untuk multiple photos
    if (totalPhotos > 1) {
      thumbnailStrip.classList.remove("hidden");
      const thumbnailContainer = thumbnailStrip.querySelector("div");
      thumbnailContainer.innerHTML = this.currentModalPhotos
        .map(
          (photo, index) => `
      <div class="thumbnail-item cursor-pointer ${
        index === this.currentPhotoIndex ? "ring-2 ring-white" : ""
      }" 
           data-index="${index}">
        <img src="${photo.imageUrl}" 
             alt="Thumbnail ${index + 1}" 
             class="w-12 h-12 object-cover rounded">
      </div>
    `
        )
        .join("");
    } else {
      thumbnailStrip.classList.add("hidden");
    }

    // Disable/enable navigation buttons
    prevBtn.style.opacity = this.currentPhotoIndex === 0 ? "0.5" : "1";
    nextBtn.style.opacity =
      this.currentPhotoIndex === totalPhotos - 1 ? "0.5" : "1";
  }

  // Method untuk navigasi foto
  navigatePhoto(direction) {
    if (!this.currentModalPhotos) return;

    const totalPhotos = this.currentModalPhotos.length;

    if (direction === "prev" && this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
      this.updateModalPhoto();
    } else if (
      direction === "next" &&
      this.currentPhotoIndex < totalPhotos - 1
    ) {
      this.currentPhotoIndex++;
      this.updateModalPhoto();
    }
  }

  // Method untuk menutup modal
  closePhotoModal() {
    const modal = document.getElementById("photo-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }

    // Restore body scroll
    document.body.style.overflow = "";

    // Reset data
    this.currentModalPhotos = null;
    this.currentPhotoIndex = 0;
  }

  // Setup event listeners untuk photo modal
  setupPhotoModalListeners() {
    // Photo click events
    document.addEventListener("click", (e) => {
      // Open modal when clicking on photo
      if (e.target.closest(".photo-item")) {
        e.preventDefault();
        const photoItem = e.target.closest(".photo-item");
        const postId = photoItem.closest(".photo-gallery").dataset.postId;
        const photoIndex = parseInt(photoItem.dataset.photoIndex);

        this.openPhotoModal(postId, photoIndex);
      }

      // Close modal
      if (
        e.target.classList.contains("close-modal-btn") ||
        e.target.closest(".close-modal-btn") ||
        (e.target.id === "photo-modal" && e.target === e.currentTarget)
      ) {
        this.closePhotoModal();
      }

      // Navigate photos
      if (
        e.target.classList.contains("prev-photo-btn") ||
        e.target.closest(".prev-photo-btn")
      ) {
        this.navigatePhoto("prev");
      }

      if (
        e.target.classList.contains("next-photo-btn") ||
        e.target.closest(".next-photo-btn")
      ) {
        this.navigatePhoto("next");
      }

      // Thumbnail navigation
      if (e.target.closest(".thumbnail-item")) {
        const index = parseInt(
          e.target.closest(".thumbnail-item").dataset.index
        );
        this.currentPhotoIndex = index;
        this.updateModalPhoto();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      const modal = document.getElementById("photo-modal");
      if (!modal || modal.classList.contains("hidden")) return;

      switch (e.key) {
        case "Escape":
          this.closePhotoModal();
          break;
        case "ArrowLeft":
          this.navigatePhoto("prev");
          break;
        case "ArrowRight":
          this.navigatePhoto("next");
          break;
      }
    });
  }

  async render() {
    await this.presenter.loadPosts();
    return `
      <section class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 logbook-container">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col xl:flex-row gap-8">
            
            <!-- Sidebar -->
            <div class="lg:w-64 shrink-0">
              <div class="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-8">
                <div class="p-6">
                  <h2 class="text-xl font-bold text-gray-800 mb-6">Navigation</h2>
                  <nav class="space-y-2">
                    <a href="#/logbook" class="flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium transition-colors">
                      <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                      </svg>
                      Logbook
                    </a>
                    <a href="#/program" class="flex items-center px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                      <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Program
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            <!-- Main Content -->
            <div class="flex-1">
              <!-- Header -->
              <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Logbook</h1>
                <p class="text-gray-600">Share your daily activities and thoughts</p>
              </div>

              <!-- Create Post Card -->
              <div class="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
                <div class="p-6">
                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-lg">U</span>
                    </div>
                    <div class="flex-1">
                      <textarea 
                        class="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all post-content-textarea" 
                        rows="4" 
                        placeholder="What's happening today?"></textarea>
                      
                      <!-- Photo Preview Container -->
                      <div class="photo-preview-container mt-4" style="display: none;">
                        <div class="flex items-center justify-between mb-3">
                          <h4 class="text-sm font-medium text-gray-700">Selected Photos</h4>
                          <button class="text-sm text-red-500 hover:text-red-700 transition-colors clear-photos-btn">
                            Clear All
                          </button>
                        </div>
                        <div class="photo-preview-grid grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                          <!-- Photo previews will be inserted here -->
                        </div>
                      </div>

                      <!-- Post Options -->
                      <div class="flex items-center justify-between mt-4">
                        <div class="flex items-center space-x-4">
                          <label class="flex items-center text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer photo-upload-btn">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                            </svg>
                            Add Photos
                            <input type="file" accept="image/*" multiple class="hidden photo-upload-input">
                          </label>
                          <span class="text-sm text-gray-400 photo-count-text">0 photos selected</span>
                        </div>
                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors create-post-btn">
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Posts Feed -->
              <div class="space-y-6 posts-feed-container">
                ${this.postsData.posts
                  .map((post) => this.createPostElement(post))
                  .join("")}
              </div>

              <!-- Pagination -->
              ${
                this.postsData.pagination &&
                this.postsData.pagination.totalPages > 1
                  ? `
              <div class="flex items-center justify-between mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                <button class="px-4 py-2 rounded-lg border ${
                  !this.postsData.pagination.hasPrev
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50"
                } prev-page-btn">
                  Previous
                </button>
                <span class="text-gray-600 pagination-info">
                  Page ${this.postsData.pagination.currentPage || 1} of ${
                      this.postsData.pagination.totalPages || 1
                    }
                </span>
                <button class="px-4 py-2 rounded-lg border ${
                  !this.postsData.pagination.hasNext
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50"
                } next-page-btn">
                  Next
                </button>
              </div>
              `
                  : ""
              }
            </div>

            <!-- Right Sidebar - University Info -->
            <div class="xl:w-64 shrink-0 order-first xl:order-last">
              <div class="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-8">
                <div class="p-6">
                  <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                      </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900">UIN Sunan Gunung Djati</h3>
                    <p class="text-sm text-gray-600">Bandung</p>
                  </div>

                  <div class="space-y-4 text-sm text-gray-600">
                    <div>
                      <h4 class="font-semibold text-gray-800 mb-2">About University</h4>
                      <p class="leading-relaxed">
                        Universitas Islam Negeri Sunan Gunung Djati Bandung is a leading Islamic university committed to excellence in education, research, and community service.
                      </p>
                    </div>

                    <div>
                      <h4 class="font-semibold text-gray-800 mb-2">Campus Location</h4>
                      <p class="leading-relaxed">
                        Jl. A.H. Nasution No. 105<br>
                        Cipadung, Cibiru<br>
                        Kota Bandung, Jawa Barat
                      </p>
                    </div>

                    <div>
                      <h4 class="font-semibold text-gray-800 mb-2">Quick Links</h4>
                      <div class="space-y-2">
                        <a href="#" class="block text-indigo-600 hover:text-indigo-800 transition-colors">Academic Portal</a>
                        <a href="#" class="block text-indigo-600 hover:text-indigo-800 transition-colors">Student Services</a>
                        <a href="#" class="block text-indigo-600 hover:text-indigo-800 transition-colors">Library</a>
                        <a href="#" class="block text-indigo-600 hover:text-indigo-800 transition-colors">Research Center</a>
                      </div>
                    </div>

                    <div class="pt-4 border-t border-gray-200">
                      <p class="text-xs text-gray-500 leading-relaxed">
                        © 2024 UIN Sunan Gunung Djati Bandung<br>
                        All rights reserved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  afterRender() {
    this.presenter.setupEventListeners();

    // Setup photo preview listeners
    setTimeout(() => {
      this.setupPhotoPreviewListeners();
      this.setupPhotoModalListeners();

      // Fixed read more functionality
      document.querySelectorAll(".read-more-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const contentElement = e.target.closest(".post-content");
          const fullContent = decodeURIComponent(
            contentElement.getAttribute("data-full-content")
          );
          contentElement.innerHTML = this.convertMarkdown(fullContent);
        });
      });
    }, 200);
  }

  // Setup event listeners untuk photo preview
  setupPhotoPreviewListeners() {
    // Hapus event listeners yang mungkin sudah ada sebelumnya
    if (this.photoChangeHandler) {
      document.removeEventListener("change", this.photoChangeHandler);
    }
    if (this.photoClickHandler) {
      document.removeEventListener("click", this.photoClickHandler);
    }

    // Flag untuk mencegah multiple processing
    this.isProcessingFiles = false;

    // Handle file selection dengan flag protection
    this.photoChangeHandler = (e) => {
      if (e.target && e.target.classList.contains("photo-upload-input")) {
        // Prevent multiple processing
        if (this.isProcessingFiles) {
          console.log("Already processing files, ignoring...");
          return;
        }

        this.isProcessingFiles = true;
        console.log("Files selected:", e.target.files.length);

        const files = Array.from(e.target.files);

        if (files.length === 0) {
          console.log("No files selected");
          this.isProcessingFiles = false;
          return;
        }

        // Process each file
        files.forEach((file, index) => {
          console.log(`Processing file ${index + 1}:`, file.name, file.type);
          if (file.type.startsWith("image/")) {
            this.addPhotoToPreview(file);
          } else {
            console.warn("Skipping non-image file:", file.name, file.type);
          }
        });

        // Reset input dan flag setelah processing selesai
        setTimeout(() => {
          if (e.target) {
            e.target.value = "";
          }
          this.isProcessingFiles = false;
          console.log("File processing completed");
        }, 300);

        this.updatePhotoCount();
      }
    };

    // Handle clicks untuk clear photos dan remove individual photos SAJA
    this.photoClickHandler = (e) => {
      // Handle clear all photos
      if (e.target.closest(".clear-photos-btn")) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Clear photos button clicked!");
        this.clearSelectedPhotos();
        this.updatePhotoCount();
        return;
      }

      // Handle individual photo removal
      if (e.target.closest(".remove-photo-btn")) {
        e.preventDefault();
        e.stopPropagation();
        const photoId = parseFloat(
          e.target.closest(".remove-photo-btn").dataset.photoId
        );
        console.log("Removing photo with ID:", photoId);
        this.removePhotoFromPreview(photoId);
        this.updatePhotoCount();
        return;
      }
    };

    // Add event listeners dengan specific options
    document.addEventListener("change", this.photoChangeHandler, {
      passive: false, // Allow preventing default if needed
      once: false, // Allow multiple uses
    });
    document.addEventListener("click", this.photoClickHandler, {
      passive: false,
    });

    console.log("Photo preview listeners setup completed");
  }

  // Update photo count text
  updatePhotoCount() {
    const photoCountText = document.querySelector(".photo-count-text");
    if (photoCountText) {
      const count = this.selectedPhotos.length;
      const maxPhotos = 10; // Set maximum photos limit

      if (count >= maxPhotos) {
        photoCountText.textContent = `Maximum ${maxPhotos} photos reached`;
        photoCountText.classList.add("text-red-500");

        // Disable upload button
        const uploadBtn = document.querySelector(".photo-upload-btn");
        if (uploadBtn) {
          uploadBtn.style.opacity = "0.5";
          uploadBtn.style.pointerEvents = "none";
        }
      } else {
        photoCountText.textContent = `${count} photo${
          count !== 1 ? "s" : ""
        } selected`;
        photoCountText.classList.remove("text-red-500");

        // Enable upload button
        const uploadBtn = document.querySelector(".photo-upload-btn");
        if (uploadBtn) {
          uploadBtn.style.opacity = "1";
          uploadBtn.style.pointerEvents = "auto";
        }
      }
    }
  }

  showPosts(apiResponse) {
    // Extract data from API response structure
    this.postsData = apiResponse.data || apiResponse;

    const postsContainer = document.querySelector(".posts-feed-container");
    if (postsContainer) {
      postsContainer.innerHTML = this.postsData.posts
        .map((post) => this.createPostElement(post))
        .join("");
    }

    // Update pagination if exists
    this.updatePaginationDisplay();
  }

  updatePaginationDisplay() {
    const paginationContainer = document.querySelector(".pagination-container");
    if (paginationContainer && this.postsData.pagination) {
      const pagination = this.postsData.pagination;
      const paginationInfo = document.querySelector(".pagination-info");
      if (paginationInfo) {
        paginationInfo.textContent = `Page ${pagination.currentPage} of ${pagination.totalPages}`;
      }

      // Update button states
      const prevBtn = document.querySelector(".prev-page-btn");
      const nextBtn = document.querySelector(".next-page-btn");

      if (prevBtn) {
        prevBtn.disabled = !pagination.hasPrev;
        prevBtn.classList.toggle("opacity-50", !pagination.hasPrev);
        prevBtn.classList.toggle("cursor-not-allowed", !pagination.hasPrev);
      }

      if (nextBtn) {
        nextBtn.disabled = !pagination.hasNext;
        nextBtn.classList.toggle("opacity-50", !pagination.hasNext);
        nextBtn.classList.toggle("cursor-not-allowed", !pagination.hasNext);
      }
    }
  }

  showLoading() {
    const postsContainer = document.querySelector(".posts-feed-container");
    if (postsContainer) {
      postsContainer.innerHTML =
        '<div class="text-center py-8">Loading posts...</div>';
    }
  }

  showError(message) {
    const postsContainer = document.querySelector(".posts-feed-container");
    if (postsContainer) {
      postsContainer.innerHTML = `<div class="text-center py-8 text-red-500">${message}</div>`;
    }
  }
}

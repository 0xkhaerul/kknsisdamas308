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
  }

  // src/views/pages/logbook-page.js
  createPostElement(post) {
    const isCurrentUserPost =
      post.userId === parseInt(localStorage.getItem("userId") || "0");

    return `
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 post-item" data-id="${
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
              <h3 class="font-bold text-gray-900">${post.user.nama_lengkap}</h3>
              <p class="text-sm text-gray-500">${new Date(
                post.created_at
              ).toLocaleString()}</p>
            </div>
            ${
              isCurrentUserPost
                ? `
              <button class="text-red-500 hover:text-red-700 delete-post-btn" data-id="${post.id}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            `
                : ""
            }
          </div>
          <p class="mt-3 text-gray-700 post-content">${post.content}</p>
          ${
            post.image_content_url
              ? `
            <div class="mt-4 rounded-lg overflow-hidden">
              <img src="${post.image_content_url}" alt="Post image" class="w-full h-auto max-h-96 object-cover rounded-lg">
            </div>
          `
              : ""
          }
        </div>
      </div>
    </div>
  `;
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
                      
                      <!-- Post Options -->
                      <div class="flex items-center justify-between mt-4">
                        <div class="flex items-center space-x-4">
                          <button class="flex items-center text-gray-500 hover:text-indigo-600 transition-colors photo-upload-btn">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                            </svg>
                            Photo
                            <input type="file" accept="image/*" class="hidden photo-upload-input">
                          </button>
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
  }

  showPosts(postsData) {
    this.postsData = postsData;
    const postsContainer = document.querySelector(".posts-feed-container");
    if (postsContainer) {
      postsContainer.innerHTML = this.postsData.posts
        .map((post) => this.createPostElement(post))
        .join("");
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

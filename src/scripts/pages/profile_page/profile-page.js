export default class ProfilePage {
  async render() {
    return `
      <div class="max-w-3xl mx-auto p-6">   
        <!-- Profile Content Container -->
        <div id="profile-content" class="mb-8">
          <!-- Loading State -->
          <div class="loading flex flex-col items-center justify-center py-12" id="loading-spinner">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p class="text-gray-600">Loading profile...</p>
          </div>
          
          <!-- Error State -->
          <div class="error hidden" id="error-message">
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div class="flex justify-center mb-4">
                <svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <p class="text-red-800 font-medium mb-4" id="error-text">Something went wrong</p>
              <button id="retry-btn" class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                Try Again
              </button>
            </div>
          </div>
          
          <!-- Profile Info -->
          <div class="profile-info hidden" id="profile-info">
            <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <!-- Profile Header -->
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
                <div class="flex items-center">
                  <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h2 class="text-2xl font-bold text-white" id="header-name">Loading...</h2>
                    <p class="text-blue-100" id="header-email">Loading...</p>
                  </div>
                </div>
              </div>
              
              <!-- Profile Details -->
              <div class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Name Field -->
                  <div class="profile-field">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span class="text-gray-800 font-medium" id="user-name">Loading...</span>
                    </div>
                  </div>
                  
                  <!-- Email Field -->
                  <div class="profile-field">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-gray-800 font-medium" id="user-email">Loading...</span>
                    </div>
                  </div>
                  
                  <!-- Member Since Field -->
                  <div class="profile-field">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-gray-800 font-medium" id="user-created">Loading...</span>
                    </div>
                  </div>
                </div>
                
                <!-- Last Updated -->
                <div class="pt-4 border-t border-gray-200">
                  <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>Last updated:</span>
                    <span id="user-updated" class="font-medium">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- History Section -->
        <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-6 md:p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">My Check History</h2>
            
            <div class="flex border-b border-gray-200 mb-4">
              <button id="tab-retina" class="tab-button flex-1 py-2 text-center font-medium border-b-2">
                Retina Checks
              </button>
              <button id="tab-form" class="tab-button flex-1 py-2 text-center font-medium border-b-2">
                Form Checks
              </button>
            </div>

            <div id="history-content-container" class="space-y-4 min-h-[300px]">
            </div>

            <div id="pagination-controls" class="flex justify-between items-center mt-6 hidden">
              <button id="prev-page-btn" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <span id="page-indicator" class="text-sm text-gray-600"></span>
              <button id="next-page-btn" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal for check details -->
      <div id="profile-check-details-modal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50 hidden">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 z-10">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-800" id="modal-title">Check Details</h3>
              <button id="modal-close-button" class="text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
            </div>
          </div>
          <div id="modal-content-area" class="p-6"></div>
        </div>
      </div>
    `;
  }

  async afterRender() {}
}

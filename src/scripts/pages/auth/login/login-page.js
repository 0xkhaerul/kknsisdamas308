import LoginPresenter from "./login-presenter.js";

export default class LoginPage {
  #presenter;
  #formElements = {
    form: null,
    email: null,
    password: null,
    errorMessage: null,
    submitButton: null,
  };

  constructor() {
    this.#presenter = new LoginPresenter(this);
  }

  async render() {
    return `
    <style>
     .bg-pattern {
            background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        @media (max-width: 640px) {
            .mobile-padding {
                padding-left: 1rem;
                padding-right: 1rem;
            }
            
            .mobile-form {
                margin-left: 0.5rem;
                margin-right: 0.5rem;
            }
        }
        
        .form-container {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.95);
        }
    </style>
    

      <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style="background-image: url('/assets/images/background-image3.png'); background-size: cover; background-position: center;">
        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div class="flex items-center justify-center mx-auto mb-4 text-blue-600">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login ke Akun Anda
          </h2>

        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
            <form id="loginForm" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Alamat Email
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input id="email" name="email" type="email" autocomplete="email" required
                        class="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="anda@email.com">
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-lock text-gray-400"></i>
                  </div>
                  <input id="password" name="password" type="password" autocomplete="current-password" required
                        class="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Password Anda">
                </div>
              </div>
              
              <div id="errorMessage" class="text-red-600 text-sm text-center hidden py-2 px-4 bg-red-50 border border-red-200 rounded-md"></div>

              <div>
                <button type="submit"
                        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <i class="fas fa-sign-in-alt mr-2 mt-0.5"></i>Login
                </button>
              </div>
              <p class="mt-2 text-center text-sm text-gray-600">
                Atau
                <a href="#/register" class="font-medium text-blue-600 hover:text-blue-500">
                  buat akun baru
                </a>
              </p>
            </form>

          </div>
        </div>
      </div>

    `;
  }

  async afterRender() {
    // Cache form elements
    this.#formElements = {
      form: document.getElementById("loginForm"),
      email: document.getElementById("email"),
      password: document.getElementById("password"),
      errorMessage: document.getElementById("errorMessage"),
      submitButton: document.querySelector("#loginForm button[type='submit']"),
    };

    // Set up event listeners
    this.#formElements.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.#presenter.handleLogin();
    });
  }

  getFormData() {
    return {
      email: this.#formElements.email.value,
      password: this.#formElements.password.value,
    };
  }

  showError(message) {
    this.#formElements.errorMessage.textContent = message;
    this.#formElements.errorMessage.style.display = "block";
    this.#formElements.errorMessage.className = "error-message";
  }

  clearError() {
    this.#formElements.errorMessage.textContent = "";
    this.#formElements.errorMessage.style.display = "none";
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.#formElements.submitButton.disabled = true;
      this.#formElements.submitButton.textContent = "Logging in...";
    } else {
      this.#formElements.submitButton.disabled = false;
      this.#formElements.submitButton.textContent = "Login";
    }
  }

  navigateTo(path) {
    window.location.hash = path;
  }
}

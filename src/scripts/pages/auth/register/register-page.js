import RegisterPresenter from "./register-presenter.js";

export default class RegisterPage {
  #presenter;
  #formElements = {
    form: null,
    nama_lengkap: null,
    email: null,
    password: null,
    confirmPassword: null,
    errorMessage: null,
    submitButton: null,
  };

  constructor() {
    this.#presenter = new RegisterPresenter(this);
  }

  async render() {
    return `
     <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style="background-image: url('/assets/images/background-image3.png'); background-size: cover; background-position: center;">
        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div class="flex items-center justify-center mx-auto mb-4 text-blue-600">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Buat Akun Baru
          </h2>
          
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
            <form id="registerForm" class="space-y-6">
              <div>
                <label for="nama_lengkap" class="block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-user text-gray-400"></i>
                  </div>
                  <input id="nama_lengkap" name="nama_lengkap" type="text" autocomplete="name" required
                        class="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Nama Lengkap Anda">
                </div>
              </div>
              
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
                  <input id="password" name="password" type="password" autocomplete="new-password" required minlength="8"
                        class="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Minimal 8 karakter">
                </div>
              </div>

              <div>
                <label for="confirm-password" class="block text-sm font-medium text-gray-700">
                  Konfirmasi Password
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-lock text-gray-400"></i>
                  </div>
                  <input id="confirm-password" name="confirm-password" type="password" autocomplete="new-password" required minlength="8"
                        class="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Ulangi password Anda">
                </div>
              </div>
              
              <div id="errorMessage" class="text-red-600 text-sm text-center hidden py-2 px-4 bg-red-50 border border-red-200 rounded-md"></div>

              <div>
                <button type="submit"
                        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <i class="fas fa-user-plus mr-2 mt-0.5"></i>Register
                </button>
              </div>
              <p class="mt-2 text-center text-sm text-gray-600">
                Sudah punya akun?
                <a href="#/login" class="font-medium text-blue-600 hover:text-blue-500">
                  Login di sini
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

    `;
  }

  async afterRender() {
    this.#formElements = {
      form: document.getElementById("registerForm"),
      nama_lengkap: document.getElementById("nama_lengkap"),
      email: document.getElementById("email"),
      password: document.getElementById("password"),
      confirmPassword: document.getElementById("confirm-password"),
      errorMessage: document.getElementById("errorMessage"),
      submitButton: document.querySelector(
        "#registerForm button[type='submit']"
      ),
    };

    // Set up event listeners
    this.#formElements.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.#presenter.handleRegister();
    });
  }

  getFormData() {
    return {
      nama_lengkap: this.#formElements.nama_lengkap.value,
      email: this.#formElements.email.value,
      password: this.#formElements.password.value,
      confirmPassword: this.#formElements.confirmPassword.value,
    };
  }

  showError(message) {
    this.#formElements.errorMessage.textContent = message;
    this.#formElements.errorMessage.style.display = "block";
    this.#formElements.errorMessage.className = "error-message";
  }

  showSuccess(message) {
    this.#formElements.errorMessage.textContent = message;
    this.#formElements.errorMessage.style.display = "block";
    this.#formElements.errorMessage.className = "success-message";
  }

  clearError() {
    this.#formElements.errorMessage.textContent = "";
    this.#formElements.errorMessage.style.display = "none";
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.#formElements.submitButton.disabled = true;
      this.#formElements.submitButton.textContent = "Registering...";
    } else {
      this.#formElements.submitButton.disabled = false;
      this.#formElements.submitButton.textContent = "Register";
    }
  }

  // Tambahkan method navigateToOtp
  navigateToOtp() {
    window.location.hash = "#/login";
  }
}

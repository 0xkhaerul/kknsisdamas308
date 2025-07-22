import { login } from "../../../data/api.js";
import { putAccessToken } from "../../../utils/auth.js";

export default class LoginPresenter {
  #view;
  #authService;

  constructor(view, authService = { login, putAccessToken }) {
    this.#view = view;
    this.#authService = authService;
  }

  async handleLogin() {
    try {
      this.#view.clearError();
      const formData = this.#view.getFormData();

      // Validate form data
      if (!this.#validateFormData(formData)) {
        return;
      }

      // Show loading state
      this.#view.setLoading(true);

      // Call the login API
      const response = await this.#authService.login({
        email: formData.email,
        password: formData.password,
      });

      // Hide loading state
      this.#view.setLoading(false);

      if (response.error) {
        const errorMessage =
          response.data?.message ||
          response.data?.error ||
          "Login failed. Please try again.";
        this.#view.showError(errorMessage);
        return;
      }

      if (!response.data?.token) {
        this.#view.showError("Invalid response from server");
        return;
      }

      this.#handleLoginSuccess(response.data);
    } catch (error) {
      console.error("Login error:", error);
      this.#view.setLoading(false);
      this.#view.showError(
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  }

  #validateFormData(formData) {
    if (!formData.email || !formData.password) {
      this.#view.showError("Email and password must be filled");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      this.#view.showError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      this.#view.showError("Password must be at least 6 characters");
      return false;
    }

    return true;
  }

  #handleLoginSuccess(data) {
    this.#authService.putAccessToken(data.token);
    this.#view.navigateTo("#/logbook");
  }
}

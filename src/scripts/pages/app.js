// pages/app.js
import routes from "../routes/routes";
import { getActiveRoute, parseActivePathname } from "../routes/url-parser";
import { isAuthenticated, removeAccessToken } from "../utils/auth";

class App {
  constructor({ content, drawerButton, navigationDrawer }) {
    this.content = content;
    this.drawerButton = drawerButton;
    this.navigationDrawer = navigationDrawer;
    this._initAppShell();
    this._setupSkipToContent();
  }

  _initAppShell() {
    this._setupDrawer();
    this._setupNavigation();
    this._setupLogout();
  }

  _setupSkipToContent() {
    if (!document.querySelector(".skip-to-content")) {
      const skipLink = document.createElement("a");
      skipLink.className = "skip-to-content";
      skipLink.href = "#main-content";
      skipLink.textContent = "Skip to content";
      document.body.insertBefore(skipLink, document.body.firstChild);

      skipLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.content.setAttribute("tabindex", "-1");
        this.content.focus();
        this.content.scrollIntoView();
      });
    }
  }

  _setupDrawer() {
    if (this.drawerButton) {
      this.drawerButton.addEventListener("click", (event) => {
        this.navigationDrawer.classList.toggle("open");
        event.stopPropagation();
      });
    }

    document.addEventListener("click", (event) => {
      if (
        this.navigationDrawer &&
        !this.navigationDrawer.contains(event.target) &&
        this.navigationDrawer.classList.contains("open")
      ) {
        this.navigationDrawer.classList.remove("open");
      }
    });
  }

  _setupNavigation() {
    this._updateNavigation();

    window.addEventListener("hashchange", () => {
      this._updateNavigation();
    });
  }

  _updateNavigation() {
    const isLoggedIn = isAuthenticated();

    // Desktop elements
    const loginContainer = document.getElementById("login-container");
    const registerContainer = document.getElementById("register-container");
    const profileContainer = document.getElementById("profile-container");
    const diabetesCheckedUserContainer = document.getElementById(
      "diabetes-checked-user-container"
    );

    // Mobile elements
    const mobileLoginContainer = document.getElementById(
      "mobile-login-container"
    );
    const mobileRegisterContainer = document.getElementById(
      "mobile-register-container"
    );
    const mobileProfileContainer = document.getElementById(
      "mobile-profile-container"
    );
    const mobileLogoutContainer = document.getElementById(
      "mobile-logout-container"
    );
    const mobileDiabetesCheckedUserContainer = document.getElementById(
      "mobile-diabetes-checked-user-container"
    );

    if (isLoggedIn) {
      // Desktop - User is logged in
      if (diabetesCheckedUserContainer)
        diabetesCheckedUserContainer.style.display = "block";
      if (loginContainer) loginContainer.style.display = "none";
      if (registerContainer) registerContainer.style.display = "none";
      if (profileContainer) profileContainer.classList.remove("hidden");

      // Mobile - User is logged in
      if (mobileDiabetesCheckedUserContainer)
        mobileDiabetesCheckedUserContainer.style.display = "block";
      if (mobileLoginContainer) mobileLoginContainer.style.display = "none";
      if (mobileRegisterContainer)
        mobileRegisterContainer.style.display = "none";
      if (mobileProfileContainer)
        mobileProfileContainer.classList.remove("hidden");
      if (mobileLogoutContainer)
        mobileLogoutContainer.classList.remove("hidden");
    } else {
      // Desktop - User is not logged in
      if (diabetesCheckedUserContainer)
        diabetesCheckedUserContainer.style.display = "none";
      if (loginContainer) loginContainer.style.display = "block";
      if (registerContainer) registerContainer.style.display = "block";
      if (profileContainer) profileContainer.classList.add("hidden");

      // Mobile - User is not logged in
      if (mobileDiabetesCheckedUserContainer)
        mobileDiabetesCheckedUserContainer.style.display = "none";
      if (mobileLoginContainer) mobileLoginContainer.style.display = "block";
      if (mobileRegisterContainer)
        mobileRegisterContainer.style.display = "block";
      if (mobileProfileContainer)
        mobileProfileContainer.classList.add("hidden");
      if (mobileLogoutContainer) mobileLogoutContainer.classList.add("hidden");
    }
  }

  _setupLogout() {
    // Desktop logout
    const dropdownLogout = document.getElementById("dropdown-logout");
    if (dropdownLogout) {
      dropdownLogout.addEventListener("click", (event) => {
        event.preventDefault();
        this._handleLogout();
      });
    }

    // Mobile logout
    const mobileLogout = document.getElementById("mobile-logout");
    if (mobileLogout) {
      mobileLogout.addEventListener("click", (event) => {
        event.preventDefault();
        this._handleLogout();
      });
    }
  }

  _handleLogout() {
    removeAccessToken();
    window.location.hash = "#/login";
    this._updateNavigation();
  }

  async renderPage() {
    const activeRoute = getActiveRoute();
    const routeConfig = routes[activeRoute];

    if (!routeConfig) {
      this.content.innerHTML = `<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 text-center">
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
        <div class="text-9xl font-bold text-indigo-600">404</div>
        <h1 class="text-3xl font-bold text-gray-800">Oops! Page Not Found</h1>
        <p class="text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="pt-4">
          <a href="/" class="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  `;
      return;
    }

    if (routeConfig.check && !routeConfig.check()) {
      return;
    }

    try {
      const page = routeConfig.page;
      const urlParams = parseActivePathname();

      if (document.startViewTransition) {
        document.startViewTransition(async () => {
          this.content.innerHTML = await page.render(urlParams);
          await page.afterRender(urlParams);
          this._updateNavigation();
        });
      } else {
        this.content.innerHTML = await page.render(urlParams);
        await page.afterRender(urlParams);
        this._updateNavigation();
      }
    } catch (error) {
      console.error("Error rendering page:", error);
      this.content.innerHTML = "<p>Error loading page</p>";
    }
  }
}

export default App;

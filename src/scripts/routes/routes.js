import BacaanPage from "../pages/bacaan_page/bacaan-page";
import LogbookPage from "../pages/panduan_page/panduan-page";
import ProfilePage from "../pages/profile_page/profile-page";
import LandingPage from "../pages/landing_page/landing-page";
import ProgramPage from "../pages/program_page/program-page";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import { checkAuth, checkUnauth } from "../utils/auth";

const createProtectedRoute = (PageClass) => {
  return {
    page: new PageClass(),
    check: checkAuth,
  };
};

const createUnauthenticatedRoute = (PageClass) => {
  return {
    page: new PageClass(),
    check: checkUnauth,
  };
};

const createPublicRoute = (PageClass) => {
  return {
    page: new PageClass(),
    check: () => true,
  };
};

const routes = {
  "/": createPublicRoute(LandingPage),
  "/bacaan": createPublicRoute(BacaanPage),
  "/logbook": createPublicRoute(LogbookPage),
  "/logbook-individu": createPublicRoute(ProgramPage),
  "/profile": createProtectedRoute(ProfilePage),
  "/login": createUnauthenticatedRoute(LoginPage),
  "/register": createUnauthenticatedRoute(RegisterPage),
};

export default routes;

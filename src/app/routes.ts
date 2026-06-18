import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import UnsubscribePage from "./pages/UnsubscribePage";
import BlogListPage from "./pages/blog/BlogListPage";
import BlogPostPage from "./pages/blog/BlogPostPage";

export const router = createBrowserRouter([
  { index: true, Component: LandingPage },
  { path: "dang-nhap", Component: LoginPage },
  { path: "blog", Component: BlogListPage },
  { path: "blog/:slug", Component: BlogPostPage },
  { path: "unsubscribe", Component: UnsubscribePage },
  { path: "*", Component: LandingPage },
]);

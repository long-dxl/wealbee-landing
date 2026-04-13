import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import PricingPage from "./pages/PricingPage";
import FeedbackPage from "./pages/FeedbackPage";
import UnsubscribePage from "./pages/UnsubscribePage";
import BlogListPage from "./pages/blog/BlogListPage";
import BlogPostPage from "./pages/blog/BlogPostPage";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/start", Component: OnboardingPage },
  { path: "/pricing", Component: PricingPage },
  { path: "/feedback", Component: FeedbackPage },
  { path: "/unsubscribe", Component: UnsubscribePage },
  // Blog
  { path: "/blog", Component: BlogListPage },
  { path: "/blog/:slug", Component: BlogPostPage },
]);
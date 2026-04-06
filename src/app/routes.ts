import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import PricingPage from "./pages/PricingPage";
import FeedbackPage from "./pages/FeedbackPage";
import UnsubscribePage from "./pages/UnsubscribePage";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/start", Component: OnboardingPage },
  { path: "/pricing", Component: PricingPage },
  { path: "/feedback", Component: FeedbackPage },
  { path: "/unsubscribe", Component: UnsubscribePage },
]);
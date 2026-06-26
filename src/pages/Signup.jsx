// The Signup page now just renders the shared <Auth /> component in "signup" mode.
// All the actual form markup and logic lives in src/components/Auth.jsx.
import Auth from "../components/Auth.jsx";

export default function Signup() {
  return <Auth mode="signup" />;
}

// The Login page now just renders the shared <Auth /> component in "login" mode.
// All the actual form markup and logic lives in src/components/Auth.jsx.
import Auth from "../components/Auth.jsx";

export default function Login() {
  return <Auth mode="login" />;
}

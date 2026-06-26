// -----------------------------------------------------------------------------
// CONFIG: everything that is DIFFERENT between the two modes lives in one place.
//
// Keeping the differences in a lookup object (instead of scattering `if (mode...)`
// checks all over the JSX) makes the component easy to read and easy to extend:
// to change a heading or button label you edit this object, not the markup.
// -----------------------------------------------------------------------------
const MODES = {
  login: {
    title: "Welcome back",
    subtitle: "Your safe space is waiting for you.",
    submitLabel: "Log In",
    showNameField: false,             // login does not ask for a name
    passwordPlaceholder: "••••••••",
    passwordAutoComplete: "current-password",
    // The little line at the bottom that links to the OTHER screen.
    switchText: "Don't have an account?",
    switchLinkText: "Sign up",
    switchTo: "/signup",
  },
  signup: {
    title: "Create your account",
    subtitle: "Start your story today — it's free.",
    submitLabel: "Create Account",
    showNameField: true,              // signup also collects the user's name
    passwordPlaceholder: "At least 8 characters",
    passwordAutoComplete: "new-password",
    switchText: "Already have an account?",
    switchLinkText: "Log in",
    switchTo: "/login",
  },
};

export default MODES;

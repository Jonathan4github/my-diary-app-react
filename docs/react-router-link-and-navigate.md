# Tutorial: `Link`, `useNavigate`, and why not `<a href>`

A simple guide for students. We use real code from this app
(`src/components/Auth.jsx`).

---

## 1. The problem with a normal `<a href>`

Our app is a **Single Page App (SPA)**. This means the browser loads the page
**one time**. After that, React just shows and hides parts of the screen as you
move around. The page does not reload.

A normal HTML link breaks this:

```html
<!-- ❌ Do not do this in a React Router app -->
<a href="/dashboard">Go to dashboard</a>
```

When you click it, the browser **reloads the whole page**:

1. It throws away the running React app.
2. It asks the server for `/dashboard` again.
3. React starts again from zero.

You see a white flash, and it feels slow. You also **lose everything in memory**
— like text typed in a form — because the app started over.

> Think of `<a href>` as *"knock the house down and build it again."*
> React Router is *"just walk into another room."*

---

## 2. The fix: use `<Link>` for clicks

`react-router-dom` gives us `<Link>`. It still makes a real link on the page, so
it looks and works like a link. But it stops the reload and changes the page in
a fast way.

Real code from this app — `src/components/Auth.jsx`:

```jsx
import { Link } from "react-router-dom";

// Logo that takes you back to the home page
<Link to="/" className="auth-logo">
  <img src="/images/logo-trimmed.png" alt="My Diary Logo" />
</Link>

// Link to the other auth screen
<Link to="/signup">Sign up</Link>
```

### `<a>` vs `<Link>`

| Normal `<a href="...">`   | React Router `<Link to="...">` |
| ------------------------- | ------------------------------ |
| Reloads the whole page    | No reload — fast               |
| App restarts, data is lost | App keeps running, data stays  |
| White flash               | Smooth                         |
| Uses `href`               | Uses `to`                      |

**Simple rule:**
- Going to a page **inside your app**? → use `<Link to="...">`.
- Going to **another website** (like `https://google.com`)? → use a normal
  `<a href="...">`. React Router only knows your own pages.

---

## 3. `useNavigate` to move with code

`<Link>` is good when the user **clicks** something. But sometimes you need to
move the user when there is **nothing to click**.

Example: after the user logs in, you want to send them to the dashboard by
yourself. There is no link to press. **Your code** decides to move.

Real code from `src/components/Auth.jsx`:

```jsx
import { useNavigate } from "react-router-dom";

export default function Auth({ mode = "login" }) {
  // 1. Get the navigate function
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setUser(email.trim());

    // 2. Move to another page with code (still no reload!)
    navigate("/dashboard");
  };

  // ...
}
```

### When to use which?

| What is happening                     | Use           |
| ------------------------------------- | ------------- |
| User clicks a link or menu item       | `<Link>`      |
| After a form is sent                  | `useNavigate` |
| After an API call finishes            | `useNavigate` |
| Send away a user who is not logged in | `useNavigate` |
| A normal "go to this page" link       | `<Link>`      |

> Easy way to remember:
> **`Link` = the user moves. `useNavigate` = your code moves.**

---

## 4. More things `useNavigate` can do

```jsx
const navigate = useNavigate();

navigate("/dashboard");   // go to a page
navigate(-1);             // go back one page (like the back button)
navigate(1);              // go forward one page

// Replace the current page in history instead of adding a new one.
// Good after login, so the back button does not go to the login screen.
navigate("/dashboard", { replace: true });
```

`<Link>` can also use `replace`:

```jsx
<Link to="/login" replace>Log in</Link>
```

---

## 5. One thing to be careful about

`useNavigate` is a **React Hook**. So follow the hook rules:

- ✅ Call it at the **top** of your component.
- ❌ Do not call it inside an `if` or a loop.
- It only works inside pages that live inside the router
  (set up in `src/App.jsx`).

```jsx
// ❌ Wrong — hook is inside an if
if (loggedIn) {
  const navigate = useNavigate();
}

// ✅ Right — hook at the top, the if is around the call
const navigate = useNavigate();
if (loggedIn) {
  navigate("/dashboard");
}
```

---

## 6. Try it yourself

1. Open `src/components/Auth.jsx`.
2. Change the `<Link to="/signup">` to `<a href="/signup">`. Click it and watch
   the page **flash and reload**.
3. Change it back to `<Link>`. Now it is **fast**.
4. In `handleSubmit`, try `navigate("/dashboard", { replace: true })`. Now the
   **back button** does not go back to the login form.

---

## In short

- The app loads **once**, then just swaps views. A reload undoes that.
- `<a href>` → full reload, lost data, slow. Do not use for **inside** links.
- `<Link to="...">` → fast click navigation, no reload. Use for inside links.
- `useNavigate()` → move the user **from code** (after a form, redirects, etc.).
- Other websites still use a normal `<a href>`.

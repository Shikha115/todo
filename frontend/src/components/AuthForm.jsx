import React, { useState, memo } from "react";
import { EyeCloseIcon, EyeIcon } from "./Svg";

function AuthForm({ action, isPending, type }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form id="signup-form" action={action}>
      <label htmlFor="signup-username">Username:</label>
      <input
        type="email"
        id="signup-username"
        value={username}
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="on"
        required
      />

      <label htmlFor="signup-password">Password:</label>
      {/* container with relative positioning so the icon can be absolute */}
      <div className="relative mb-[15px]">
        <input
          type={showPassword ? "text" : "password"}
          id="signup-password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
          required
          className="pr-10 !mb-0"
          style={{ width: "-webkit-fill-available" }}
        />
        <span
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        >
          {!showPassword ? <EyeIcon /> : <EyeCloseIcon />}
        </span>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : type}
      </button>
    </form>
  );
}

export default memo(AuthForm);

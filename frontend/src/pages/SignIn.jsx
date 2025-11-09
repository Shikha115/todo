import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../api/url";
import axios from "axios";
import { useActionState } from "react";
import AuthForm from "../components/AuthForm";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../hooks/localStorage";

function SignIn() {
  const navigate = useNavigate();
  const [_token, setToken] = useLocalStorageState("token", "");

  const handleSubmit = async (_prev, formData) => {
    try {
      const data = {
        username: String(formData.get("username") || ""),
        password: String(formData.get("password") || ""),
      };
      const response = await axios.post(url.loginUrl, data);
      // console.log("post user login", response.data.message);
      toast.success("Login successful" + response.data.message);
      setToken(response.data.token);
      navigate("/index");
    } catch (error) {
      toast.error("Login failed: " + error.response.data.message);
      // console.error("login error", error.response.data.message);
    } finally {
      return null;
    }
  };

  const [_result, submitAction, isPending] = useActionState(handleSubmit, {
    error: "",
  });

  return (
    <div className="container">
      <div id="signin-container">
        <h2>Signin</h2>
        {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
        <AuthForm action={submitAction} isPending={isPending} type="Signin" />
        <p className="text-center mb-2">
          Don't have an account?{" "}
          <Link to="/register" id="show-signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default memo(SignIn);

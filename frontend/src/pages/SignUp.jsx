import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../api/url";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import { useActionState } from "react";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (_prev, formData) => {
    try {
      const data = {
        username: String(formData.get("username") || ""),
        password: String(formData.get("password") || ""),
      };
      const res = await axios.post(url.registerUrl, data);
      if (res.data?.status === "failure") {
        console.error("registration error", res.data?.message);
        toast.error(res.data?.message ?? "Registration failed");
        return null;
      }
      toast.success("Account created");
      navigate("/"); // success
      return null;
    } catch (err) {
      const msg =
        err?.response?.data?.message ?? err?.message ?? "Something went wrong";
      console.error("registration error", msg);
      toast.error(msg);
      return null;
    }
  };

  const [_result, submitAction, isPending] = useActionState(handleSubmit, {
    error: "",
  });

  return (
    <div className="container">
      <div id="signup-container">
        <h2>Signup</h2>
        {/* {result.error && <p className="error">{result.error}</p>} */}
        <AuthForm action={submitAction} isPending={isPending} type="Signup" />
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/" id="show-signin">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default memo(SignUp);

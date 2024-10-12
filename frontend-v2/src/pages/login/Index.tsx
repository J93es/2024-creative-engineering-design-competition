import "pages/login/Index.css";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginType, FormLoginSchema } from "module/login";

import { authController } from "controller/index";
import { useNavigate } from "react-router-dom";
import { SetIsAuthenticatedContext } from "App";

export default function Login({
  redirectUrl = "/admin",
  setCedcAuth,
}: {
  redirectUrl?: string;
  setCedcAuth: React.Dispatch<React.SetStateAction<LoginType>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(FormLoginSchema) });

  const setIsAuthenticated = useContext(SetIsAuthenticatedContext);

  const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");

  const onSubmit = (data: LoginType) => {
    const func = async () => {
      try {
        const isAuthenticated = await authController.isAuthenticated(data);
        if (!isAuthenticated) {
          setMessage("로그인에 실패했습니다.");
          return;
        }

        setIsAuthenticated(true);
        navigate(redirectUrl);
        setCedcAuth(data);
        // window.location.href = redirectUrl;
        return;
      } catch (error) {
        console.error(error);
      }
    };
    func();
  };

  return (
    <div className="login-cont">
      <div className="login-card">
        <div className="card-header">
          <h1>Login</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="admin_id">ID</label>
              <input
                id="admin_id"
                type="admin_id"
                className="form-control"
                autoComplete="on"
                {...register("adminId")}
              />
              <div className="form-text text-muted">
                <small className="login-help-msg">
                  {errors.adminId?.message ?? ""}
                </small>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                autoComplete="on"
                {...register("password")}
              />
              <div className="form-text text-muted">
                <small className="login-help-msg">
                  {errors.password?.message ?? ""}
                </small>
              </div>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="auth-msg">{message}</div>
        </div>
      </div>
    </div>
  );
}

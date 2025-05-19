"use client";
import { useState } from "react";
import { userValidation } from "./actions";
import style from "./LoginForm.module.scss";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const [isLoggedIn, userInfo] = await userValidation(login, password);

      if (isLoggedIn && typeof userInfo === "object") {
        const { user_role, id_user, id_team } = userInfo;
        setRole(user_role as string);

        setCookie("userRole", user_role, {
          maxAge: 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        setCookie("id_user", id_user.toString(), {
          maxAge: 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        setCookie("id_team", id_team.toString(), {
          maxAge: 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        router.push("/projects");
      } else {
        setError(
          typeof userInfo === "string" ? userInfo : "Invalid credentials."
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed.");
    }
  };

  return (
    <div className={style["login-container"]}>
      <h2
        style={{
          color: "rgb(78, 81, 83)",
          fontSize: "12px",
          textAlign: "left",
        }}
      >
        Enter your credentials
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="login"
          required
          className={style["input_place"]}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          className={style["input_place"]}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={style["button_login"]}>
          Login
        </button>
        {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
      </form>
    </div>
  );
};

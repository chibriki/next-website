import { useState } from "react";
import { userValidation } from "./actions"; // safe, it's a server action
import style from "./LoginForm.module.scss";

export const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Destructure the result correctly based on the array returned
            const [isLoggedIn, permission] = await userValidation(login, password);

            if (isLoggedIn) {
                console.log("Logged in with role:", permission);
            } else {
                setError(typeof permission === "string" ? permission : "Invalid credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed.");
        }
    };

    return (
        <div className={style["login-container"]}>
            <h2 style={{ color: "rgb(78, 81, 83)", fontSize: "12px", textAlign: "left" }}>
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

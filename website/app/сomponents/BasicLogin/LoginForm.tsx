'use client';

export const LoginForm =  () => {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form action="login_page" method="POST">
                <input type="text" name="login" placeholder="Enter your login" required />
                <input type="password" name="password" placeholder="Enter your password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

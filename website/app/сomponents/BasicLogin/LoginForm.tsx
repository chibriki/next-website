'use client';
import style from "./LoginForm.module.scss"
export const LoginForm =  () => {
    return (
        <div className={style['login-container']}>
            <h2 style={{ color: 'rgb(78, 81, 83) ', fontSize: '12px', textAlign: 'left' }}>Enter your credentials</h2>
            <form action="login_page" method="POST">
                <input type="text" name="login" placeholder="login" required className={style['input_place']} />
                <input type="password" name="password" placeholder="password" required className={style['input_place']} />
                <button type="submit" className={style['button_login']}>Login</button>
            </form>
        </div>
    );
};

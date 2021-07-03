import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import './styles/login.css'

function Login() {

    useEffect(() => {
        if (Cookies.get('tocken')) {
            window.location.replace(`/`);
        }
    }, []);

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    function validat(e) {
        e.preventDefault();
        if (login.length < 4) {
            return alert("Логин должен быть не менее 4 цифр")
        }
        if (password.length < 4) {
            return alert("Пароль должен быть не менее 4 цифр")
        }

        loginFetch({
            login: login,
            password: password
        })
    }

    function loginFetch(props) {
        fetch('http://192.168.1.4:5050/api/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: props.login,
                password: props.password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    return alert('This username already exists')
                }
                if (data.tocken) {
                    Cookies.set('tocken', data.tocken)
                    if (Cookies.get('tocken')) {
                        window.location.replace(`/`);
                    }
                }
            })
    }

    return (
        <div className="login">
            <div className="login__inner">
                <h1 className="login__title">Login</h1>
                <form className="login__form">
                    <input value={login} onChange={(e) => setLogin(e.target.value)} className="form__login form_def" type="text" placeholder="Login..." required />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="form__password form_def" type="password" placeholder="Password..." required />
                    <button className="form__btn" onClick={e => { validat(e) }}>Login</button>
                </form>
                <div className="link__block">
                    <a className="link" href="/registration">Register</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
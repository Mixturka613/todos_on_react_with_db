import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'

import './styles/login.css'

function Registration() {

    useEffect(() => {
        if (Cookies.get('tocken')) {
            window.location.replace(`/`);
        }
    }, []);

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [RPassword, setRPassword] = useState('')

    function validate(e) {
        e.preventDefault();
        if (login.length < 2) {
            return alert("Логин должен быть не менее 2 цифр")
        }
        if (password.length < 4) {
            return alert("Пароль должен быть не менее 4 цифр")
        }
        if (password !== RPassword) {
            return alert("Пароли не совпадают")
        }

        loginFetch({
            login: login,
            password: password
        })
    }

    function loginFetch(props) {
        fetch('http://localhost:5050/api/registration', {
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
                    alert(data.message)
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
                <h1 className="login__title">Registration</h1>
                <form className="login__form">
                    <input value={login} onChange={(e) => setLogin(e.target.value)} className="form__login form_def" type="text" placeholder="Login..." />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="form__password form_def" type="password" placeholder="Password..." />
                    <input value={RPassword} onChange={(e) => setRPassword(e.target.value)} className="form__password form_def" type="password" placeholder="Repeat Password..." />
                    <button className="form__btn" onClick={e => { validate(e) }}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Registration;
import { useState } from 'react'
import './styles/login.css'

function Login() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    function validat(e) {
        e.preventDefault();
        if (login.length < 2) {
            return alert("Логин должен быть не менее 2 цифр")
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
        fetch('http://localhost:5050/api/login', {
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
            })
    }

    return (
        <div className="login">
            <div className="login__inner">
                <h1 className="login__title">Login</h1>
                <form className="login__form">
                    <input value={login} onChange={(e) => setLogin(e.target.value)} className="form__login form_def" type="text" placeholder="Login..." />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="form__password form_def" type="password" placeholder="Password..." />
                    <button className="form__btn" onClick={e => { validat(e) }}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
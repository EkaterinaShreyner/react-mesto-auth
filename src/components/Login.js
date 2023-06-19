import React from "react";
import { useState } from "react";
import * as mestoAuth from "../utils/MestoAuth.js"
import { useNavigate } from "react-router-dom";
// import AuthForm from "./AuthForm";

function Login() {

  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function handleChangeInput(evt) {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const {email, password} = formValue;
    mestoAuth.authorize(email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        navigate('/', {replace: true})
      })
      .catch((err) => {
        console.error(`Ошибка авторизации: ${err}`)
      })
  }

  return(
    // <div className="auth">
    //   <AuthForm
    //     title="Вход"
    //     form="form-login"
    //     buttonText="Войти"
    //     onSubmit={handleSubmit}
    //   />
    // </div>
    <div className="auth">
      <form className="auth__form" name="form-register" onSubmit={handleSubmit}>
        <h2 className="auth__title">Вход</h2>
        <input
          className="auth__input"
          name="email"
          type="email"
          placeholder="Email"
          minLength="5"
          maxLength="30"
          required
          onChange={handleChangeInput}
        />
        <input
          className="auth__input"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="3"
          maxLength="10"
          required
          onChange={handleChangeInput}
        />
        <button
          className="auth__button"
          type="submit"
          >
            Войти
        </button>
      </form>
    </div>
  )
}

export default Login;
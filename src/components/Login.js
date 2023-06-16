import React from "react";
import AuthForm from "./AuthForm";

function Login() {


  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('Авторизация')
  }

  return(
    <div className="auth">
      <AuthForm
        title="Вход"
        form="form-login"
        buttonText="Войти"
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Login;
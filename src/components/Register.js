import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

function Register() {
  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("Регистрация");
  }

  return (
    <div className="auth">
      <AuthForm
        title="Регистрация"
        form="form-register"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      />
      <p className="auth__confirm">
        Уже зарегистрированы?{" "}
        <Link className="auth__link" to="/sign-in">Войти</Link>
      </p>
    </div>
  );
}

export default Register;

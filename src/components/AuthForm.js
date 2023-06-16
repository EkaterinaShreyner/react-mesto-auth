import React from "react";
import { useState } from "react";

function AuthForm(props) {
  const [formvalue, setFormValue] = useState({
    email: '',
    password: ''
  })

  function handleChangeInput(evt) {
    const {name, value} = evt.target;
    setFormValue({
      // ...formvalue,
      [name]: value
    })
    // console.log(evt.target.value)
  }

  return(
    <form className="auth__form" name={props.form} onSubmit={props.onSubmit}>
      <h2 className="auth__title">{props.title}</h2>
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
          {props.buttonText}
      </button>
    </form>
  )
}

export default AuthForm;
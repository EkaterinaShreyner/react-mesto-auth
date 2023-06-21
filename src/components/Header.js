import React from 'react';
import logo from '../image/Vector.svg';
import { Link, Route, Routes } from 'react-router-dom';


function Header(props) {

  function onSignOut() {
    props.onSignOut();
  }

  return (
    <header className="header">
        <img 
          src={logo}
          className="header__logo"
          alt="Логотип проекта место" 
        />
      <Routes>
        <Route 
          path="/sign-up"
          element={
            <Link className="header__button" to="/sign-in">Войти</Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__button" to="/sign-up">Регистрация</Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__imail">{props.userEmail}</p>
              <Link
                className="header__button header__button_type_exit"
                type="button"
                onClick={onSignOut}
                to="sign-in"
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
import React from 'react';
import logo from '../image/Vector.svg';
import { Link, Route, Routes } from 'react-router-dom';


function Header(props) {
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
            <>
              <p className="header__imail">kkk@mail.ru</p>
              <Link className="header__button header__button_type_exit" to="/sign-in">Выйти</Link>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
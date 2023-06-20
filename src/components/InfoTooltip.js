import React from "react";

function InfoTooltip(props) {

const popupOpened = props.isOpen ? "popup_opened" : "";

  return(
    <section className={`popup ${popupOpened}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__tooltip">
          <img />
          <p className="popup__message">
            Успешно
          </p>
        </div>
      </div>
    </section>
  )
}

export default InfoTooltip;
import { useEffect, useState } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import PopupConfirm from "./PopupConfirm.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "./InfoTolltip.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";


function App() {

  // авторизованный пользователь
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // попапы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useState(false);
  const [isPopupTooltip, setIsPopupTooltip] =useState(false);

  // выбранная карточка
  const [selectedCard, setSelectedCard] = useState(null);

  // данные пользователя
  const [currentUser, setCurrentUser] = useState({});

  // массив карточек
  const [cards, setCards] = useState([]);

  // загрузка лодинг
  const [isLoading, setIsLoading] = useState(false);

  // карточка для удаления
  const [selectedConfirmDeleteCard, setSelectedConfirmDeleteCard] = useState(null);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUser, cards]) => {
        setCurrentUser(dataUser);
        setCards(cards);
      })
      .catch((err) => {
        console.error(`Ошибка ${err}`);
      });
  }, []);

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupConfirmOpen(false)
    setIsPopupTooltip(false)
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((el) => el._id === card._id ? newCard : el))
      })
  }

  function handleCardDelete(card) {
    setSelectedConfirmDeleteCard(card);
    setIsPopupConfirmOpen(true);
  }

  function handleConfirmDeleteCard() {
    api.deleteCard(selectedConfirmDeleteCard._id)
      .then(() => {
        const newCards = cards.filter((el) => el !== selectedConfirmDeleteCard)
        setCards(newCards)
        setIsPopupConfirmOpen(false)
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsPopupConfirmOpen(false)
      })
  }

  function handleUpdateUser(dataUser) {
    setIsLoading(true)
    api.patchUserInfo(dataUser) 
      .then((dataUser) => {
        setCurrentUser({
          name: dataUser.name,
          about: dataUser.about,
          avatar: dataUser.avatar
        })
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoading(true)
    api.patchAvatar({avatar})
      .then((dataUser) => {
        setCurrentUser({
          avatar: dataUser.avatar,
          name: dataUser.name,
          about: dataUser.about
        })
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    setIsLoading(true)
    api.postNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header 
          isLoggedIn={isLoggedIn}/>
          <Routes>
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/" 

              // element={
              //   <>
              //   <Main  
              //     onEditProfile={handleEditProfileClick}
              //     onAddPlace={handleAddPlaceClick}
              //     onEditAvatar={handleEditAvatarClick}
              //     onCardClick={handleCardClick}
              //     cards={cards}
              //     onCardLike={handleCardLike}
              //     onCardDelete={handleCardDelete}
              //   />
              //   <Footer />
              //   </>
              // }

              element={
                <>
                  <ProtectedRoute 
                    element={Main}
                    isLoggedIn={isLoggedIn}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Footer />
                </>
              }
            />
          </Routes>
          {/* <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          /> */}
          {/* <Footer /> */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            closeOverlay={setIsEditProfilePopupOpen}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            closeOverlay={setIsEditAvatarPopupOpen}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
            closeOverlay={setIsAddPlacePopupOpen}
          />
          <PopupConfirm
            isOpen={isPopupConfirmOpen}
            onClose={closeAllPopups}
            onConfirmDeleteCard={handleConfirmDeleteCard}
            closeOverlay={setIsPopupConfirmOpen}
          ></PopupConfirm>
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            closeOverlay={setSelectedCard}
          />
          <InfoTooltip
          isOpen={isPopupTooltip}
          onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;

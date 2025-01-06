import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trier les événements par date décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  // Définir la fonction pour passer à la carte suivante
  const nextCard = () => {
    setTimeout(() => {
      setIndex(index < 3 - 1 ? index + 1 : 0); // Revenir au début après la dernière carte
    }, 5000);
  };

  // Appeler nextCard uniquement lorsque l'index change
  useEffect(() => {
    nextCard();
    return () => clearTimeout(nextCard); // Nettoyage pour éviter plusieurs timers actifs
  }, [index]);

  // Mettre à jour l'état lorsqu'un bouton radio est sélectionné
  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id || idx} // Utiliser un identifiant unique (id ou idx comme fallback)
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.id || radioIdx} // Utiliser event.id comme clé unique (ou fallback radioIdx)
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleRadioChange(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

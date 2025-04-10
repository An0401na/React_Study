import { useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [avaliablePlaces, setAvaliablePlaces] = useState();
  const [pickedPlaces, setPickedPlaces] = useState([]);

  // useEffect는 App 컴포넌트가 처음 렌더링될 때만 실행되도록 설정하여 무한루프 문제를 방지
  // App 컴포넌트의 JSX 코드가 반환된 후 시점에서 부수효과 함수를 실행
  useEffect(() => {
    // 브라우저로부터 사용자 위치 정보를 가져오는 빌트인 함수
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude,
      );

      setAvaliablePlaces(sortedPlaces);
    });
  }, []); // 의존성의 값이 변화했을때 경우에 한해 useEffect의 부수효과 함수를 실행
  // useEffect의 두 번째 인자로 빈 배열([])을 전달하면 컴포넌트가 처음 렌더링될 때만 실행

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current),
    );
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={avaliablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;

import { useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

// 로컬 스토리지에 저장된 id 목록을 가져옴, 없으면 빈 배열로 초기화
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
// 로컬 스토리지에 저장된 id 목록을 사용하여 장소를 찾음
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id),
);

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  // App 컴포넌트의 JSX 코드가 반환된 후 시점에서 부수효과 함수를 실행
  // 컴포넌트가 처음 렌더링될 때만 위치 정보를 요청함
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
  }, []); // 빈 배열: 의존성 없음 → 최초 렌더링 때만 실행

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

    // 로컬 스토리지에 저장된 id 목록을 가져옴, 없으면 빈 배열로 초기화
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    // 로컬 스토리지에 저장된 id 목록에 선택한 장소 id가 없으면 추가
    if (storedIds.indexOf(id) === -1) {
      // 로컬 스토리지에 선택한 장소 id를 추가
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds]),
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current),
    );
    modal.current.close();

    // 로컬 스토리지에서 선택한 장소 id를 제거
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(
        storedIds.filter((id) => {
          return id !== selectedPlace.current; // true 일때만 id를 남김
        }),
      ),
    );
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
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;

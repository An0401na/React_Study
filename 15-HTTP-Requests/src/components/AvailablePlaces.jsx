import Places from "./Places.jsx";
import { memo, useEffect, useState } from "react";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces() {
      console.log("📡 fetchPlaces 시작");
      setIsFetching(true);
      console.log("🔄 isFetching: true");

      try {
        const response = await fetch("http://localhost:3000/places");
        console.log("📥 fetch 완료");

        const resData = await response.json();
        console.log("📦 JSON 파싱 완료", resData);

        if (!response.ok) {
          throw new Error("Failed to fetch places.");
        }

        console.log("📍 위치 정보 요청");
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("✅ 위치 정보 받음", position.coords);

          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude,
          );

          console.log("📍 정렬된 장소", sortedPlaces);
          setAvailablePlaces(sortedPlaces);
          console.log("📍 setAvailablePlaces 실행됨");
        });

        console.log("📋 일단 기본 데이터 넣기");
        setAvailablePlaces(resData.places);
      } catch (error) {
        console.log("❌ 에러 발생", error.message);
        setError({
          message: error.message || "Could not fetch places.",
        });
      }

      setIsFetching(false);
      console.log("✅ isFetching: false");
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

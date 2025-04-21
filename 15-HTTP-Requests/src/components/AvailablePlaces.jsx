import Places from "./Places.jsx";
import { useEffect, useState } from "react";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      console.log("=== 📡 [fetchPlaces] 시작 ===");

      setIsFetching(true);
      console.log("🔄 [isFetching] true 설정됨");

      try {
        // Fetch 요청
        const response = await fetch("http://localhost:3000/places");
        console.log("📥 [fetch] 요청 성공");

        // JSON 파싱
        const resData = await response.json();
        console.log("📦 [JSON 파싱 완료]", resData);

        if (!response.ok) {
          throw new Error("Failed to fetch places.");
        }

        // 위치 정보 요청
        console.log("📍 [위치 요청] 사용자 위치 가져오는 중...");
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("✅ [위치 정보] 수신 완료:", position.coords);

          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude,
          );

          console.log("🗂️ [정렬 완료] 거리순 장소 목록:", sortedPlaces);
          setAvailablePlaces(sortedPlaces);
          console.log("📌 [setAvailablePlaces] 정렬된 데이터 적용");

          setIsFetching(false);
          console.log("✅ [isFetching] false 설정됨");
        });
      } catch (error) {
        console.log("❌ [에러 발생]", error.message);
        setError({
          message: error.message || "Could not fetch places.",
        });

        setIsFetching(false);
        console.log("✅ [isFetching] false 설정됨");
      }
      console.log("=== 📡 [fetchPlaces] 종료 ===");
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

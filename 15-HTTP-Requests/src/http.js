export async function fetchAvailablePlaces() {
  // Fetch 요청
  const response = await fetch("http://localhost:3000/places");
  console.log("📥 [fetch] 요청 성공");

  // JSON 파싱
  const resData = await response.json();
  console.log("📦 [JSON 파싱 완료]", resData);

  if (!response.ok) {
    throw new Error("Failed to fetch places.");
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }), // {places: places}와 동일
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user places.");
  }

  return resData.message;
}

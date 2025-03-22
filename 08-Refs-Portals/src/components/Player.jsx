import { useState, useRef } from "react";

export default function Player() {
    // useRef를 사용하여 input 요소에 대한 참조 생성
    const playerName = useRef();

    // 플레이어 이름을 상태로 관리 (null 초기값)
    const [enteredPlayerName, setEnteredPlayerName] = useState(null);

    function handleClick() {
        // useRef를 통해 input 요소의 현재 값 가져오기
        setEnteredPlayerName(playerName.current.value);
        playerName.current.value='';
    }

    return (
        <section id="player">
            {/* enteredPlayerName이 있으면 표시, 없으면 'unknown entity' 출력 */}
            <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
            <p>
                {/* input 요소에 ref 속성 연결 */}
                <input ref={playerName} type="text" />
                {/* 버튼 클릭 시 handleClick 함수 실행 */}
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}

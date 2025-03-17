
export default function Input({ label, inputIdentifier, value, onChangeValue}) {

    // input 값 변경 시 호출되는 함수
    function handleChange(event) {
        onChangeValue(inputIdentifier, event.target.value); // 부모 컴포넌트(App)로 변경된 값 전달
    }

    return (
        <p>
            {/* label과 input을 표시 */}
            <label>{label}</label>
            <input
                type="number" // 숫자만 입력받기 위해 type="number" 사용
                required
                value={value} // input에 현재 값 설정
                onChange={handleChange} // 값 변경 시 handleChange 호출
            />
        </p>
    );
}
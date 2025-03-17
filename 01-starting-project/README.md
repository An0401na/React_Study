# 💰 Investment Calculator

> **React 기반 투자 계산기** 🚀

## 📌 프로젝트 소개

이 프로젝트는 사용자가 **초기 투자금, 연간 투자금, 예상 수익률, 투자 기간**을 입력하면, 해당 데이터를 기반으로 매년 **총 투자 가치, 이자, 누적 이자, 투자된 자본**을 계산하여 테이블 형식으로 출력하는 **투자 수익 계산기**입니다.

> 이 프로젝트는 Udemy의 【한글자막】 React 완벽 가이드 2025 with React Router & Redux 강의 일부의 연습 프로젝트 입니다.

- **React**: 컴포넌트 기반 UI 개발
- **useState**: 사용자 입력값을 관리
- **Intl.NumberFormat**: 금액을 화폐 형식으로 변환

---

## 🏗️ 구현 과정 및 내부 로직

### 1️⃣ **전체적인 흐름**

1. `App` 컴포넌트에서 사용자의 입력을 상태(state)로 관리
2. 사용자가 입력을 변경하면 상태가 업데이트됨
3. 변경된 입력 데이터를 `Result` 컴포넌트로 전달
4. `Result`에서 `calculateInvestmentResults` 함수를 이용해 투자 결과 계산
5. 계산된 결과를 테이블 형태로 출력

---

### 2️⃣ **폴더 구조**

```
src/
│── assets/                 # (이미지, 스타일 파일 등)
│── components/             # (UI 컴포넌트 모음)
│   │── Input.jsx           # 입력 필드 컴포넌트
│   │── Result.jsx          # 결과 표시 컴포넌트
│── util/                   # (유틸리티 함수 모음)
│   │── investment.js       # 투자 계산 로직 포함
│── App.jsx                 # 메인 컴포넌트
│── index.css               # 전역 스타일
│── index.jsx               # 엔트리 포인트
```

---

### 3️⃣ **주요 컴포넌트 및 기능**

#### 🏠 **1. App.jsx (메인 컴포넌트)**

- 사용자 입력을 `useState`로 관리
- `Input` 컴포넌트에서 입력된 값들을 받아와 상태 업데이트
- 입력된 값이 유효한 경우에만 결과를 렌더링 (조건부 렌더링 적용)
- 최종적으로 `Result` 컴포넌트에 입력값을 전달


```jsx
const [inputs, setInputs] = useState(INPUT);
const inputIsValid = inputs.duration >= 1;

function handleInputValueChange(input, newValue) {
  setInputs(prevInputs => ({
    ...prevInputs,
    [input]: +newValue // 문자열을 숫자로 변환
  }));
}
.
.
.
return (
  <main>
    ...
    {!inputIsValid && <p className="center">Please enter a duration greater than zero.</p>}
    {inputIsValid && <Result input={inputs} />}
  </main>
);
```

---

#### 🎛️ **2. Input.jsx (입력 폼 컴포넌트)**

- 변경 시 부모 컴포넌트에 전달

```jsx
function handleChange(event) {
  onChangeValue(inputIdentifier, event.target.value);
}
```

---

#### 📊 **3. Result.jsx (결과 출력 컴포넌트)**

- `calculateInvestmentResults` 함수를 호출해 투자 결과 계산
- `formatter`를 사용해 숫자를 화폐 형식으로 변환
- `map`을 사용해 결과를 테이블로 표시

```jsx
const results = calculateInvestmentResults(input);
let totalInterest = 0;
let investedCapital = input.initialInvestment;

results.map((result) => {
  totalInterest += result.interest;
  investedCapital += input.annualInvestment;
  return (
    <tr key={result.year}>
      <td>{result.year}</td>
      <td>{formatter.format(result.valueEndOfYear)}</td>
      <td>{formatter.format(result.interest)}</td>
      <td>{formatter.format(totalInterest)}</td>
      <td>{formatter.format(investedCapital)}</td>
    </tr>
  );
});
```

---

---

## 🎯 **결과 예시**

![image](https://github.com/user-attachments/assets/31481b89-dc7f-4c68-a16d-3fd46cbd3af0)
![image](https://github.com/user-attachments/assets/c850fac3-62ea-48ea-81c5-e70cef315bdc)


---

## 🔥 **배운 점**
✅ `useState`를 활용한 동적인 상태 관리\
✅ `map`을 활용한 데이터 리스트 렌더링\
✅ `formatter`를 이용한 화폐 형식 변환\
✅ `props`를 이용한 컴포넌트 간 데이터 전달



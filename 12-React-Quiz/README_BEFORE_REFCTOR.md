## 🏗️ 구현 과정 및 내부 로직

### 👉 [페이지보기](https://an0401na.github.io/React_Study/12-React-Quiz/)

### 1️⃣ **전체적인 흐름**

1. **퀴즈 시작**: 사용자가 앱을 시작하면, `Quiz` 컴포넌트가 렌더링되어 문제들이 섞인 상태로 표시됩니다.
2. **문제 풀기**: 각 문제는 제한 시간이 주어지며, 사용자는 보기를 선택하거나 `Skip` 버튼을 눌러 문제를 건너뛸 수 있습니다.
3. **답안 제출**: 사용자가 답을 선택하면, `userAnswerContext`를 통해 답안 상태가 저장되고, 타이머가 종료되면 자동으로 정답이 표시됩니다.
4. **다음 문제로 이동**: 정답을 확인한 후, `Quiz` 컴포넌트는 자동으로 다음 문제로 넘어가며, 마지막 문제까지 진행합니다.
5. **결과 화면**: 모든 문제를 끝내면 `Summary` 컴포넌트가 렌더링되어 정답, 오답, 건너뛴 문제 수와 비율을 표시하고, 각 문제에 대한 사용자 선택 및 결과를 출력합니다.
6. **상태 관리**: `UserAnswerContext`와 `useReducer`를 통해 사용자의 답안을 관리하고, 각 컴포넌트 간 상태를 공유합니다.

---

### 2️⃣ **폴더 구조**

```
📁 src
├── 📁 assets
├── 📁 components
│   ├── 🧩 Answers.jsx
│   ├── 🧩 Header.jsx
│   ├── 🧩 ProgressBar.jsx
│   ├── 🧩 Question.jsx
│   ├── 🧩 Quiz.jsx
│   └── 🧩 Summary.jsx
├── 📁 constants
│   ├── ❓ nonsense_questions_ko.js
│   ├── ❓ questions.js
│   ├── ❓ questions_ko.js
│   └── ❓ stages.js
├── 📁 store
│   └── 🧠 user-answer-context.jsx
├── 🧩 App.jsx
├── 🎨 index.css
└── 🚀 main.jsx

```
### 📌 컴포넌트 구조
![image](https://github.com/user-attachments/assets/6fa979c5-286c-4ce7-8c96-e5dbbca793ef)


```jsx
App
├── Header (상단 로고 + 타이틀)
├── UserAnswerContextProvider
│   ├── Quiz (퀴즈 진행 중일 때 렌더링)
│   │   ├── Question (질문 + ProgressBar)
│   │   │   └── ProgressBar (타이머 진행 바)
│   │   ├── Answers (선택지 버튼들)
│   │   └── Skip 버튼 영역
│   │
│   └── Summary (퀴즈 종료 후 결과 요약 화면)
│       └── 각 질문에 대한 결과 항목
```
---

### **3️⃣ 주요 컴포넌트 및 기능**

### 🏠 **1. App.jsx (메인 컴포넌트)**

- 퀴즈 앱의 **전체 흐름을 제어**하는 루트 컴포넌트
- `viewMode` 상태로 현재 화면을 관리
    - `"quiz"` → `Quiz` 컴포넌트 렌더링
    - `"summary"` → `Summary` 컴포넌트 렌더링

```jsx

  // 현재 화면 모드를 상태로 관리 (퀴즈 화면 또는 결과 화면)
  const [viewMode, setViewMode] = useState("quiz");
  
  // 화면 모드를 변경하는 함수 (퀴즈 화면 -> 결과 화면)
  function handleViewModeChange(mode) {
    setViewMode(mode); // 새로운 화면 모드로 상태 업데이트
  }

  return (
    <>
		    ...
        {/* viewMode 상태에 따라 퀴즈 화면 또는 결과 화면을 렌더링 */}
        {viewMode === "quiz" && ( <Quiz quizzes={shuffledQuizzes} onQuizEnd={handleViewModeChange} /> )}
        { viewMode === "summary" && <Summary />  }
		    ...
    </>
  );
```

- `QUIZS` 데이터에서 문제와 보기 순서를 `lodash`로 셔플하여 출제

```jsx
// QUIZS에서 문제를 가져와서 순서를 섞고, 각 문제에 대한 답변 순서도 섞음
  const shuffledQuizzes = _.shuffle(QUIZS).map((quiz) => ({
    ...quiz,
    answers: _.shuffle(quiz.answers), // 답안 순서 셔플
    correctAnswer: quiz.answers[0], // 첫 번째 답안을 정답으로 설정
  }));
```

- 전역 상태 관리용 `UserAnswerContextProvider`로 감싸, 하위 컴포넌트에서 사용자 답변 데이터를 공유 및 추적

```jsx
return (
  <><Header /> {/* 상단 고정 헤더 */}
    <UserAnswerContextProvider>
      {currentView}
    </UserAnswerContextProvider>
  </>
);
```

---

### 🧠 **2. Quiz.jsx (퀴즈 진행 컴포넌트)**

- 퀴즈 전체 흐름을 관리하는 Quiz 컴포넌트
- **퀴즈 문제**와 **답안 선택** 컴포넌트를 표시하고,`useState`와 `useEffect`를 활용하여 각 상태 간의 **자동 전환**을 구현.
- 각 상태는 **퀴즈 문제를 한 문제씩 보여주고(`quiz`) → 사용자가 선택한 답변을 보여주고(`showSelectedAnswer`)** → 정답을 확인(`showCorrectAnswer`)하는 **3단계 흐름**으로 구성.
- **Skip 버튼**을 통해 사용자가 문제를 건너뛰고 바로 **정답**을 확인할 수 있도록 기능을 추가.
- **사용자의 선택한 답**은 **컨텍스트**를 통해 관리하여 저장 및 추적.
- `useEffect`를 사용하여 **타이머**가 끝날 때마다 자동으로 **상태 전환** 처리.
- **정답 보기** 상태로 전환 후, 일정 시간이 지나면 **다음 문제**로 자동으로 넘어감.

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    // 문제 풀이 중이면 → 정답 공개로 전환
    if (quizStage !== STAGES.CORRECT) {
      setQuizStage(STAGES.CORRECT);
    } else {
      // 이미 정답을 본 상태면 → 다음 문제로
      handleNextQuestion();
    }
  }, time);

  return () => clearTimeout(timer); // 타이머 초기화
}, [currentQuizIndex, quizStage]); // 상태 변경 시마다 타이머 새로 설정

```

---

---

### ⏳ **3. ProgressBar.jsx (진행 바 컴포넌트)**

- **퀴즈의 제한 시간에 따라 남은 시간을 보여주는** 진행 바 컴포넌트.
- `time`을 받아서 **남은 시간**을 표시하며, 사용자가 문제를 **풀고 있을 때** 진행 상태를 실시간으로 업데이트.
- **타이머**가 남은 시간을 **10ms마다 감소**시키며, `useEffect`를 통해 타이머를 관리.

```jsx
useEffect(() => {
  // 새 문제나 상태가 변경될 때마다 타이머를 초기화
  setRemainingTimer(time); 

  // 10ms마다 남은 시간을 10씩 감소
  const interval = setInterval(() => {
    setRemainingTimer((prevTime) => prevTime - 10);
  }, 10);

  // Cleanup: 컴포넌트 언마운트 시 타이머를 정리
  return () => {
    clearInterval(interval); // 타이머 클리어
  };
}, [time]); // `time`이 변경될 때마다 타이머 초기화
```

- **답을 선택했을 때** 조건부로 스타일을 적용하여 **진행 상태**를 시각적으로 구분.

```jsx
<progress
	className={isAnswered ? "answered" : ""} // 정답 선택 상태에 따라 조건부 클래스 적용
	value={remainingTimer} // 현재 남은 시간
	max={time} // 최대 시간
/>
```

---

### 💬 **4. Answers.jsx (선택지 목록 컴포넌트)**

- 퀴즈에서 **사용자가 선택한 답변**과 **정답**을 시각적으로 구분하여 보여주는 컴포넌트.
- 현재 문제의 **답변 리스트를 렌더링**하고, 선택 이벤트 처리
- `quizStage`에 따라 답변 버튼의 클래스를 동적으로 설정.
    - `STAGES.SELECTED`: 사용자가 답을 선택한 상태에서 해당 답에 `"selected"` 클래스 추가.
    - `STAGES.CORRECT`: 정답을 표시하는 단계에서 정답에는 `"correct"`(초록), 틀린 답에는 `"wrong"` (빨강) 클래스 추가.

```jsx
function getClassName(answer) {
  if (quizStage === STAGES.SELECTED) {
    return answer === selectedAnswer ? "selected" : "";
  }

  if (quizStage === STAGES.CORRECT) {
    if (answer === correctAnswer) return "correct";
    if (answer === selectedAnswer && selectedAnswer !== correctAnswer)
      return "wrong";
  }

  return "";
}

```

- `quizStage`가 `"QUIZ"`일 때만 선택이 가능하도록 `disabled` 설정.

```jsx
<button
  className={getClassName(answer)} // 동적으로 스타일 클래스 지정
  disabled={quizStage !== STAGES.QUIZ} // 퀴즈 푸는 중에만 클릭 가능
  type="button"
  onClick={() => handleAnswerSelect(answer)} // 답안 선택 핸들러
>
  {answer}
</button>
```

---

### 📊 **5. Summary.jsx (요약 결과 화면 컴포넌트)**

- 퀴즈가 끝나면 정답/오답/스킵 비율을 시각적으로 요약
- **`userAnswer`**: 사용자 답안 배열을 `UserAnswerContext`에서 가져와서 퀴즈 결과를 처리.
- **문제 통계 계산**:
    - 총 문제 수, 정답 수, 오답 수, 건너뛴 문제 수 계산.
    - 각 항목의 비율을 백분율로 계산하여 표시.

```jsx

const correctAnswers = userAnswer.filter((answer) => answer.result === "correct").length;
const wrongAnswers = userAnswer.filter((answer) => answer.result === "wrong").length;
const skippedAnswers = userAnswer.filter((answer) => answer.result === "skipped").length;

const getPercentage = (count) => Math.round((count / totalQuestions) * 100);

```

- 사용자의 응답 결과를 하나씩 나열하며, **정답 여부와 선택한 항목을 강조 표시**
    - `skipped`된 문제는 `"SKIPPED"`로 표시, 선택된 답은 정답/오답에 따라 스타일링.
    - `context.answers`와 `questions` 데이터를 매핑하여 렌더링

```jsx
<ol>
  {userAnswer.map((answer, index) => {
    const { id, question, selectedAnswer, result } = answer;
    return (
      <li key={id}>
        <h3>{index + 1}</h3>
        <div className="question">{question}</div>
        {result === "skipped" ? (
          <p className="user-answer wrong">SKIPPED</p>
        ) : (
          <div className="answer">
            <p className={`user-answer ${result}`}>{selectedAnswer}</p>
          </div>
        )}
      </li>
    );
  })}
</ol>
```

---

### 🧩 **6. user-answer-context.jsx (Context API + 상태관리)**

- 사용자 답안을 **전역 상태**로 관리하고, 이를 **다른 컴포넌트**에서 공유할 수 있도록 하는 **Context**.
    - **Context**: `UserAnswerContext` 생성.
    - **Reducer**: `useReducer` 훅을 이용하여 상태 관리.
    - **Provider**: `UserAnswerContextProvider` 컴포넌트로 자식 컴포넌트에 상태 및 함수를 제공.
1. **Context 생성**:
    - 사용자 답안을 저장하고 업데이트할 수 있는 Context를 생성.
    - `userAnswer`는 사용자 답안을 배열로 저장하며, 기본값은 빈 배열.
    - `addUserAnswer`는 답안을 추가하는 함수로 초기에는 빈 함수로 설정.

```jsx
export const UserAnswerContext = createContext({
  userAnswer: [],
  addUserAnswer: () => {},
});
```

1. **Reducer 정의**:
    - `userAnswerReducer`는 사용자 답안을 관리하는 리듀서.
    - `ADD_USER_ANSWER` 액션이 발생하면 `payload`로 전달된 답안을 기존 상태에 추가하여 새로운 상태를 반환.

```jsx
function userAnswerReducer(state, action) {
  switch (action.type) {
    case "ADD_USER_ANSWER":
      return [...state, action.payload];
    default:
      return state;
  }
}
```

3. **Provider 정의**

- `UserAnswerContextProvider`는 이 Context를 제공하는 컴포넌트로, `useReducer`를 사용하여 상태(`userAnswerState`)와 상태 업데이트 함수(`userAnswerDispatch`)를 관리합니다. 이 컴포넌트는 **자식 컴포넌트**들에게 `userAnswer`와 `addUserAnswer`를 제공하며, 이를 통해 다른 컴포넌트에서 사용자 답안 상태를 조회하고 업데이트할 수 있습니다.

주요 단계:

1. **`useReducer`**: `userAnswerState`와 `userAnswerDispatch`를 관리.
2. **`addAnswer` 함수**: `ADD_USER_ANSWER` 액션을 디스패치하여 사용자가 선택한 답안을 상태에 추가.
3. **`UserAnswerContext.Provider`**: 상태와 함수를 자식 컴포넌트들에 전달.

```jsx
export default function UserAnswerContextProvider({ children }) {
  // 상태 관리: useReducer로 상태(userAnswerState) 및 상태 업데이트(userAnswerDispatch) 처리
  const [userAnswerState, userAnswerDispatch] = useReducer(userAnswerReducer, []);

  // 사용자 답안을 추가하는 함수
  function addAnswer(answer) {
    userAnswerDispatch({ type: "ADD_USER_ANSWER", payload: answer });
  }

  // Context 값 제공
  const ctxValue = {
    userAnswer: userAnswerState,  // 현재 상태 값
    addUserAnswer: addAnswer,     // 답안 추가 함수
  };

  // 자식 컴포넌트들에 Context 값을 제공
  return <UserAnswerContext.Provider value={ctxValue}>{children}</UserAnswerContext.Provider>;
}
```

Context 사용 시에 상태 변화 과정 요약

1. **`addAnswer` 함수**로 답안을 디스패치 (`userAnswerDispatch`).
2. **리듀서**에서 새로운 상태 반환: `userAnswerReducer`는 액션을 처리하고 새로운 배열을 반환합니다.
3. **React**가 상태 변경을 감지하고 컴포넌트를 **리렌더링**합니다.
4. `UserAnswerContext.Provider`를 통해 **최신 상태**를 **자식 컴포넌트**들에게 전달합니다.

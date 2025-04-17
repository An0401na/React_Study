> 이 프로젝트는 Udemy의 [【한글자막】 React 완벽 가이드 2025 with React Router & Redux](https://www.udemy.com/course/best-react/) 강의 일부의 연습 프로젝트 입니다.


# 📋 React Quiz App

이 프로젝트는 사용자가 문제을 읽고 시간 제한 내에 답안을 선택하는 퀴즈 앱 입니다. 주어진 문제를 다 풀면 결과 페이지를 제공합니다. 단순히 문제를 풀기만 하는 UI가 아닌, **상태 관리와 퀴즈 흐름**에 초점을 맞춰 구현했습니다. 이를 통해 React에서 컴포넌트를 어떻게 효율적으로 설계하고, Context API와 상태 관리를 어떻게 활용할 수 있는지에 대한 경험을 쌓을 수 있었습니다.

특히, 각 문제의 상태(문제 풀이 중, 정답 확인, 시간 초과 등)를 어떻게 처리할지에 대한 고민과, **시간 제한** 및 **문제 흐름**을 어떻게 자연스럽게 관리할 수 있을지에 대한 구현이 주요 포인트였습니다.

이 글에서는 퀴즈 앱의 **주요 기능**과 **구현 과정**, 그리고 퀴즈 앱을 만들면서 **고민했던 부분들**에 대해 차례대로 설명하려 합니다.

---

## 💡 **프로젝트 개요**

### 🔗 배포 링크 & 깃허브

- 👉 [배포 링크 바로가기](https://an0401na.github.io/React_Study/12-React-Quiz/)
- 👉 [GitHub Repo](https://github.com/An0401na/React_Study/tree/main/12-React-Quiz)

### 📌 프로젝트 소개

- **컴포넌트**: 앱을 작은 독립적인 부분으로 나눠 관리.
- **useState**: 퀴즈 진행 상태(현재 문제, 선택한 답 등) 관리.
- **useEffect**: 타이머와 상태 변화 관리.
- **useContext**: 사용자 답안 상태를 전역적으로 관리.
- **useReducer**: 복잡한 상태 관리 (답안 추가 등).
- **조건부 렌더링**: 퀴즈 화면과 결과 화면 전환.

### **🔑 핵심 기능**

- 퀴즈 문제 & 보기 랜덤 셔플
- 타이머 기반 자동 진행
- 사용자 답안 저장 및 요약
- Context API 기반 상태 관리

---

## 🏗️ 구현 과정 및 내부 로직

### 1️⃣ **전체적인 흐름**

1. **퀴즈 시작**: 사용자가 앱을 시작하면, `Quiz` 컴포넌트가 렌더링되어 문제들이 섞인 상태로 표시됩니다.
2. **문제 풀기**: 각 문제는 제한 시간이 주어지며, 사용자는 보기를 선택하거나 `Skip` 버튼을 눌러 문제를 건너뛸 수 있습니다.
3. **답안 제출**: 사용자가 답을 선택하면, `userAnswerContext`를 통해 답안 상태가 저장되고, 타이머가 종료되면 자동으로 정답이 표시됩니다.
4. **다음 문제로 이동**: 정답을 확인한 후, `Quiz` 컴포넌트는 자동으로 다음 문제로 넘어가며, 마지막 문제까지 진행합니다.
5. **결과 화면**: 모든 문제를 끝내면 `Summary` 컴포넌트가 렌더링되어 정답, 오답, 건너뛴 문제 수와 비율을 표시하고, 각 문제에 대한 사용자 선택 및 결과를 출력합니다.
6. **상태 관리**: `UserAnswerContext`와 `useReducer`를 통해 사용자의 답안을 관리하고, 각 컴포넌트 간 상태를 공유합니다.

---

### 2️⃣ 구조

📂 **폴더 구조**

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

**📌 컴포넌트 구조**


![image6](https://github.com/user-attachments/assets/563ae792-398d-49f3-95c6-1e35ed68307e)

```jsx
App
├── Header (상단 로고 + 타이틀)
│ 
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

- `Quiz` 컴포넌트는 퀴즈의 **전체 흐름을 관리**하는 중심 컴포넌트로, 하나의 문제에 대해 **퀴즈 문제 표시 → 사용자 선택 확인 → 정답 공개**라는 **3단계 상태 전환 로직**을 갖는다.
- 상태는 `useState`로 관리하며, 각각 다음과 같이 상태가 전환 되어진다.
    1. `QUIZ`: 문제 풀이 단계
        
        → 시간 만료 시: `handleTimeOut` → `handleSkipClick` 호출 → `CORRECT` 상태로 이동
        
        → 사용자 선택 시: `handleAnswerSelect` → `SELECTED` 상태로 이동
        
    
    ```jsx
    function handleAnswerSelect(answer) {
      setSelectedAnswer(answer);
      setQuizStage(STAGES.SELECTED);
      addUserAnswer({ ... });
    }
    
    function handleSkipClick() {
      setQuizStage(STAGES.CORRECT);
      addUserAnswer({ result: "skipped", ... });
    }
    ```
    
    1. `SELECTED`: 사용자가 선택한 답안을 보여주는 단계
    
    → 시간 만료 시: `handleTimeOut` → `CORRECT` 상태로 이동
    
    ```jsx
    **function handleTimeOut() {
      if (quizStage === STAGES.QUIZ) {
        handleSkipClick();
      } else if (quizStage === STAGES.SELECTED) {
        setQuizStage(STAGES.CORRECT);
      } else {
        handleNextQuestion();
      }
    }**
    ```
    
    1. `CORRECT`: 정답을 보여주는 단계
    
    → 시간 만료 시: `handleTimeOut` → `handleNextQuestion` 호출 → 다음 문제로 이동, `QUIZ` 상태 이동
    
    ```jsx
    function handleNextQuestion() {
      if (currentQuizIndex >= quizzes.length - 1) {
        onQuizEnd("summary");
        return;
      }
      setSelectedAnswer("");
      setCurrentQuizIndex((prev) => prev + 1);
      setQuizStage(STAGES.QUIZ);
    }
    ```
    
- `Question` 컴포넌트에 `key`를 부여함으로써 상태가 바뀔 때마다 **React가 컴포넌트를 새로 마운트하게 하여 타이머가 정상적으로 초기화**되도록 설계

```jsx
<Question
  key={`${currentQuizIndex}-${quizStage}`}
  question={quiz.text}
  quizStage={quizStage}
  onTimeOut={handleTimeOut}
/>

```

- **사용자의 선택한 답**은 **컨텍스트**를 통해 관리하여 저장 및 추적.
- **`Skip`버튼**을 통해 사용자가 문제를 건너뛰고 바로 **정답**을 확인할 수 있도록 기능을 추가
`QUIZ` 상태에서만 표시되도록 조건부 렌더링

```jsx
{quizStage === STAGES.QUIZ && (
  <button type="button" onClick={handleSkipClick}>Skip</button>
)}
```

---

### ⏳ **3. ProgressBar.jsx (진행 바 컴포넌트)**

- `ProgressBar`는 퀴즈 상태에 따라 자동으로 제한 시간을 계산하고, 남은 시간을 **10ms 단위로 실시간 표시**하는 컴포넌트
- 퀴즈를 푸는 단계(`QUIZ`)에서는 10초, 선택 확인이나 정답 공개 단계에서는 1초의 시간이 주어지며, 해당 시간은 상태 변화마다 자동 설정
- 첫 번째 `useEffect`에서는 **정해진 시간 후 자동 전환을 위한 `setTimeout`**을 등록하고, 상태 변경이나 언마운트 시 이를 정리

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    onTimeOut();
  }, time);

  return () => clearTimeout(timer); // 상태 변경 시 타이머 초기화
}, [time]);
```

- 두 번째 `useEffect`에서는 **남은 시간을 10ms 단위로 감소시키는 인터벌**을 설정하고, 퀴즈 상태가 바뀔 때마다 남은 시간을 다시 초기화하고 새 인터벌을 시작

```jsx
useEffect(() => {
  setRemainingTimer(time); // 상태 전환 시 남은 시간 초기화

  const interval = setInterval(() => {
    setRemainingTimer((prevTime) => prevTime - 10);
  }, 10);

  return () => {
    clearInterval(interval); // 상태 변경 또는 언마운트 시 인터벌 정리
  };
}, [time]);

```

- 진행 바는 `<progress>` 태그로 구현되며, `value`와 `max` 속성으로 남은 시간의 진행률 표시
- 정답이 공개되는 단계에서는 `answered` 클래스를 조건부로 추가해 스타일을 바꾸어 **시각적으로 상태 전환을 표시**

```jsx
<progress
  className={quizStage !== STAGES.QUIZ ? "answered" : ""}
  value={remainingTimer}
  max={time}
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
- 왜 사용자 답안을 Context로 관리했을까?
    - 초기에 **Prop Drilling 없이** 상태를 컴포넌트 내부에서 관리했지만,
        
        `Answer`에서 업데이트한 사용자 답안을 `Summary`에서 사용해야 했음.
        
    - `App`에서 `Quiz`와 `Summary`를 조건부로 렌더링하고,
        
        `Answer → Quiz → App → Summary`로 **불필요한 props 전달**이 이뤄질 수밖에 없는 구조였음.
        
    - 이런 불필요한 **prop 전달(Prop Drilling)**을 피하고, 상태를 **일관되게 접근하고 관리**하기 위해 Context API를 도입함.
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

**🌟 주요 단계:**

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

🧭 **Context 사용 흐름 요약**

1. 사용자가 답안을 선택하면 **`addAnswer` 함수**로 답안을 디스패치 (`userAnswerDispatch`).
2.  `userAnswerReducer`는 액션을 처리하고 새로운 배열을 반환
3. **React**가 상태 변경을 감지하고 컴포넌트를 **리렌더링**
4. `UserAnswerContext.Provider`를 통해 **최신 상태**를 **자식 컴포넌트**들에게 전달

---

## **🎯 결과 예시**
![image](https://github.com/user-attachments/assets/d6178394-de82-4f3a-9d48-f3f177db0d47)
![imagde](https://github.com/user-attachments/assets/a1ddbec1-6c5c-46dd-aed4-f45ec9b3d05c)
![imag3e](https://github.com/user-attachments/assets/a0983c60-d6ec-44ac-9d83-e258dfe1da2b)
![imag4e](https://github.com/user-attachments/assets/35c5f83f-92bf-4da9-aba4-6ad4e339f5c8)
![i5mage](https://github.com/user-attachments/assets/e7e38f81-e560-4819-8f08-32f9252c3b76)


---

## 🛠️ **트러블슈팅**

### ❌ 1. 퀴즈가 두 개씩 넘어가는 문제

**🚨 문제 원인:**

```jsx
const timer = setTimeout(() => {
  onTimeExpired();
}, TIMER);
```

- `setTimeout`이 컴포넌트 렌더링 때마다 **중복 실행**되어, `onTimeExpired()`가 **두 번 이상 호출**됨.
- 특히 `Question` 컴포넌트가 상태 변화로 인해 리렌더링될 경우 타이머가 새로 생성되며 중복 타이머 발생.

**💡 해결 방법:**

- `useEffect`를 사용해 **타이머 생성을 제어**하고, **클린업 함수**로 이전 타이머 제거.

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    onTimeExpired();
  }, TIMER);

  return () => clearTimeout(timer);
}, [onTimeExpired]);
```

- 이렇게 하면 `Question`이 리렌더링될 때 **기존 타이머 제거 + 새 타이머 생성**으로 중복 실행 방지

---

### ❌ 2. ProgressBar가 리셋되지 않는 문제

**🚨 문제 원인:**

- `quizStage`가 `"showSelectedAnswer"` → `"showCorrectAnswer"`로 바뀌어도
    
    `ProgressBar`의 `time` 값은 변경되지만 **컴포넌트 자체는 리렌더링되지 않음**.
    
- React는 같은 컴포넌트에 prop만 바뀐다고 해서 완전히 리셋하지 않음.

**💡 해결 방법:**

- `key` props를 사용해 `Question` 컴포넌트를 강제로 **재마운트**.
- `key`가 바뀌면 React는 해당 컴포넌트를 완전히 제거 후 다시 생성함.

```jsx
<Question
  key={`${currentQuizIndex}-${quizStage}`} // 🔑 이게 핵심!
  question={quiz.text}
  time={time}
  isAnswered={quizStage !== "quiz"}
/>
```

✅ 이렇게 하면 `quizStage`가 바뀔 때마다 `ProgressBar`도 **초기화되어 새로 시작**됨.

---

### ❌ 3. 초기에는 질문만 셔플했지만 답안마다 셔플하려다 App 렌더링 시 셔플로 변경

**🚨 문제 원인:**

- 답안 목록을 출력할 때 답안을 매번 셔플하려고 했더니 **렌더링 시마다 답 순서가 바뀌어 혼란** 발생.

**💡 해결 방법:**

- 앱이 **최초 렌더링될 때** 질문 + 답안을 모두 셔플해서 **일관된 순서 유지**.
- `lodash.shuffle`을 사용하여 초기화 단계에서만 섞이도록 수정.

---

## 🔥 **배운 점 & 느낀 점**

- `useReducer`와 Context API를 함께 활용해 **복잡한 전역 상태를 구조적으로 관리**하는 법을 익혔다.
- 상태 흐름을 설계하면서 **전역 상태와 지역 상태의 경계**에 대해 고민해볼 수 있었다.
- 타이머 기능을 구현하며 `useEffect`와 `setInterval`의 **클린업 처리의 중요성**을 체감했다.
- **조건부 렌더링과 분기 처리**를 통해 앱의 흐름을 명확하게 제어할 수 있었다.
- 사용자 경험을 고려해 **선택지 셔플**, **시도 횟수 제한**, **정답 확인** 등 다양한 로직을 React로 유연하게 구현할 수 있었다.
- 전역 상태를 기반으로 `Answer`, `Quiz`, `Summary` 컴포넌트 간의 데이터를 주고받으며 **prop drilling 없이 컴포넌트 간 소통**하는 구조를 설계해볼 수 있었다.
- 작은 기능이라도 **커스텀 훅으로 분리**해서 재사용성과 가독성을 높이는 습관을 들이게 되었다.

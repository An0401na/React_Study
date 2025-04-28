import { useState } from "react";
import Input from "./Input.jsx";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation.js";

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({
    // 사용자와 상호작용을 통해 포커스를 잃었는지 저장
    email: false,
    password: false,
  });

  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValue.email) &&
    !isNotEmpty(enteredValue.email);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValue.password, 6);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit");
    console.log(enteredValue);
  }

  function handleInputChange(identifier, value) {
    setEnteredValue((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: true,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="text"
          name="email"
          onBlur={() => handleInputBlur("email")} // 포커스를 잃을 때마다 발현
          onChange={(event) => handleInputChange("email", event.target.value)}
          value={enteredValue.email}
          error={emailIsInvalid && "유효한 이메일 주소를 입력해 주세요."}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur("password")} // 포커스를 잃을 때마다 발현
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          value={enteredValue.password}
          error={passwordIsInvalid && "비밀번호는 6자 이상이어야 합니다."}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

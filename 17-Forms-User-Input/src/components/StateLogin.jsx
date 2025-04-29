import Input from "./Input.jsx";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit");
    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
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
          onBlur={handleEmailBlur} // 포커스를 잃을 때마다 발현
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "유효한 이메일 주소를 입력해 주세요."}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur} // 포커스를 잃을 때마다 발현
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && "비밀번호는 6자 이상이어야 합니다."}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

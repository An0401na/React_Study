import { useRef, useState } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log(email, password);
    const emailIsValid = email.includes("@");

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);
    console.log("Sending data to server...");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" ref={emailRef} />
          <div className="control-error">
            {emailIsInvalid && <p>유효한 이메일 주소를 입력해 주세요.</p>}{" "}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

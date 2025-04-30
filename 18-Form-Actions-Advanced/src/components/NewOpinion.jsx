import { useActionState } from "react";

export function NewOpinion() {
  function shareOpinionAction(prevFormState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (title.trim().length < 5) {
      errors.push("제목은 5자 이상이어야 합니다.");
    }

    if (body.trim().length < 10 || body.trim.length > 300) {
      errors.push("의견은 10자 이상 300자 이하이어야 합니다.");
    }

    if (!isNotEmpty(userName)) {
      errors.push("이름을 입력해야 합니다.");
    }

    if (!isNotEmpty(title)) {
      errors.push("제목을 입력해야 합니다.");
    }

    if (!isNotEmpty(body)) {
      errors.push("의견을 입력해야 합니다.");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }
    return { errors: null }; // null 이면 모든 유효성 검증 패스
  }
  function isNotEmpty(value) {
    return value.trim() !== "";
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    // 폼을 제출 할때마다 shareOpinionAction 이 호출됨
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <ul className="error-list">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}

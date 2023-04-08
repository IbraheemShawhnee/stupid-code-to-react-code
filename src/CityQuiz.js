import { useState } from "react";

function CityQuiz() {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("empty");
  const [hideForm, setHideForm] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
    setHideForm(false);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    setStatus(e.target.value.length === 0 ? "empty" : "typing");
  };

  const isFormDisabled = status === "submitting" || status === "success";
  const isButtonDisabled = isFormDisabled || status === "empty";

  return (
    <>
      {hideForm && (
        <form onSubmit={handleSubmit}>
          <h2>City quiz</h2>
          <p>What city is located on two continents?</p>
          <textarea
            value={answer}
            onChange={handleAnswerChange}
            disabled={isFormDisabled}
          />
          <br />
          <button type="submit" disabled={isButtonDisabled}>
            Submit
          </button>
          <p style={{ display: status === "submitting" ? "" : "none" }}>
            Loading...
          </p>
        </form>
      )}
      <p style={{ display: status === "error" ? "" : "none", color: "red" }}>
        Good guess but a wrong answer. Try again!
      </p>
      <h1 style={{ display: status === "success" ? "" : "none" }}>
        That's right!
      </h1>
    </>
  );
}

async function submitForm(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() === "istanbul") {
        resolve();
      } else {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      }
    }, 1500);
  });
}
export default CityQuiz;

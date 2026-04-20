import { useState } from "react";
import "./Register.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const userCreateForm = document.querySelector(".form-registration");

  const userCreateFormFunc = (event) => {
    event.preventDefault();
    const formData = new FormData(userCreateForm);
    const formDataObject = Object.fromEntries(formData);

    fetch("http://127.0.0.1:8000/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formDataObject,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className="form-registration" onSubmit={userCreateFormFunc}>
        <div className="regFormInputs">
          <input
            className="input validator"
            type="text"
            id="username"
            name="username"
            placeholder="login*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input validator"
            type="text"
            id="first_name"
            name="first_name"
            placeholder="first_name*"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="input validator"
            type="text"
            id="last_name"
            name="last_name"
            placeholder="last_name*"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            className="input validator"
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input validator"
            type="password"
            id="password"
            name="password"
            placeholder="Password*"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input validator"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password*"
            required
          />
        </div>
        <button
          className="btn btn-neutral mt-4"
          //className="regFormButton"
          type="submit"
        >
          {" "}
          Registration
        </button>
      </form>
    </div>
  );
};

export default Register;

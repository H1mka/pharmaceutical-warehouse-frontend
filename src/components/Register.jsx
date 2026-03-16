import { useState } from "react";
import "./Register.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formcClick = () => {
    console.log(name, email, password);
  };
  return (
    <div>
      <form className="registration">
        <div className="regFormInputs">
          <input
            className="input validator"
            type="text"
            id="username"
            placeholder="login*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input validator"
            type="email"
            id="email"
            placeholder="example@example.com*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input validator"
            type="password"
            id="password"
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
          onClick={formcClick}
        >
          {" "}
          Registration
        </button>
      </form>
    </div>
  );
};

export default Register;

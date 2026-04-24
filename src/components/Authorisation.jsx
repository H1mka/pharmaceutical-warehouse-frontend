import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/router/routes";
import "./Auth.scss";

const Authorisation = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:8000/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("LOGIN DATA:", data);

        // ✅ ПРОВЕРКА
        if (!data || !data.user) {
          console.error("User not found in response");
          alert("Login error: no user data");
          return;
        }

        console.log("ROLE:", data.user.role);

        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("userUpdated"));

        if (data.user.role === "admin") {
          navigate(ROUTES.SETTINGS);
        } else if (data.user.role === "pharmacist") {
          navigate(ROUTES.PHARMACIST);
        } else {
          navigate(ROUTES.HOME);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Wrong credentials WHO ARE YOU?");
      });
  };

  return (
    <div>
      <form className="form-authorisation" onSubmit={handleLogin}>
        <div className="authFormInputs">
          <input
            className="input validator"
            type="text"
            name="username"
            placeholder="login*"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="input validator"
            type="password"
            name="password"
            placeholder="Password*"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-neutral mt-4" type="submit">
          Authorisation
        </button>
      </form>
    </div>
  );
};

export default Authorisation;

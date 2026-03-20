import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    console.log("EMAIL:", JSON.stringify(email));
    console.log("PASSWORD:", JSON.stringify(password));

    const res = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("SUCCESS:", res.data);

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");

  } catch (err) {
    console.log("ERROR FULL:", err);
    console.log("ERROR DATA:", err.response?.data);
    alert("Invalid credentials");
  }
};

  return (
    <div style={{ padding: 50 }}>
      <h2>Admin Login</h2>

<input 
  placeholder="Email" 
  value={email}
  onChange={(e) => setEmail(e.target.value.trim())}
/>
<br>
</br>

<input 
  type="password" 
  placeholder="Password" 
  value={password}
  onChange={(e) => setPassword(e.target.value.trim())}
/>
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
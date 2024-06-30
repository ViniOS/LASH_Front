import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, senha: password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const { mensagem, token, nome } = await response.json();
      if (mensagem === "Login feito com sucesso") {
        localStorage.setItem("token", token);
        localStorage.setItem("nomeUsuario", nome); // Armazenar token
        window.location.href = "http://localhost:5173/pacientes"; // Redireciona para a página de pacientes
      } else {
        setError(mensagem);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/usuarios/logout", {
        method: "POST",
      });
      localStorage.removeItem("token"); // Remove token do localStorage
      localStorage.removeItem("nomeUsuario"); // Remove nome do usuário do localStorage
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="bg-red-800 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {isLoggedIn ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome, {username}!</h1>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-600"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-600"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

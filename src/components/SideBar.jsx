import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SideBar() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('');

  const token = localStorage.getItem("token");

  useEffect(() => {
    const nome = localStorage.getItem("nomeUsuario");
    console.log(nome);
    if (nome) {
      setNomeUsuario(nome);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("nomeUsuario"); // Remova o nome do usuário do localStorage
        navigate("/");
      } else {
        console.error("Falha no logout");
      }
    } catch (error) {
      console.error("Erro ao realizar logout", error);
    }
  };

  return (
    <div className="flex-initial w-1/5">
      <nav className="bg-white text-lg font-semibold text-slate-100">
        <div className="flex flex-col justify-between content-evenly h-screen bg-red-800">
          <div className="w-2/4 p-2 m-2">
            <h2 className="text-2xl font-bold text-slate-100">LASH</h2>
          </div>
          <div className="flex flex-col gap-5 mx-auto">
            <Link to={"/pacientes"} className="cursor-pointer hover:opacity-80">
              Pacientes
            </Link>
            <Link
              to={"/responsaveis"}
              className="cursor-pointer hover:opacity-80"
            >
              Responsáveis
            </Link>
            <Link
              to={"/frequencia"}
              className="cursor-pointer hover:opacity-80"
            >
              Frequência
            </Link>
            <Link to={"/doencas"} className="cursor-pointer hover:opacity-80">
              Doenças
            </Link>
          </div>
          <div className="flex flex-row items-center ml-2">
            <div className="flex border-2 rounded-full w-2/4 p-2 m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <h3>{nomeUsuario || "ADMIN"}</h3>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 bg-white text-red-600 py-1 px-2 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;

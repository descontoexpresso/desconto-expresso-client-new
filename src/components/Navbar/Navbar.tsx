import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  fotoUsuario?: string;
}

const Navbar: React.FC<NavbarProps> = ({ fotoUsuario }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/listaProdutos?search=${searchQuery}`);
      setIsModalOpen(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const searchBarColor = (): string => {
    switch (location.pathname) {
      case "/home":
        return "bg-verde";
      case "/":
        return "bg-verde-escuro";
      case "/login":
        return "bg-verde-escuro";
      case "/sobre-nos":
        return "bg-azul";
      case "/listaProdutos":
        return "bg-amarelo-escuro";
      case "/listaCategorias":
        return "bg-laranja";
      case "/perfil":
        return "bg-verde-escuro";
      case "/editar-perfil":
        return "bg-verde-escuro";
      case "/cadastrarProduto":
        return "bg-verde";
      case "/editarProduto/:id":
        return "bg-verde";
      case "/deletarProduto/:id":
        return "bg-verde";
      case "/cadastrarCategoria":
        return "bg-laranja";
      case "/editarCategoria/:id":
        return "bg-laranja";
      case "/deletarCategoria/:id":
        return "bg-laranja";
      default:
        return "bg-base-100";
    }
  };

  const dynamicBorderColor = (): string => {
    switch (location.pathname) {
      case "/home":
        return "border-verde";
      case "/":
        return "border-verde-escuro";
      case "/login":
        return "border-verde-escuro";
      case "/sobrenos":
        return "border-azul-escuro";
      case "/listaProdutos":
        return "border-amarelo-escuro";
      case "/listaCategorias":
        return "border-laranja";
      case "/perfil":
        return "border-verde-escuro";
      case "/editar-perfil":
        return "border-verde-escuro";
      case "/cadastrarProduto":
        return "border-verde";
      case "/deletarProduto/:id":
        return "border-verde";
      case "/editarProduto/:id":
        return "border-verde";
      case "/cadastrarCategoria":
        return "border-laranja";
      case "/editarCategoria/:id":
        return "border-laranja";
      case "/deletarCategoria/:id":
        return "border-laranja";
      default:
        return "border-base-100";
    }
  };

  return (
    <div className="relative bg-cinza-claro mx-auto rounded-full max-w-[90%] p-1">
      <div className="navbar h-14">
        <div className="navbar-start">
          {/* Dropdown para telas pequenas */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-verde"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52 text-verde"
            >
              <Link to="/inicio" className="hover:underline">
                Perfil
              </Link>
              <Link to="/home" className="hover:underline">
                Início
              </Link>
              <Link to="/listaProdutos" className="hover:underline">
                Produtos
              </Link>
              <Link to="/listaCategorias" className="hover:underline">
                Lista Categorias
              </Link>
              <Link to="/sobrenos" className="hover:underline">
                Sobre Nós
              </Link>
              <li>
                <button
                  className="w-full text-left hover:underline"
                  onClick={() => setIsModalOpen(true)}
                >
                  Buscar
                </button>
              </li>
            </ul>
          </div>
          {/* Links para telas maiores */}
          <div className="hidden lg:flex space-x-4 text-verde items-center">
            <Link to="/perfil">
              <img
                src={fotoUsuario}
                alt="Imagem de Perfil"
                className="w-14 h-14 rounded-full btn-ghost hover:bg-green-100"
              />
            </Link>
            <Link to="/home" className="hover:underline">
              Início
            </Link>
            <Link to="/listaProdutos" className="hover:underline">
              Produtos
            </Link>
            <Link to="/listaCategorias" className="hover:underline">
              Lista Categorias
            </Link>
            <Link to="/sobrenos" className="hover:underline">
              Sobre Nós
            </Link>
          </div>
        </div>
        <div className="navbar-center flex items-center justify-center">
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 -bottom-8`}
          >
            <img
              src="https://imgur.com/pOg392C.png"
              alt="Desconto Expresso"
              className={`w-24 ${dynamicBorderColor()} border-8 rounded-full`}
            />
          </div>
        </div>
        <div className="navbar-end hidden sm:flex">
          <div
            className={`search-bar ${searchBarColor()} flex items-center justify-center rounded-full p-2`}
          >
            {/* Ícone de busca */}
            <button onClick={handleSearch}>
              <FaSearch className="text-xl text-white lg:text-white" />
            </button>
            {/* Barra de pesquisa responsiva */}
            <input
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Buscar Produto"
              className={`input ${searchBarColor()} focus:outline-none h-6 text-white placeholder-white lg:w-full w-24 transition-width duration-300`}
            />
          </div>
        </div>
        <div className="navbar-end sm:hidden">
          <button
            className="btn btn-ghost text-verde"
            onClick={() => setIsModalOpen(true)}
          >
            <FaSearch className="text-xl" />
          </button>
        </div>
      </div>
      {/* Modal para busca em telas pequenas */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Buscar Produto</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <input
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Buscar Produto"
              className="input bg-gray-200 w-full p-2 rounded mb-4 text-black"
            />
            <button
              onClick={handleSearch}
              className="btn bg-verde border-none text-white w-full p-2 rounded text-xl"
            >
              Buscar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

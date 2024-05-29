import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";
import { Hourglass } from "react-loader-spinner";
import Navbar from "../../components/navbar/Navbar";


function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin } = useContext(AuthContext);

  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <>
    <div
      className=" bg-fundo-login mt-0 bg-cover bg-center bg-fixed"
      style={{ minHeight: "100vh", minWidth: "100%" }}
    >
      {/*Fazer esta div espaç0-navbar em todas as paginas*/}
    <div id="espaço-navbar" className="h-4">
    <h1>      </h1>
    </div>
    <div className="">
          <Navbar/>
    </div>
      <div className="flex flex-wrap justify-center gap-12 items-center h-screen ">
      <form
        className="bg-black p-6 bg-opacity-50 rounded-lg shadow-lg lg:w-1/3 md:1/3 sm:w-auto lg:h-96 md:h-96 gap-4"
        onSubmit={login}
      
      >
        
        <h2 className="text-white text-5xl text-center">LOGIN</h2>
        <div className="flex flex-col w-full">
          <label className="text-white" htmlFor="emailUsuario">
            Usuário
          </label>
          <input
            type="text"
            id="emailUsuario"
            name="emailUsuario"
            placeholder="Digite seu e-mail de usuário"
            className="border-2 border-white rounded p-2 mt-2 bg-transparent mb-5"
            value={usuarioLogin.emailUsuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            className="text-white"
            htmlFor="senhaUsuario text-verde-escuro"
          >
            Senha
          </label>
          <input
            type="password"
            id="senhaUsuario"
            name="senhaUsuario"
            placeholder="Digite sua senha"
            className="border-2 border-white rounded p-2 mt-2 bg-transparent"
            value={usuarioLogin.senhaUsuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
            type="submit"
            className="rounded bg-verde-escuro hover:bg-verde-medio-hover text-white w-1/2 py-2 mx-auto block mt-4 transition-colors duration-300 ease-in-out hover:delay-300 mb-4"
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-full w-full">
                <Hourglass
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={["verde-escuro", "verde"]}
                />
              </div>
            ) : (
              <span>Entrar</span>
            )}
          </button>

        <hr className="border-white w-full mt-4" />
        <p className="mt-4 text-white">
          Ainda não tem uma conta?{" "}
          <Link
            to="/cadastro"
            className="text-white hover:text-verde-escuro font-bold duration-100 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </form>
      
      <div className="bg-white p-4 text-verde-escuro font-bold rounded-lg h-96">
        <div className="flex justify-center items-center bg-orange-500 h-52 text-white rounded-lg mb-10 w-72">
            Arte maneira do Caju
        </div>
        <img src="/assets/logo.png" alt="logo" className="w-24 -mt-20 mx-auto border-8 border-white rounded-full" />
        <div className="text-2xl flex justify-center">
          Seja Bem Vinde ao<br></br>
          Desconto Expresso!
        </div>
      </div>
      </div>
    </div>
    </>
    
  );
}

export default Login;
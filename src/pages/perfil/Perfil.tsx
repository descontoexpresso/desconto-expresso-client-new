import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar/Navbar';

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (!usuario || usuario.token === "") {
      alert('Você precisa estar logado');
      navigate("/login");
    }
  }, [usuario, navigate]);

  if (!usuario || !usuario.nomeUsuario) {
    return <div>Carregando...</div>; 
  }
  
  console.log(usuario);

  return (
    <div className="bg-cinza-claro bg-cover font-sans min-h-screen">
      <div className="bg-verde-escuro min-h-[130px]">
        <div className="h-4" />
        <Navbar fotoUsuario={usuario.fotoUsuario} />
        <div className="h-4" />
      </div>
      <img src="public/assets/quadrado-verde-escuro.png" alt="Decorative Background" style={{ minWidth: "100%" }} />
      <p className="text-verde-escuro font-bold text-center mt-14 text-5xl">MEU PERFIL</p>
      <div className="absolute left-1/2 transform -translate-x-1/2 border-8 rounded-full border-cinza-claro">
        <img 
          src={usuario.fotoUsuario} 
          alt={`Foto de perfil de ${usuario.nomeUsuario} ${usuario.sobrenomeUsuario}`} 
          className="w-32 rounded-full" 
        />
      </div>

      <div className="bg-verde-escuro text-white rounded-xl pb-10 mb-10 mx-32">
        <p className="text-center text-4xl mt-4 pb-30 pt-32">
          {usuario.nomeUsuario} {usuario.sobrenomeUsuario}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 mt-10 space-x-2">
          <div>
            <p className="text-center text-2xl mt-8">Dados de Usuário</p>
            <ul className="border-white rounded-xl border-2 p-6 m-4 text-left">
              <li className="mb-4">Data de Nascimento: {usuario.dataNascimento}</li>
              <li className="mb-4">Telefone: {usuario.telefone}</li>
              <li className="mb-4">Cadastro Único: {usuario.cadastroUnico}</li>
              <li className="mb-4">E-mail: {usuario.emailUsuario}</li>
            </ul>
            <div className="text-center mt-4">
              <a href="/editar-perfil" className="inline-block px-4 py-2 border-2 border-white rounded-lg focus:outline-none focus:border-cinza-claro">
                <p className="text-xl">Editar Perfil</p>
              </a>
            </div>
          </div>
          <div>
            <p className="text-center text-2xl">Dados de Endereço</p>
            <ul className="border-white text-left rounded-xl border-2 p-6 m-4">
              <li className="mb-4">CEP: {usuario.cep}</li>
              <li className="mb-4">Cidade: {usuario.cidade}</li>
              <li className="mb-4">Bairro: {usuario.bairro}</li>
              <li className="mb-4">Rua: {usuario.rua}</li>
              <li className="mb-4">Complemento: {usuario.numeroCasa}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <img src="public/assets/quadrado-verde-escuro.png" alt="Decorative Background" style={{ minWidth: "100%" }} />
        <div className="bg-verde-escuro min-h-[40px]" />
      </div>
    </div>
  );
}

export default Perfil;

import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Navbar from '../../components/Navbar/Navbar'
import { toastAlerta } from '../../utils/toastAlerta'

function Perfil() {
  const navigate = useNavigate()

  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if (usuario.token === "") {
      toastAlerta('Você precisa estar logado', 'info')
      navigate("/login")
    }
  }, [usuario.token])

  return (
    <>
      <div className="bg-cinza-claro bg-cover font-sans min-h-screen">
        <div className="bg-verde-escuro min-h-[130px]">
          <div className="h-4" />
          <Navbar fotoUsuario={usuario.fotoUsuario} />
          <div className="h-4" />
        </div>
        <img src="https://imgur.com/2uDKodl.png" alt="Decorative Background" style={{ minWidth: "100%" }} />
        <p className="text-verde-escuro font-bold text-center mt-14 text-4xl uppercase">Meu Perfil</p>
        <div className='p-4'>
          <div className='container mx-auto mt-8 rounded-2xl overflow-hidden'>
            <img src='https://imgur.com/8hEiskI.png' className='w-full h-72 object-cover border-b-8 border-white' alt="Capa do Perfil" />
            <img src={usuario.fotoUsuario} alt={`Foto de perfil de ${usuario.nomeUsuario}`} className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10' />
            <div className="relative mt-[-6rem] h-72 flex flex-col font-bold bg-verde-escuro text-white text-2xl items-center justify-center">
              <div id="espaço-navbar" className="h-4"><h1></h1></div>
              <div id="espaço-navbar" className="h-4"><h1></h1></div>
              <div id="espaço-navbar" className="h-4"><h1></h1></div>
              <p className="text-center">Nome: {usuario.nomeUsuario}</p>
              <p className="text-center">Email: {usuario.emailUsuario}</p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <img src="https://imgur.com/2uDKodl.png" alt="Decorative Background" style={{ minWidth: "100%" }} />
          <div className="bg-verde-escuro min-h-[40px]" />
        </div>
      </div>
    </>
  )
}

export default Perfil

import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext'
import Categoria from '../../../models/Categoria'
import { buscar, deletar } from '../../../services/Service'
import Navbar from '../../Navbar/Navbar'
import { toastAlerta } from '../../../utils/toastAlerta'

function DeletarCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/listaCategorias")
    }

    async function deletarCategoria() {
        try {
            await deletar(`/categorias/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Categoria apagada com sucesso', 'sucesso')

        } catch (error) {
            toastAlerta('Erro ao apagar a Categoria', 'erro')
        }

        retornar()
    }

    return (
        <div className="bg-cinza-claro bg-cover" style={{ minWidth: "100%" }}>
            <div className="bg-laranja min-h-[200px]">
                {/* Navbar */}
                <div id="espaço-navbar" className="h-4"><h1></h1></div>
                <Navbar fotoUsuario={usuario.fotoUsuario} />

                <p className="text-cinza-claro font-bold uppercase text-center g-4 mt-16 text-base md:text-2xl">Deletar</p>
                <p className="text-cinza-claro text-center g-4 p-4 mt-2 text-base md:text-base">Você tem certeza de que deseja deletar a categoria a seguir?</p>

                <div id="espaço-navbar" className="h-4"><h1></h1></div>
                <div id="espaço-navbar" className="h-4"><h1></h1></div>

                <img src="/assets/quadrado-laranja.png" style={{ minWidth: "100%" }} />
            </div>

            {/* Card deletar */}
            <div className="flex flex-col items-center mt-2 p-4">
                <div className='border rounded-2xl border-verde-escuro border-2 p-6 items-center w-full my-16 md:w-6/12'>

                    {/* Imagem */}
                    <div className='p-2 my-2 w-full'>
                        <img 
                        src={categoria.fotoCategoria} 
                        alt={categoria.descricaoCategoria} 
                        className='rounded-2xl h-64 w-full'
                        />
                    </div>

                    {/* Nome */}
                    <div className='bg-laranja h-14 w-full p-2 rounded-full my-6'>
                        <p className="text-cinza-claro font-bold p-1 ml-2 text-base md:text-2xl">{categoria.nomeCategoria}</p>
                    </div>

                    {/* Descrição */}
                    <div className="card-body flex flex-col items-center justify-center space-y-2 md:space-y-4">
                        <p className="text-laranja text-center text-base">{categoria.descricaoCategoria}</p>
                    </div>

                    {/* Botões */}
                    <div className="card-actions justify-center my-2">
                        <button className="btn bg-verde rounded-full rounded-r-none mr-0 sm:mr-3.5 md:mr-0 lg:mr-0 w-full sm:w-auto md:w-80 lg:w-80 text-white hover:bg-verde-amarelado"
                            onClick={deletarCategoria}>
                            Sim
                        </button>
                        <button className="btn bg-vermelho rounded-full rounded-l-none ml-0 sm:ml-3.5 md:ml-0 lg:ml-0 w-full sm:w-auto md:w-80 lg:w-80 text-white hover:bg-vermelho-claro"
                            onClick={retornar}>
                            Não
                        </button>
                    </div>
                    
                </div>
            </div>

            {/* Footer */}
            <div>
                <img src="/assets/quadrado-laranja.png" style={{ minWidth: "100%" }} />
                <div className="bg-laranja min-h-[40px]"></div>
            </div>
        </div>
    );

}

export default DeletarCategoria;
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Produto from '../../../models/Produto'
import { buscar, deletar } from '../../../services/Service'
import Navbar from '../../Navbar/Navbar'

function DeletarProduto() {
    {/* Funcionalidades de deletar */ }
    const [produto, setProduto] = useState<Produto>({} as Produto)
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/listaProdutos")
    }

    async function deletarProduto() {
        try {
            await deletar(`/produtos/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Produto deletado com sucesso')

        } catch (error) {
            alert('Erro ao apagar o Produto')
        }

        retornar()
    }

    return (
        <div className="bg-cinza-claro bg-cover" style={{ minWidth: "100%" }}>
            <div className="bg-verde min-h-[200px]">
                {/* Navbar */}
                <div id="espaço-navbar" className="h-4"><h1></h1></div>
                <Navbar fotoUsuario={usuario.fotoUsuario} />

                <p className="text-cinza-claro font-bold uppercase text-center g-4 mt-16 text-base md:text-2xl">Deletar</p>
                <p className="text-cinza-claro text-center g-4 p-4 mt-2 text-base md:text-base">Você tem certeza de que deseja deletar o produto a seguir?</p>

                <div id="espaço-navbar" className="h-4"><h1></h1></div>
                <div id="espaço-navbar" className="h-4"><h1></h1></div>
            </div>

            <img src="/assets/quadrado-verde.png" style={{ minWidth: "100%" }} />

            {/* Card deletar */}
            <div className="flex flex-col items-center mt-6 p-4">
                <div className='border rounded-2xl border-verde-escuro border-2 p-6 items-center w-full my-16 md:w-6/12'>

                    {/* Imagem */}
                    <div className="flex items-center justify-center -mt-24">
                        <img
                            src={produto.fotoProduto}
                            alt={produto.nomeProduto}
                            className="w-42 h-52 object-cover"
                        />
                    </div>

                    {/* Nome */}
                    <div className='bg-verde h-14 w-full p-2 rounded-full my-6'>
                        <p className="text-cinza-claro font-bold p-1 ml-2 text-base md:text-2xl">{produto.nomeProduto}</p>
                    </div>

                    {/* Descrição */}
                    <div className="card-body flex flex-col items-center justify-center space-y-2 md:space-y-4">
                        <p className="text-verde text-center text-base">{produto.descricaoProduto}</p>
                    </div>

                    {/* Botões */}
                    <div className="card-actions justify-center my-2">
                        <button className="btn bg-verde rounded-full rounded-r-none mr-0 sm:mr-3.5 md:mr-0 lg:mr-0 w-full sm:w-auto md:w-80 lg:w-80 text-white hover:bg-verde-amarelado"
                            onClick={deletarProduto}>
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
                <img src="/assets/quadrado-verde.png" style={{ minWidth: "100%" }} />
                <div className="bg-verde min-h-[40px]"></div>
            </div>

        </div>
    );

}

export default DeletarProduto;
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produto";
import Categoria from "../../../models/Categoria";
import { buscar, atualizar } from "../../../services/Service";
import Navbar from "../../Navbar/Navbar";

function FormularioEditarProduto() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        nomeCategoria: "",
        descricaoCategoria: "",
        fotoCategoria: "", // Add the missing property 'fotoCategoria'
    });
    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nomeProduto: "",
        descricaoProduto: "",
        estoque: 0,
        preco: 0,
        dataValidade: "",
        fotoProduto: "",
        categoria: null,
        usuario: null,
    });

    async function buscarProdutoPorId(id: string) {
        await buscar(`/produtos/${id}`, setProduto, {
            headers: {
                Authorization: token,
            },
        });
    }

    async function buscarCategoriaPorId(id: string) {
        await buscar(`/categorias/${id}`, setCategoria, {
            headers: {
                Authorization: token,
            },
        });
    }

    async function buscarCategorias() {
        await buscar("/categorias", setCategorias, {
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        buscarCategorias();
        if (id !== undefined) {
            buscarProdutoPorId(id);
        }
    }, [id]);

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        });
    }, [categoria]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria,
            usuario: usuario,
        });
    }

    async function editarProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await atualizar(`/produtos`, produto, setProduto, {
                headers: {
                    Authorization: token,
                },
            });
            alert("Produto atualizado com sucesso");
            navigate("/listaProdutos");
        } catch (error: any) {
            if (error.toString().includes("403")) {
                alert("O token expirou, favor logar novamente");
                handleLogout();
            } else {
                alert("Erro ao atualizar o Produto");
            }
        }
    }

    return (
        <>
            <div className="bg-verde min-h-[130px]">
                {/* Navbar */}
                <div id="espaço-navbar" className="h-4"><h1></h1></div>
                <Navbar fotoUsuario={usuario.fotoUsuario} />
            </div>

            <img src="/assets/quadrado-verde.png" style={{ minWidth: "100%" }} />

            {/* Área do formulário */}
            <div className="bg-fundo-form bg-cover bg-center bg-fixed" style={{ minWidth: '100%' }}>

                <div id="espaço-navbar" className="h-4"><h1></h1></div>
                <div id="espaço-navbar" className="h-4"><h1></h1></div>

                <p className="text-verde uppercase font-bold text-center text-base md:text-lg">Editar Produto</p>

                {/* Formulário */}
                <div className="flex flex-col items-center mt-6">

                    <form onSubmit={editarProduto} className="flex flex-col md:flex-row gap-4 items-start bg-none p-6 rounded-lg shadow-none">

                        {/* Dados do produto */}
                        <div className="border rounded-2xl border-verde-escuro border-2 p-6 items-start w-full md:w-9/12">
                            <div className="flex flex-col gap-2 mt-2">
                                <label className="text-verde-escuro font-semibold" htmlFor="nomeProduto">Nome</label>
                                <input
                                    type="text"
                                    name="nomeProduto"
                                    placeholder="Nome do Produto"
                                    className="border-2 border-verde-escuro rounded-xl p-2 bg-transparent"
                                    value={produto.nomeProduto}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2 mt-2">
                                <label className="text-verde-escuro font-semibold" htmlFor="descricaoProduto">Descrição</label>
                                <input
                                    type="text"
                                    name="descricaoProduto"
                                    placeholder="Descrição do Produto"
                                    className="border-2 border-verde-escuro rounded-xl p-2 bg-transparent"
                                    value={produto.descricaoProduto}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    required
                                />
                            </div>

                            {/* Estoque e Preço */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-4 mt-2">
                                <div className="flex flex-col gap-2 mt-2">
                                    <label className="text-verde-escuro font-semibold" htmlFor="estoque">Estoque</label>
                                    <input
                                        type="number"
                                        name="estoque"
                                        placeholder="Estoque Disponível do Produto"
                                        className="border-2 border-verde-escuro rounded-xl p-2 bg-transparent"
                                        value={produto.estoque}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-2 mt-2">
                                    <label className="text-verde-escuro font-semibold" htmlFor="preco">Preço</label>
                                    <input
                                        type="number"
                                        name="preco"
                                        placeholder="Preço do Produto"
                                        className="border-2 border-verde-escuro rounded-xl p-2 bg-transparent"
                                        value={produto.preco}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-2">
                                <label className="text-verde-escuro font-semibold" htmlFor="dataValidade">Data de Validade</label>
                                <input
                                    type="text"
                                    name="dataValidade"
                                    placeholder="Data de Validade do Produto"
                                    className="border-2 border-verde-escuro rounded-xl p-2 bg-transparent"
                                    value={produto.dataValidade}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2 mt-2">
                                <p className="text-verde-escuro font-semibold">Categoria do Produto</p>
                                <select
                                    name="categoria"
                                    id="categoria"
                                    className="border-2 border-verde-escuro rounded-xl p-2 bg-transparent"
                                    onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                                >
                                    <option value="" selected disabled>
                                        Selecione uma Categoria
                                    </option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nomeCategoria}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="rounded-xl text-white bg-verde hover:bg-verde-amarelado text-white w-9/12 py-2 mx-auto block mt-15 transition-colors duration-300 ease-in-out hover:delay-300 mt-4">
                                Editar
                            </button>
                        </div>

                        {/* Imagem do produto */}
                        <div className="border rounded-2xl border-verde-escuro border-2 p-6 items-start w-full md:w-9/12">
                            <div className="flex flex-col gap-2 mt-2">
                                <label className="text-verde-escuro font-semibold" htmlFor="fotoProduto">Imagem</label>
                                <img
                                    src={produto.fotoProduto ? produto.fotoProduto : "/assets/placeholder-produtos2.png"}
                                    alt="Imagem ilustrativa do produto vendido"
                                    className="w-42 h-52 mt-2 mb-2 object-cover rounded-xl"
                                />
                                <input
                                    type="text"
                                    name="fotoProduto"
                                    placeholder="Foto do Produto"
                                    className="border-2 border-verde-escuro rounded-xl p-2 bg-transparent"
                                    value={produto.fotoProduto}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    required
                                />
                            </div>
                        </div>

                    </form>

                    <div id="espaço-navbar" className="h-4"><h1></h1></div>
                    <div id="espaço-navbar" className="h-4"><h1></h1></div>

                </div>
            </div>

            {/* Footer */}
            <div>
                <img src="/assets/quadrado-verde.png" style={{ minWidth: "100%" }} />
                <div className="bg-verde min-h-[40px]"></div>
            </div>

        </>
    );

}

export default FormularioEditarProduto;
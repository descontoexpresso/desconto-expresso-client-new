import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { atualizar, buscar } from "../../../services/Service";
import Navbar from "../../Navbar/Navbar";

function FormularioEditarCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const categoriaId = parseInt(id ?? "");
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: number) {
        const eString = id.toString();
        await buscar(`/categorias/${eString}`, setCategoria, {
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        if (categoriaId !== undefined) {
            buscarPorId(categoriaId);
        }
    }, [categoriaId]);

    async function editarCategoria(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await atualizar(`/categorias`, categoria, setCategoria, {
                headers: {
                    Authorization: token,
                },
            });
            alert("Categoria atualizada com sucesso");
            retornar();
        } catch (error: any) {
            if (error.toString().includes("403")) {
                alert("O token expirou, favor logar novamente");
                handleLogout();
            } else {
                alert("Erro ao atualizar a Categoria");
            }
        }
    }

    function retornar() {
        navigate("/listaCategorias");
    }

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado");
            navigate("/login");
        }
    }, [token]);

    return (
        <>
            <div className="bg-laranja min-h-[130px]">
                {/* Navbar */}
                <div id="espaço-navbar" className="h-4"><h1></h1></div>
                <Navbar fotoUsuario={usuario.fotoUsuario} />
            </div>

            <img src="/assets/quadrado-laranja.png" style={{ minWidth: "100%" }} />

            {/* Área do formulário */}
            <div className="bg-fundo-form bg-cover bg-center bg-fixed" style={{ minWidth: '100%' }}>

                <div id="espaço-navbar" className="h-4"><h1></h1></div>
                <div id="espaço-navbar" className="h-4"><h1></h1></div>

                <p className="text-laranja uppercase font-bold text-center text-base md:text-lg">Editar Categoria</p>

                {/* Formulário */}
                <div className="flex flex-col sm:flex-row justify-center items-center">
                    <form className="w-full sm:w-1/2 flex flex-col gap-4 bg-white bg-opacity-0 rounded-lg p-8" onSubmit={editarCategoria}>
                        <div className="flex flex-col gap-2 border rounded-2xl border-verde-escuro border-2 p-6">

                            <label className=" text-verde-escuro font-semibold" htmlFor="nomeCategoria">Nome</label>
                            <input
                                type="text"
                                name="nomeCategoria"
                                placeholder="Nome"
                                className="border-2 border-verde-escuro rounded-xl p-2 bg-transparent"
                                value={categoria.nomeCategoria}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCategoria({ ...categoria, [e.target.name]: e.target.value })
                                }
                            />

                            <label className=" text-verde-escuro font-semibold" htmlFor="descricaoCategoria">Descrição</label>
                            <input
                                type="text"
                                name="descricaoCategoria"
                                placeholder="Descrição"
                                className="border-2 border-verde-escuro rounded-xl p-2 bg-transparent"
                                value={categoria.descricaoCategoria}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCategoria({ ...categoria, [e.target.name]: e.target.value })
                                }
                            />

                            <label className=" text-verde-escuro font-semibold" htmlFor="fotoCategoria">Imagem</label>
                            <input
                                type="text"
                                name="fotoCategoria"
                                placeholder="Link da Foto"
                                className="border-2 border-verde-escuro rounded-xl p-2 bg-transparent"
                                value={categoria.fotoCategoria}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCategoria({ ...categoria, [e.target.name]: e.target.value })
                                }
                            />

                            <button
                                className="rounded-xl text-white bg-laranja hover:bg-laranja-claro text-white w-9/12 py-2 mx-auto block mt-15 transition-colors duration-300 ease-in-out hover:delay-300 mt-4"
                                type="submit">
                                Editar
                            </button>
                        </div>
                    </form>
                </div>

                <div id="espaço-navbar" className="h-4"><h1></h1></div>
                <div id="espaço-navbar" className="h-4"><h1></h1></div>

            </div>

            {/* Footer */}
            <div>
                <img src="/assets/quadrado-laranja.png" style={{ minWidth: "100%" }} />
                <div className="bg-laranja min-h-[40px]"></div>
            </div>
        </>
    );

}

export default FormularioEditarCategoria;
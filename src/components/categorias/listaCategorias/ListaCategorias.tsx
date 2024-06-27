import { useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import CardCategorias2 from "../../categorias/cardCategoria/CardCategoria2";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { toastAlerta } from "../../../utils/toastAlerta";

function ListaCategorias() {
    {/* Funções de Categoria */ }
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info');
                handleLogout();
            }
        }
    }

    useEffect(() => {
        buscarCategorias();
    }, [categorias.length]);

    return (
        <div className="bg-cinza-claro bg-cover" style={{ minHeight: "100vh", minWidth: "100%" }}>
            <div className="bg-laranja min-h-[130px]">

                {/* Navbar */}
                <div id="espaço-navbar" className="h-4">
                    <h1></h1>
                </div>
                <Navbar fotoUsuario={usuario.fotoUsuario} />

            </div>

            <img src="/assets/quadrado-laranja.png" style={{ minWidth: "100%" }} />

            {/* Categorias */}
            <div>
                <p className="text-laranja uppercase font-bold text-center my-10 text-base md:text-lg">Categorias</p>

                <div className="flex justify-center w-full my-5 p-4">
                    <div className="container flex flex-col items-center">
                        {categorias.length === 0 && (
                            <DNA
                                visible={true}
                                height="200"
                                width="200"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper mx-auto"
                            />
                        )}
                        <div className="flex justify-center w-full">
                            <div className="container flex flex-col">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                                    {/* Card inicial - Acesso ADM */}
                                    <div className="flex justify-center w-full my-5 p-4">
                                        <div className="card card-compact bg-laranja rounded-b-none w-full md:w-96 md:h-102">
                                            <img src="https://imgur.com/56GUlw0.png" alt="" className="flex justify-center items-center text-white rounded-lg w-full h-96 object-cover rounded-b-none"/>
                                            <div className="card-body flex flex-col items-center justify-center space-y-2 md:space-y-4">
                                                <Link to="/cadastrarCategoria" className="btn bg-amarelo rounded-lg border-none w-full md:w-66 text-laranja p-4 hover:bg-amarelo-claro">
                                                    Cadastrar Categoria
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* FIM Card inicial */}

                                    {categorias.map((categoria) => (
                                        <>
                                            <CardCategorias2 key={categoria.id} categoria={categoria} />
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <div className="mt-8">
                <img src="/assets/quadrado-laranja.png" style={{ minWidth: "100%" }} />
                <div className="bg-laranja min-h-[40px]"></div>
            </div>

        </div>

    );
}

export default ListaCategorias;

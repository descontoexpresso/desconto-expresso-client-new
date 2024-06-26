import { useContext, useEffect, useState } from "react";
import { DNA } from 'react-loader-spinner';
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Categoria from './../../../models/Categoria'; 
import Navbar from "../../Navbar/Navbar";
import Produto from "../../../models/Produto";
import CardProduto from "../cardProduto/CardProduto";
import CardCategorias from "../../categorias/cardCategoria/CardCategoria";
import "./ListaProdutos.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toastAlerta } from "../../../utils/toastAlerta";

function ListaProdutos() {
    {/* Funções de Produto */ }
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token]);

    async function buscarProdutos() {
        try {
            await buscar('/produtos', setProdutos, {
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
        buscarProdutos();
    }, []);

    // Função para remover acentos
    const removeAcentos = (text: string) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = removeAcentos(params.get('search')?.toLowerCase() || '');

        if (searchQuery) {
            setFilteredProdutos(
                produtos.filter((produto) =>
                    removeAcentos(produto.nomeProduto.toLowerCase()).includes(searchQuery)
                )
            );
        } else {
            setFilteredProdutos(produtos);
        }
    }, [location.search, produtos]);

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info');
            navigate('/login');
        }
    }, [token]);

    {/* Funções de Categoria */ }
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
    }, []);

    {/* Funções do Carrossel de Categoria */ }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 3000,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 3000,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 3000,
                },
            },
        ],
    };

    return (
        <div className="bg-cinza-claro bg-cover" style={{ minHeight: "100vh", minWidth: "100%" }}>
            <div className="bg-amarelo-escuro min-h-[200px]">

                {/* Navbar */}
                <div id="espaço-navbar" className="h-4">
                    <h1></h1>
                </div>
                <Navbar fotoUsuario={usuario.fotoUsuario} />

                <p className="text-cinza-claro font-bold text-center g-4 mt-14 text-base md:text-lg">Procure por Categoria</p>

                {/* Categorias */}
                <div>
                    <div className="flex justify-center w-full my-5 p-4">
                        <div className="container flex flex-col items-center">
                            {categorias.length === 0 ? (
                                <DNA
                                    visible={true}
                                    height="200"
                                    width="200"
                                    ariaLabel="dna-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="dna-wrapper mx-auto"
                                />
                            ) : (
                                <Slider {...settings} className="w-full">
                                    {categorias.map((categoria) => (
                                        <CardCategorias key={categoria.id} categoria={categoria} />
                                    ))}
                                </Slider>
                            )}
                        </div>
                    </div>
                </div>

                <div id="espaço-navbar" className="h-4">
                    <h1></h1>
                </div>
            </div>

            <img src="/assets/quadrado-amarelo.png" style={{ minWidth: "100%" }} />

            {/* Produtos */}
            <div>
                <p className="text-amarelo-escuro uppercase font-bold text-center my-10 text-base md:text-lg">Produtos</p>
                <div className="flex justify-center w-full p-4">
                    <div className="container flex flex-col items-center">
                        {produtos.length === 0 && (
                            <DNA
                                visible={true}
                                height="200"
                                width="200"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper mx-auto"
                            />
                        )}

                        <div className='container flex flex-col items-center mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>

                            {/* Card inicial - Acesso ADM */}
                            <div className="flex justify-center w-full p-4 space-x-4 items-center pt-20 sm:pt-10 md:pt-16 lg:pt-20">
                                <div className="card border rounded-lg border-verde-escuro w-full items-center sm:w-72 md:w-64 lg:w-72 h-auto sm:h-96 md:h-96 lg:h-96 shadow-xl p-1 sm:p-2 md:p-4 lg:p-1">
                                    <div className="card-body">
                                        <img src="https://imgur.com/hYM9sNG.png" alt="" className="flex justify-center items-center object-cover h-60 text-white rounded-lg mb-5 w-52"/>
                                        <div className="card-actions justify-center">
                                            <Link to="/cadastrarProduto" className="btn bg-laranja rounded-lg w-52 text-amarelo p-4 hover:bg-laranja-claro hover:text-white">
                                                Cadastrar Produto
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* FIM Card inicial */}

                            {filteredProdutos.map((produto) => (
                                <CardProduto key={produto.id} produto={produto} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-16">
                <img src="/assets/quadrado-amarelo.png" style={{ minWidth: "100%" }} />
                <div className="bg-amarelo-escuro min-h-[40px]"></div>
            </div>

        </div>
    );
}

export default ListaProdutos;

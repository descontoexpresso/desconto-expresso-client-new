import { DNA } from "react-loader-spinner";
import Destaques from "../../components/homeComponents/Destaques";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardCategorias from "../../components/categorias/cardCategoria/CardCategoria";
import Categoria from "../../models/Categoria";
import { useEffect, useContext, useState } from "react";
import { buscar } from "../../services/Service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { toastAlerta } from "../../utils/toastAlerta";


const Home: React.FC = () => {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  {/* Funções de Categoria */ }
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        toastAlerta("O token expirou, favor logar novamente", 'info');
        handleLogout();
      }
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  {/* Funções do Carrossel1 */ }
  const [sliderKey, setSliderKey] = useState(0);

  // No useEffect que controla o sliderKey
  useEffect(() => {
    setSliderKey(prevKey => prevKey + 1);
  }, [navigate, categorias.length]); // Adicionando categorias.length como dependência

  useEffect(() => {
    // Verifica se o usuário voltou para a página inicial
    if (window.location.pathname === '/home') {
      // Atualiza o componente Slider aqui
    }
  }, [window.location.pathname]);

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000
  }

  {/* Funções do Carrossel de Categoria */ }
  const settings2 = {
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

      {/* Header com Carrossel */}
      <div className="bg-verde min-h-[20px]">

        {/* Navbar */}
        <div id="espaço-navbar" className="h-4"><h1></h1></div>
        <Navbar fotoUsuario={usuario.fotoUsuario} />

        {/* Carrossel */}
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center max-w-[90%] h-5/6 bg-cinza-claro rounded-lg mt-14">
            <Slider key={sliderKey} {...settings1} className="w-full h-full p-4 rounded-lg">
              <div>
                <img src="https://imgur.com/5vejGdx.jpg" alt="Imagem 1" className="rounded-lg md:h-96 w-full h-full object-cover" style={{ minWidth: "100%", minHeight: "100%" }} />
              </div>
              <div>
                <img src="https://imgur.com/yNFbyd7.jpg" alt="Imagem 2" className="rounded-lg md:h-96 w-full h-full object-cover" style={{ minWidth: "100%", minHeight: "100%" }} />
              </div>
              <div>
                <img src="https://imgur.com/S2sXwg8.jpg" alt="Imagem 2" className="rounded-lg md:h-96 w-full h-full object-cover" style={{ minWidth: "100%", minHeight: "100%" }} />
              </div>
            </Slider>
          </div>
        </div>

        <div id="espaço-navbar" className="h-4"><h1></h1></div>
        <div id="espaço-navbar" className="h-4"><h1></h1></div>
        <div id="espaço-navbar" className="h-4"><h1></h1></div>
      </div>

      {/* Linha */}
      <img src="/assets/quadrado-verde.png" style={{ minWidth: "100%" }} />

      {/* Destaques */}
      <div className="destaques text-white lg:pl-5 p-6">
        <Destaques />
      </div>

      <img src="/assets/quadrado-verde.png" style={{ minWidth: "100%" }} />

      {/* Carrossel Categorias */}
      <h1 className="text-verde flex justify-center pt-9 font-semibold text-2xl">
        CATEGORIAS
      </h1>

      <div className="flex justify-center w-full p-4 pb-9">
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
            <Slider {...settings2} className="w-full">
              {categorias.map((categoria) => (
                <CardCategorias key={categoria.id} categoria={categoria} />
              ))}
            </Slider>
          )}
        </div>
      </div>

      {/* Footer */}
      <div>
        <img src="/assets/quadrado-verde.png" style={{ minWidth: "100%" }} />
        <div className="bg-verde min-h-[40px]"></div>
      </div>

    </div>
  );
};

export default Home;

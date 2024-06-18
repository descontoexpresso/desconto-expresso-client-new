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
import Home1 from "../../../public/assets/feira-organica1.jpg"
import Home2 from "../../../public/assets/feira.jpg"
import Navbar from "../../components/Navbar/Navbar";


const Home: React.FC = () => {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  {
    /* Funções de Categoria */
  }
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        alert("O token expirou, favor logar novamente");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  {
    /* Funções do Carrossel1 */
  }

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

  {
    /* Funções do Carrossel de Categoria */
  }
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };


  return (
    <>
      <div className="body overflow-x-hidden">
        {/* Navbar */}
        <div className="bg-verde">
          <div id="espaço-navbar" className="h-4">
            <h1></h1>
          </div>
          <Navbar fotoUsuario={usuario.fotoUsuario} />
        </div>
        <div className="header bg-verde text-white h-2/3 flex justify-center items-center gap-12 pt-32 pb-20">
          <div className="flex justify-center items-center max-w-[90%] h-5/6 bg-white rounded-lg">
            <Slider {...settings1} className="w-full h-full p-4 rounded-lg">
              <div>
                <img src={Home1} alt="" className="rounded-lg md:h-96 w-full h-full object-cover" style={{ minWidth: "100%", minHeight: "100% " }} />
              </div>
              <div>
                <img src={Home2} alt="" className="rounded-lg md:h-96 w-full h-full object-cover" style={{ minWidth: "100%", minHeight: "100% " }} />
              </div>
            </Slider>
          </div>
        </div>
        {/* Linha */}
        <img src="/assets/quadrado-verde.png" style={{ minWidth: "100%" }} />
        <div className="destaques bg-white text-white lg:pl-5">
          <Destaques />
        </div>
        <img src="/assets/quadrado-verde.png" style={{ minWidth: "100%" }} />
        <div className="categorias bg-white w-full">
          <h1 className="text-verde bg-white flex justify-center pt-9 font-semibold text-4xl">
            CATEGORIAS
          </h1>
          {/* Categorias */}

          <div className="flex bg-white justify-center w-full p-4 pb-9">
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
        </div>
        <img src="/assets/quadrado-verde.png" style={{ minWidth: "100%" }} />
      </div>
    </>
  );
};

export default Home;

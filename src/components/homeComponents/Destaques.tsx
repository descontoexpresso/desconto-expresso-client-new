import { useNavigate } from "react-router-dom";
import sideDown from "../../../public/assets/sideDown.png";
import sideTop from "../../../public/assets/sideTop.png";
import "./Destaques.css";

function Destaques() {
  const navigate = useNavigate();

  const goToSobreNos = () => {
    navigate("/sobreNos");
  };

  return (
    <>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[90%] mx-auto">

        {/* Card principal */}
        <div className="relative bg-destaque-esquerda bg-cover rounded-lg flex items-center justify-center" style={{ minWidth: "200px", minHeight: "400px" }}>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
            <h1 className="text-white text-3xl sm:text-4xl font-bold mt-6 text-center">DESCONTO EXPRESSO</h1>
            <p className="text-white text-base sm:text-lg lg:text-xl my-6 text-center max-w-[80%] mx-auto">Promovendo a sustentabilidade e democratização do acesso a uma boa alimentação</p>
            <button
              className="bg-transparent btn my-4 sm:my-6 p-2 sm:p-4 px-4 sm:px-5 text-white border-white hover:bg-laranja hover:border-none"
              onClick={goToSobreNos}
            >
              Saiba mais
            </button>
          </div>
        </div>

        {/* Cards laterais */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-azul-escuro text-white p-4 rounded-lg flex flex-col md:flex-row items-center justify-center overflow-hidden w-full">
            <p className="text-center text-sm sm:text-base lg:text-xl p-4">Descontos que nutrem, economizam e transformam</p>
            <img src={sideTop} alt="" className="w-32 sm:w-48 md:w-64 max-h-24 sm:max-h-24 md:max-h-32 object-contain"/>
          </div>

          <div className="bg-amarelo-escuro text-white p-4 rounded-lg flex flex-col md:flex-row items-center justify-center overflow-hidden w-full">
            <img src={sideDown} alt="" className="w-32 sm:w-48 md:w-64 max-h-24 sm:max-h-24 md:max-h-32 object-contain"/>
            <p className="text-center text-sm sm:text-base lg:text-xl p-4">A qualidade que você merece a um preço que você pode pagar</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Destaques;

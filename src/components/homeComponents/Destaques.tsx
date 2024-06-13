import { useNavigate } from "react-router-dom";
import sideTop from "../../../../public/assets/sideTop.png";
import sideDown from "../../../../public/assets/sideDown.png";
import destaqueEsquerda from "../../../../public/assets/destaque-esquerda.png"
import "./Destaques.css";

function Destaques() {
  const navigate = useNavigate();

  const goToSobreNos = () => {
    navigate("/sobreNos");
  };

  return (
    <>
      <div className="main flex flex-col sm:flex-row gap-8 items-center justify-center">
        <div className="square destaque-esquerda relative flex justify-center items-center flex-col pt-16 pb-16">
          <img src={destaqueEsquerda} alt="destaque esquerda" width="600px" height="600px" />
          <h1 className="font-semibold lg:text-5xl whitespace-nowrap absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/8 text-center">
            DESCONTO EXPRESSO
          </h1>
          <span className="main-imagem lg:text-2xl font-semibold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/8">
            Fazendo limonada com os limões que a vida dá.
          </span>
          <button
            className="bg-transparent btn p-4 px-5 mt-1 mb-28 absolute bottom-0 mx-auto text-white border-white hover:bg-laranja hover:border-none"
            onClick={goToSobreNos}
          >
            Saiba mais
          </button>
        </div>
        <div className="flex flex-col gap-8">
          <div
            id="top"
            className="side bg-azul-escuro rounded-xl flex justify-center items-center overflow-hidden w-full"
          >
            <span className="lg:text-xl pl-5 font-semibold text-center">
              Evitando o desperdício de alimentos e alimentando vidas.
            </span>
            <img src={sideTop} alt="" width="200px" height="200px"/>
          </div>
          <div className="side bg-amarelo-escuro rounded-xl flex justify-center items-center overflow-hidden w-full pr-10">
            <img src={sideDown} alt="" width="150px" height="50px"/>
            <span className="lg:text-xl -mr-6 font-semibold text-center">
              Porque uma boa alimentação é um direito de todos.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Destaques;

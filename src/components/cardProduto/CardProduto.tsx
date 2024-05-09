/* eslint-disable @typescript-eslint/no-unused-vars */
//import { Link } from "react-router-dom";
import Produto from "../../models/Produto";
import placeholderImage from "../../assets/placeholder-image.jpg";

interface CardProdutoProps {
  produto: Produto;
}

const CardProduto: React.FC<CardProdutoProps> = ({ produto }) => {
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = placeholderImage;
  };

  const formatarData = (data: string) => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate();
    const mes = dataObj.toLocaleString("default", { month: "long" });
    return `${dia} de ${mes}`;
  };

  return (
    <div className="pt-20 sm:pt-10 md:pt-16 lg:pt-20">
      <div className="card border rounded-lg border-verde-escuro w-full sm:w-72 md:w-64 lg:w-72 h-auto sm:h-96 md:h-96 lg:h-96 shadow-xl p-1 sm:p-2 md:p-4 lg:p-1">
        <div className="card-body">
          <div className="-mt-24">
            <img
              src={produto.fotoProduto}
              alt={produto.nomeProduto}
              onError={handleImageError}
              className="sm:w-full sm:h-auto md:w-full md:h-auto lg:w-full lg:h-auto"
            />
          </div>
          <div className="card-actions justify-around">
            <button className="btn bg-laranja rounded-lg mb-2 mt-2 sm:mt-1 ml-0 sm:ml-3.5 text-white p-4 sm:p-2 md:p-4 lg:p-2 w-full sm:w-auto md:w-32 lg:w-32">
              Comprar
            </button>
          </div>
          <p className="mb-1.5 mt-1.5">
            <span>R$</span> {produto.preco}
          </p>
          <h2 className="card-title uppercase">{produto.nomeProduto}</h2>
          <p>
            <span className="font-semibold text-xs">Data de Validade:</span>{" "}
            <span className="text-xs">
              {formatarData(produto.dataValidade)}
            </span>
          </p>
          <div className="card-actions justify-around">
            <button className="btn bg-verde rounded-r-none mr-0 sm:mr-3.5 md:mr-0 lg:mr-0 w-full sm:w-auto md:w-24 lg:w-24 text-white">
              Editar
            </button>
            <button className="btn bg-vermelho rounded-l-none ml-0 sm:ml-3.5 md:ml-0 lg:ml-0 w-full sm:w-auto md:w-24 lg:w-24 text-white">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduto;

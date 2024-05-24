/* eslint-disable @typescript-eslint/no-unused-vars */
//import { Link } from "react-router-dom";
import Produto from "../../../models/Produto";
import placeholderImage from "../../../../public/assets/placeholder-image.jpg";

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
    <div className="flex justify-center w-full p-4 space-x-4 items-center pt-20 sm:pt-10 md:pt-16 lg:pt-20">
      <div className="card border rounded-lg border-verde-escuro w-full items-center sm:w-72 md:w-64 lg:w-72 h-auto sm:h-96 md:h-96 lg:h-96 shadow-xl p-1 sm:p-2 md:p-4 lg:p-1">
        <div className="card-body">
          <div className="flex items-center justify-center -mt-24">
            <img
              src={produto.fotoProduto}
              alt={produto.nomeProduto}
              onError={handleImageError}
              className="w-42 h-52 object-cover"
            />
          </div>

          <div className="card-actions justify-center">
            <button className="btn bg-laranja rounded-lg w-52 text-amarelo p-4 hover:bg-laranja-claro hover:text-white">
              Adicionar ao Carrinho
            </button>
          </div>
          <p className="mb-1.5 mt-1.5 text-verde-escuro">
            <span>R$</span> {produto.preco}
          </p>
          <p>
            <h5 className="card-title uppercase text-verde-escuro w-52 truncate text-sm sm:text-base md:text-lg lg:text-base">
              {produto.nomeProduto}
            </h5>
            <div className="truncate">
              <span className="font-semibold text-xs text-verde-escuro">Data de Validade:</span>{" "}
              <span className="text-xs text-verde-escuro">
                {formatarData(produto.dataValidade)}
              </span>
            </div>
          </p>
          <div className="card-actions justify-center">
            <button className="btn bg-verde rounded-r-none mr-0 sm:mr-3.5 md:mr-0 lg:mr-0 w-full sm:w-auto md:w-24 lg:w-24 text-white hover:bg-verde-amarelado">
              Editar
            </button>
            <button className="btn bg-vermelho rounded-l-none ml-0 sm:ml-3.5 md:ml-0 lg:ml-0 w-full sm:w-auto md:w-24 lg:w-24 text-white hover:bg-vermelho-claro">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduto;
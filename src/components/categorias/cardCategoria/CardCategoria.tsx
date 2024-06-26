import Categoria from '../../../models/Categoria';

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategorias({ categoria }: CardCategoriaProps) {

  return (
    <div className="flex justify-center w-full p-4 items-center">
      <div className="card card-compact bg-laranja rounded-b-none max-w-xs w-full md:max-w-md">
        <figure className="w-full h-52">
          <img
            src={categoria.fotoCategoria}
            alt={categoria.descricaoCategoria}
            className="w-full h-full object-cover rounded-b-2xl"
          />
        </figure>
        <div className="card-body flex flex-col items-center justify-center space-y-2 md:space-y-4">
          <p className="card-title text-cinza-claro text-center truncate text-base md:text-lg">
            {categoria.nomeCategoria}
          </p>
        </div>
      </div>
    </div>
  );
  
}

export default CardCategorias;

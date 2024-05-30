import Categoria from '../../../models/Categoria'

interface CardCategoriaProps {
    categoria: Categoria
}

function CardCategorias2({ categoria }: CardCategoriaProps) {

    return (

        <div className="flex justify-center w-full p-4 space-x-4 items-center">
            <div className="card card-compact bg-cinza-claro border border-laranja rounded-b-none md:w-96 md:h-102">
                {/* Foto Categoria */}
                <figure className='bg-laranja'><img src={categoria.fotoCategoria} alt={categoria.descricaoCategoria} className="w-full h-52 object-cover" /></figure>

                {/* Nome Categoria */}
                <div className="card-body flex flex-col items-center justify-center space-y-2 md:space-y-4 bg-laranja min-h-[20px]">
                    <p className="card-title text-cinza-claro text-center truncate text-base md:text-lg">{categoria.nomeCategoria}</p>
                </div>

                {/* Descrição Categoria */}
                <div className="card-body flex flex-col items-center justify-center m-3 h-24 space-y-2 md:space-y-4">
                    <p className="text-laranja text-center text-sm">{categoria.descricaoCategoria}</p>
                </div>

                {/* Botões */}
                <div className="card-actions justify-center m-3">
                    <button className="btn bg-verde rounded-r-none mr-0 sm:mr-3.5 md:mr-0 lg:mr-0 w-full sm:w-auto md:w-40 lg:w-40 text-white hover:bg-verde-amarelado">
                        Editar
                    </button>
                    <button className="btn bg-vermelho rounded-l-none ml-0 sm:ml-3.5 md:ml-0 lg:ml-0 w-full sm:w-auto md:w-40 lg:w-40 text-white hover:bg-vermelho-claro">
                        Excluir
                    </button>
                </div>

            </div>
        </div>

    );
};

export default CardCategorias2;
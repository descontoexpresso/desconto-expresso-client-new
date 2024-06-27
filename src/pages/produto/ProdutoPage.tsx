import { useContext, useEffect, useState } from "react";
import { buscar, buscarPorId } from "../../services/Service";
import type Produto from "../../models/Produto";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";

import CardProduto from "../../components/produtos/cardProduto/CardProduto";
import Navbar from "../../components/Navbar/Navbar";

export default function ProdutoPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null as Produto | null);
  const [, setLoading] = useState(true);
  const [value, setValue] = useState(1);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        if (id) {
          await buscarPorId("/produtos", id, setProduto, {
            headers: {
              Authorization: token,
            },
          });
        } else {
          console.error("ID do produto não fornecido.");
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    const fetchProdutosAleatorios = async () => {
      try {
        await buscar("/produtos", setProdutos, {
          headers: { Authorization: token },
        });
      } catch (error: any) {
        if (error.toString().includes("403")) {
          alert("O token expirou, favor logar novamente");
          handleLogout();
        }
      }
    };

    fetchProduto();
    fetchProdutosAleatorios();
  }, [id, token, handleLogout]);

  if (!produto) return <div>Produto não encontrado.</div>;

  const handleVoltar = () => {
    history.back();
  };

  const handleIncrement = () => {
    setValue(value + 1); // Função para incrementar o valor
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1); // Função para decrementar o valor, evitando valores negativos
    }
  };

  // Seleciona 3 produtos aleatórios do array de produtos
  const produtosAleatorios = produtos
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return (
    <div className="bg-produto-text-color bg-amarelo-escuro">
      <div className="p-4">
        <Navbar fotoUsuario={usuario.fotoUsuario} />
      </div>
      <div className="bg-amarelo-escuro text-cinza-claro flex justify-center">
        <div className="flex flex-col lg:flex-row w-8/12 items-center p-4 lg:p-20 gap-5">
          {produto && produto.fotoProduto && (
            <img
              className="w-5/6 lg:w-1/3 h-auto bg-white rounded-3xl"
              src={produto.fotoProduto}
              alt={produto.nomeProduto}
            />
          )}
          <div className="flex flex-col w-full lg:w-2/3">
            <h1 className="text-2xl lg:text-3xl font-semibold uppercase">
              {produto.nomeProduto}
            </h1>
            <p className="text-base lg:text-lg mt-2">
              {produto.descricaoProduto}
            </p>
            <p className="text-base lg:text-lg mt-2">
              <span className="font-semibold">Preço:</span> R$
              {produto.preco.toFixed(2)}
            </p>
            <p className="text-base lg:text-lg mt-2">
              <span className="font-semibold">Data de Validade:</span>{" "}
              {produto.dataValidade}
            </p>
            <p className="text-base lg:text-lg mt-2">
              <span className="font-semibold">Categoria:</span>{" "}
              {produto.categoria?.nomeCategoria || "Não especificada"}
            </p>
            <div className="flex flex-wrap gap-4 text-laranja">
              <div className="flex items-center border border-laranja rounded-lg w-fit p-2 mt-4">
                <button
                  className="px-3 flex justify-center rounded-md"
                  onClick={handleDecrement}
                >
                  -
                </button>

                <input
                  type="number"
                  value={value}
                  onChange={(event) => setValue(parseInt(event.target.value))}
                  className="w-8 bg-amarelo-escuro rounded-md text-center"
                />

                <button
                  className="px-2 py-1 rounded-md"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              <button className="btn bg-laranja rounded-lg text-produto-text-color mt-4 p-2 border-none">
                Adicionar ao Carrinho
              </button>
            </div>
            <div className="w-36 pt-3 flex justify-end">
              <button
                className="btn-buy text p-2 rounded-lg text-laranja"
                onClick={handleVoltar}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full h-12 bg-repeat"
        style={{
          backgroundImage: `url(https://i.imgur.com/nJDKPa4.png)`,
          backgroundSize: "auto",
        }}
      />

      <div className="bg-cinza-claro py-20">
        <h2 className="text-4xl pb-20 font-semibold text-center mt-10 text-laranja-claro">
          Você pode se interessar
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {produtosAleatorios.map((produtoAleatorio) => (
            <CardProduto key={produtoAleatorio.id} produto={produtoAleatorio} />
          ))}
        </div>
      </div>
      <div
        className="w-full h-12 bg-repeat bg-cover"
        style={{
          backgroundImage: `url(https://i.imgur.com/nJDKPa4.png)`,
          backgroundSize: "auto",
        }}
      />
      <div className="h-10 bg-amarelo-escuro"></div>
    </div>
  );
}

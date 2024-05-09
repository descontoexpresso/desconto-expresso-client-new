//import React from 'react';
import './App.css';
import CardProduto from './components/cardProduto/CardProduto';
import sabonete from "../src/assets/sabonete.png"

function App() {

  const produtoTeste = {
    id: 0,
    nomeProduto: "sabonete",
    descricaoProduto: "lavar o corpinho",
    estoque: 13,
    preco: 13,
    dataValidade: "2025-12-12",
    fotoProduto: sabonete,
    usuario: null,
    categoria: null
  }
  return (
    <div className="flex justify-around">
    <CardProduto produto={produtoTeste} />
    </div>
)
}
export default App;
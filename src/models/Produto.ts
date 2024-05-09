import Categoria from './Categoria';
import Usuario from './Usuario';

export default interface Produto {
  id: number;
  nomeProduto: string;
  descricaoProduto: string;
  estoque: number;
  preco: number;
  dataValidade: string;
  fotoProduto: string;
  categoria: Categoria | null;
  usuario: Usuario | null;
}
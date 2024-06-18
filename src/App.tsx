//import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import ListaProdutos from "./components/produtos/listaProduto/ListaProdutos";
import Footer from "./components/footer/Footer";
import ListaCategorias from "./components/categorias/listaCategorias/ListaCategorias";
import Cadastro from "./pages/cadastro/Cadastro";
import Perfil from "./pages/perfil/Perfil";
import EditarPerfil from "./pages/perfil/EditarPerfil";
import FormularioCadastrarProduto from "./components/produtos/formularioProduto/FormularioCadastrarProduto";
import FormularioEditarProduto from "./components/produtos/formularioProduto/FormularioEditarProduto";
import DeletarProduto from "./components/produtos/deletarProduto/DeletarProduto";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/editar-perfil" element={<EditarPerfil/>} />
            <Route path="/listaProdutos" element={<ListaProdutos />} />
            <Route path="/listaCategorias" element={<ListaCategorias />} />
            <Route path="/cadastrarProduto" element={<FormularioCadastrarProduto />} />
            <Route path="/editarProduto/:id" element={<FormularioEditarProduto />} />
            <Route path="/deletarProduto/:id" element={<DeletarProduto />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
export default App;

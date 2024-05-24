//import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import ListaProdutos from "./components/produtos/listaProduto/ListaProdutos";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/listaProdutos" element={<ListaProdutos />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
export default App;

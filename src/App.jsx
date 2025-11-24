import React from "react";
import { Routes, Route } from "react-router-dom";

import CategoriaPage from "./pages/CategoriaPage.jsx";
import ProdutosPage from "./pages/ProdutosPage";
import NovoProdutoPage from "./pages/NovoProdutoPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<CategoriaPage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/produtos/novo" element={<NovoProdutoPage />} />
        </Routes>
    );
}

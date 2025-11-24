import React, { useState } from "https://esm.sh/react";
import { criarProduto } from "../services/api.js";

export default function FormNovoProduto({ onCriado }) {
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setErro(null);

            await criarProduto({
                nome,
                valor: Number(valor),
                categoriaId: Number(categoriaId),
            });

            setNome("");
            setValor("");
            setCategoriaId("");

            onCriado && onCriado();
        } catch (ex) {
            setErro(ex.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} style={{ marginTop: 16 }}>
            <input
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <input
                placeholder="Valor"
                value={valor}
                type="number"
                step="0.01"
                onChange={(e) => setValor(e.target.value)}
            />

            <input
                placeholder="Categoria ID"
                value={categoriaId}
                type="number"
                onChange={(e) => setCategoriaId(e.target.value)}
            />

            <button type="submit" disabled={loading}>
                Criar
            </button>

            {erro && <p style={{ color: "crimson" }}>{erro}</p>}
        </form>
    );
}

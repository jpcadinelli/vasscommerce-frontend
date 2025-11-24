import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NovoProdutoPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        fotoUrl: "",
        valorUnitario: "",
        idCategoria: ""
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            nome: form.nome,
            descricao: form.descricao,
            fotoUrl: form.fotoUrl,
            valorUnitario: Number(form.valorUnitario),
            idCategoria: Number(form.idCategoria)
        };

        fetch("http://localhost:8080/produto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error("Erro ao salvar o produto");
                return res.json();
            })
            .then(() => {
                alert("Produto criado com sucesso!");
                navigate("/produtos");
            })
            .catch(err => alert("Erro: " + err.message));
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Novo Produto</h1>

            <button onClick={() => navigate("/produtos")}>
                Voltar para Lista de Produtos
            </button>

            <form onSubmit={handleSubmit} style={{ marginTop: 20, maxWidth: 400 }}>

                <div>
                    <label>Nome:</label>
                    <input
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Descrição:</label>
                    <input
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Foto URL:</label>
                    <input
                        name="fotoUrl"
                        value={form.fotoUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Valor Unitário:</label>
                    <input
                        name="valorUnitario"
                        type="number"
                        step="0.01"
                        value={form.valorUnitario}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>ID Categoria:</label>
                    <input
                        name="idCategoria"
                        type="number"
                        value={form.idCategoria}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" style={{ marginTop: 15 }}>
                    Salvar Produto
                </button>

            </form>
        </div>
    );
}

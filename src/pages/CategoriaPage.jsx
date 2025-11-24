import React, { useEffect, useState } from "react";

export default function CategoriasPage() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function carregarCategorias() {
            try {
                const resp = await fetch("http://localhost:8080/categoria");

                if (!resp.ok) {
                    throw new Error("Erro ao buscar categorias");
                }

                const data = await resp.json();
                setCategorias(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        carregarCategorias();
    }, []);

    if (loading) return <p>Carregando categorias...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Lista de Categorias</h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                marginTop: "20px"
            }}>
                {categorias.map(cat => (
                    <div
                        key={cat.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}
                    >
                        <img
                            src={cat.imagemSimboloUrl}
                            alt={cat.nome}
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                        <h3>{cat.nome}</h3>
                        <p>{cat.descricao}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

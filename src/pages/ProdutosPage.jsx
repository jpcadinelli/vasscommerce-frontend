import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProdutosPage() {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/produto")
            .then((res) => res.json())
            .then((data) => setProdutos(data))
            .catch(() => alert("Erro ao carregar produtos"));
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Lista de Produtos</h1>

            <button onClick={() => navigate("/")}>Voltar para Categorias</button>

            <ul style={{ marginTop: 20 }}>
                {produtos.map((p) => (
                    <li key={p.id} style={{ marginBottom: 15 }}>
                        <strong>{p.nome}</strong>
                        <div>{p.descricao}</div>
                        <div>Preço: R$ {p.valorUnitario}</div>
                        <div>Categoria ID: {p.idCategoria}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

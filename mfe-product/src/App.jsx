import React from "react";
import ProductCard from "./ProductCard";
import products from "../../shared/product"; 

export default function App() {
  return (
    <div style={{ padding: "10px" }}> {/* Wrapper pour le titre et la grille */}
      
      {/* Titre de confirmation visuelle */}
      <h1 style={{ color: "#416788", textAlign: "center", marginBottom: "30px" }}>
        Produits Retro - MFE Product (Port 3001)
      </h1>

      {/* Grille de produits */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px"
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
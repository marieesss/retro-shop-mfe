import React from "react";
import { emit } from "../../shared/event";

export default function ProductCard({ product }) {
  
  const handleAddToCart = () => {
    // Le contrat exact exigé par la Phase 1
    const payload = {
      id: String(product.id),
      title: product.title,
      price: Number(product.price),
      image: product.image,
      platform: product.platform
    };

    emit("cart:add", payload);
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      backgroundColor: "#fff",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <div>
        {product.image && (
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} 
          />
        )}
        <h3 style={{ margin: "10px 0", color: "#416788" }}>{product.title}</h3>
        <p style={{ color: "#666", fontSize: "14px" }}>{product.platform}</p>
        <p style={{ fontWeight: "bold", fontSize: "18px", margin: "10px 0" }}>{product.price} €</p>
      </div>
      
      <button onClick={handleAddToCart}>
        Ajouter au panier
      </button>
    </div>
  );
}
import React, { lazy, Suspense, useEffect, useState } from "react";
import { on } from "../../shared/event";
const ProductApp = lazy(() => import("mfe_product/ProductApp"));
const CartApp = lazy(() => import("mfe_cart/CartApp"));
const RecoApp = lazy(() => import("mfe_reco/RecoApp"));

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = on("cart:updated", (payload) => {
      setCount(payload?.count ?? 0);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "12px",
          border: "1px solid #ccc",
        }}
      >
        <h1>RetroShop</h1>
        <div>Panier : {count}</div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        <section style={{ border: "1px solid #ccc", padding: "12px" }}>
          <Suspense fallback={<div>Chargement des produits...</div>}>
            <ProductApp />
          </Suspense>
        </section>

        <aside style={{ border: "1px solid #ccc", padding: "12px" }}>
          <Suspense fallback={<div>Chargement du panier...</div>}>
            <CartApp />
          </Suspense>
        </aside>
      </div>

      <section style={{ marginTop: "20px", border: "1px solid #ccc", padding: "12px" }}>
        <Suspense fallback={<div>Chargement des recommandations...</div>}>
          <RecoApp />
        </Suspense>
      </section>
    </div>
  );
}
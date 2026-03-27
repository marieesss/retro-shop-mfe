import React, { useState, useEffect } from 'react';
import products from '../../shared/product';
import { emit, on } from '../../shared/event';
const Reco = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Le contrat indique que cart:updated envoie { items: [...], count, total }
    const handleCartUpdate = (payload) => {
      const cartItems = payload.items || [];
      
      if (cartItems.length === 0) {
        // Panier vide = recos par défaut (ex: les 3 premiers produits)
        setRecommendations(products.slice(0, 3));
        return;
      }

      // Prendre la plateforme du dernier article du panier
      const lastItem = cartItems[cartItems.length - 1];
      const cartIds = cartItems.map(item => item.id);
      
      // Trouver des produits de la même plateforme, qui ne sont pas déjà dans le panier
      const newRecos = products.filter(
        p => p.platform === lastItem.platform && !cartIds.includes(p.id)
      );

      setRecommendations(newRecos.slice(0, 3));
    };

    // Abonnement à l'événement
    on('cart:updated', handleCartUpdate);

    // Initialisation (panier vide par défaut au chargement)
    setRecommendations(products.slice(0, 3));

    // Cleanup: On retire l'écouteur quand le composant est démonté
    return () => {
      emit('cart:updated', handleCartUpdate);
    };
  }, []);

  return (
    <div className="reco-zone">
      {/* Insère ici le JSX qui était déjà préparé */}
      <h3>Les joueurs achètent aussi :</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        {recommendations.map(item => (
          <div key={item.id} style={{ border: '1px solid gray', padding: '10px' }}>
            <h4>{item.title}</h4> {/* Le contrat dit "title", pas "name" */}
            <p>{item.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reco;
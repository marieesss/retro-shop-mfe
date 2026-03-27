import React, { useEffect, useMemo, useState } from 'react';
import { emit, on } from '../../shared/event';

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = on('cart:add', (product) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);

        let nextItems;

        if (existingItem) {
          nextItems = prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          nextItems = [...prevItems, { ...product, quantity: 1 }];
        }

        const count = nextItems.reduce((sum, item) => sum + item.quantity, 0);
        const total = nextItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        emit('cart:updated', {
          items: nextItems,
          count,
          total,
        });

        return nextItems;
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const handleClearCart = () => {
    setItems([]);

    emit('cart:clear', {});

    emit('cart:updated', {
      items: [],
      count: 0,
      total: 0,
    });
  };

  return (
    <aside className="cart">
      <h2>Panier</h2>

      {items.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <div>Plateforme : {item.platform || 'N/A'}</div>
                <div>Prix : {item.price} €</div>
                <div>Quantité : {item.quantity}</div>
              </li>
            ))}
          </ul>

          <hr />

          <p>
            <strong>Articles :</strong> {count}
          </p>
          <p>
            <strong>Total :</strong> {total.toFixed(2)} €
          </p>

          <button onClick={handleClearCart}>Vider</button>
        </>
      )}
    </aside>
  );
}
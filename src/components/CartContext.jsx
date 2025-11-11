// src/components/CartContext.jsx
import React, { createContext, useContext, useMemo, useReducer } from "react";

const CartCtx = createContext(null);

const initial = { items: [] };
// item shape:
// { id: "1-Medium", productId: 1, label, img, size, price, qty }

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const i = state.items.findIndex(x => x.id === action.payload.id);
      if (i >= 0) {
        const items = state.items.map((x, idx) =>
          idx === i ? { ...x, qty: x.qty + (action.payload.qty ?? 1) } : x
        );
        return { ...state, items };
      }
      return { ...state, items: [...state.items, { ...action.payload }] };
    }
    case "INC": {
      const items = state.items.map(x =>
        x.id === action.id ? { ...x, qty: x.qty + 1 } : x
      );
      return { ...state, items };
    }
    case "DEC": {
      const items = state.items
        .map(x => (x.id === action.id ? { ...x, qty: x.qty - 1 } : x))
        .filter(x => x.qty > 0);
      return { ...state, items };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter(x => x.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  // actions with the exact names your components expect
  const add = (item) => dispatch({ type: "ADD", payload: item });
  const inc = (id) => dispatch({ type: "INC", id });
  const dec = (id) => dispatch({ type: "DEC", id });
  const remove = (id) => dispatch({ type: "REMOVE", id });
  const clear = () => dispatch({ type: "CLEAR" });

  const count = useMemo(
    () => state.items.reduce((s, it) => s + it.qty, 0),
    [state.items]
  );
  const total = useMemo(
    () => state.items.reduce((s, it) => s + it.qty * it.price, 0),
    [state.items]
  );

  const value = { items: state.items, add, inc, dec, remove, clear, count, total };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

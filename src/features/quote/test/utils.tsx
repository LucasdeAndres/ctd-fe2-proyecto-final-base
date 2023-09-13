import { configureStore } from "@reduxjs/toolkit";
import citaReducer from "../citaSlice";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

export function renderRedux(component: React.ReactNode) {
  const store = configureStore({
    reducer: {
      cita: citaReducer,
    },
  });

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
}

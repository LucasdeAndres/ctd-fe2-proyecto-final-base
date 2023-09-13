import { Provider } from "react-redux";
import Cita from "../Cita";
import { renderRedux } from "./utils";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { store } from "../../../app/store";

describe("Citas", () => {
  describe("Si se ingresa un numero", () => {
    it("regresa mensaje de error", async () => {
      renderRedux(<Cita />);
      const errorMessage = "Por favor ingrese un nombre válido";
      const input = screen.getByRole("textbox", {
        name: /Author Cita/i,
      });

      userEvent.type(input, "1234");

      const boton = screen.getByRole("button", {
        name: /Obtener Cita/i,
      });

      userEvent.click(boton);

      const texto = await screen.findByText(errorMessage);

      expect(texto).toBeInTheDocument();
    });
  });

  describe("Sin ingresar algun nombre en el imput", () => {
    it("se devuelve una cita al azar", async () => {
      render(
        <Provider store={store}>
          <Cita />
        </Provider>
      );

      const boton = screen.getByRole("button", {
        name: /Obtener cita aleatoria/i,
      });

      await userEvent.click(boton);

      await waitFor(() => {
        const errorMessage2 = screen.getByText(
          "Marriage is like a coffin and each kid is another nail."
        );
        expect(errorMessage2).toBeInTheDocument();
      });
    });

    describe("Si se ingresa el nombre de un persoanje", () => {
      it("regresa una cita de ese personaje", async () => {
        // renderRedux(<Cita />);
        render(
          <Provider store={store}>
            <Cita />
          </Provider>
        );
        const input = screen.getByRole("textbox", {
          name: /Author Cita/i,
        });

        userEvent.click(input);

        await userEvent.type(input, "homer");

        const boton = screen.getByRole("button", {
          name: /Obtener Cita/i,
        });

        await userEvent.click(boton);

        const texto = await screen.findByText("Homer Simpson");

        expect(texto).toBeInTheDocument();
      });
    });

    describe("Al cargar la pagina", () => {
      it("no debe renderizar una cita", async () => {
        renderRedux(<Cita />);
        expect(
          screen.getByText("No se encontro ninguna cita")
        ).toBeInTheDocument();
      });

      it("debe renderizar el input", async () => {
        renderRedux(<Cita />);
        expect(
          screen.getByRole("textbox", { name: /Author Cita/i })
        ).toBeInTheDocument();
      });

      it("debe renderizar el boton de obtener cita aleatoria", () => {
        renderRedux(<Cita />);
        expect(
          screen.getByRole("button", { name: /Obtener cita aleatoria/i })
        ).toBeInTheDocument();
      });

      it("debe renderizar el boton de borrar", () => {
        renderRedux(<Cita />);
        expect(
          screen.getByRole("button", { name: /Borrar/i })
        ).toBeInTheDocument();
      });
    });

    describe("Cuando se clickea el boton borrar", () => {
      it("el valor del input", async () => {
        renderRedux(<Cita />);
        const buttonSearch = await screen.findByText(/Obtener cita aleatoria/i);
        userEvent.click(buttonSearch);
        const buttonClear = await screen.findByLabelText(/Borrar/i);
        userEvent.click(buttonClear);
        await waitFor(() => {
          expect(
            screen.getByText(/No se encontro ninguna cita/i)
          ).toBeInTheDocument();
        });
      });
    });

    describe("El boton buscar cambia el texto", () => {
      it("cuando el input contiene un valor", async () => {
        renderRedux(<Cita />);
        const input = screen.getByRole("textbox", { name: "Author Cita" });
        userEvent.click(input);
        await userEvent.type(input, "homer");
        const buttonSearch = await screen.findByRole("button", {
          name: /Obtener Cita/i,
        });
        expect(buttonSearch).toBeInTheDocument();
      });
    });
  });
});

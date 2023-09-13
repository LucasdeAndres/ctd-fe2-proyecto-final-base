import { useEffect, useState } from "react";
import { SuscribeImage } from "../../assets";
import { INoticias, obtenerNoticias } from "./fakeRest";
import {
  DescripcionModal,
  ImagenModal,
  TituloModal,
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonLectura,
  BotonSuscribir,
  CotenedorTexto,
} from "./styled";
import ModalBase from "./ModalBase";

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

//Fer, utilize los primeros 3 principios solid, el principio de responsabilidad unica, con el use effect y El principio de abierto y cerrado junto con el principio de sustitucion de liskov para los dos tipos de modales.

const obtenerNoticiasTransformadas = (noticias: Array<INoticias>) => {
  return noticias.map((n) => {
    const titulo = n.titulo
      .split(" ")
      .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      })
      .join(" ");

    const ahora = new Date();
    const minutosTranscurridos = Math.floor(
      (ahora.getTime() - n.fecha.getTime()) / 60000
    );

    return {
      id: n.id,
      titulo,
      descripcion: n.descripcion,
      fecha: `Hace ${minutosTranscurridos} minutos`,
      esPremium: n.esPremium,
      imagen: n.imagen,
      descripcionCorta: n.descripcion.substring(0, 100),
    };
  });
};

const ModalRegular = ({
  noticia,
  onClose,
}: {
  noticia: INoticiasNormalizadas;
  onClose: () => void;
}) => {
  return (
    <ModalBase onClose={onClose}>
      <ImagenModal src={noticia.imagen} alt="news-image" />
      <CotenedorTexto>
        <TituloModal>{noticia.titulo}</TituloModal>
        <DescripcionModal>{noticia.descripcion}</DescripcionModal>
      </CotenedorTexto>
    </ModalBase>
  );
};

const ModalPremium = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalBase onClose={onClose}>
      <ImagenModal src={SuscribeImage} alt="mr-burns-excellent" />
      <CotenedorTexto>
        <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
        <DescripcionModal>
          Suscríbete a nuestro newsletter y recibe noticias de nuestros
          personajes favoritos.
        </DescripcionModal>
        <BotonSuscribir
          onClick={() =>
            setTimeout(() => {
              alert("Suscripto!");
              onClose();
            }, 1000)
          }
        >
          Suscríbete
        </BotonSuscribir>
      </CotenedorTexto>
    </ModalBase>
  );
};

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modalNoticia, setModalNoticia] =
    useState<INoticiasNormalizadas | null>(null);

  const cargarNoticias = async () => {
    const respuesta = await obtenerNoticias();
    const noticiasTransformadas = obtenerNoticiasTransformadas(respuesta);
    setNoticias(noticiasTransformadas);
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  const openModal = (noticia: INoticiasNormalizadas) => {
    setModalNoticia(noticia);
  };

  const closeModal = () => {
    setModalNoticia(null);
  };

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetaNoticia key={n.id}>
            <ImagenTarjetaNoticia src={n.imagen} />
            <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
              {n.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => openModal(n)}>Ver más</BotonLectura>
          </TarjetaNoticia>
        ))}
        {modalNoticia &&
          (modalNoticia.esPremium ? (
            <ModalPremium onClose={closeModal} />
          ) : (
            <ModalRegular noticia={modalNoticia} onClose={closeModal} />
          ))}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;

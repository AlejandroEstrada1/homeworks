import { createContext, useContext, useEffect, useState } from "react";
import { useRealtimeTareas } from "../hooks/useRealtimeTareas";
import { useAuth } from "./ContextoAuth";

const ContextoTareas = createContext();

export const useTareas = () => useContext(ContextoTareas);

export const ProveedorTareas = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const { obtenerTareas, crearTarea, eliminarTarea, actualizarTarea } = useRealtimeTareas();
  const { usuario } = useAuth();

  useEffect(() => {
    if (usuario?.uid) {
      obtenerTareas(usuario.uid, setTareas);
    } else {
      setTareas([]);
    }
  }, [usuario]);

  const agregarTarea = async (texto) => {
    if (!texto.trim() || !usuario?.uid) return;

    await crearTarea(usuario.uid, {
      texto,
      hecha: false,
    });
  };

  const borrarTarea = async (id) => {
    if (!usuario?.uid) return;
    await eliminarTarea(usuario.uid, id);
  };

  const cambiarEstadoTarea = async (id, hecha) => {
    if (!usuario?.uid) return;
    await actualizarTarea(usuario.uid, id, { hecha: !hecha });
  };

  const editarTarea = async (id, texto) => {
    if (!usuario?.uid) return;
    await actualizarTarea(usuario.uid, id, { texto });
  };

  return (
    <ContextoTareas.Provider
      value={{
        tareas,
        agregarTarea,
        borrarTarea,
        cambiarEstadoTarea,
        editarTarea,
      }}
    >
      {children}
    </ContextoTareas.Provider>
  );
};
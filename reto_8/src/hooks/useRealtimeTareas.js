import { ref, push, onValue, remove, update } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export const useRealtimeTareas = () => {
  const obtenerTareas = (uid, setTareas) => {
    if (!uid) {
      setTareas([]);
      return;
    }

    const tareasRef = ref(db, `tareas/${uid}`);

    onValue(tareasRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const tareasArray = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setTareas(tareasArray);
      } else {
        setTareas([]);
      }
    });
  };

  const crearTarea = async (uid, tarea) => {
    const tareasRef = ref(db, `tareas/${uid}`);
    await push(tareasRef, tarea);
  };

  const eliminarTarea = async (uid, id) => {
    const tareaRef = ref(db, `tareas/${uid}/${id}`);
    await remove(tareaRef);
  };

  const actualizarTarea = async (uid, id, datosActualizados) => {
    const tareaRef = ref(db, `tareas/${uid}/${id}`);
    await update(tareaRef, datosActualizados);
  };

  return {
    obtenerTareas,
    crearTarea,
    eliminarTarea,
    actualizarTarea,
  };
};
const InicioComponente = () => (
  <div>
    <h2>Inicio</h2>
    <p>Bienvenido al panel principal.</p>
  </div>
);

const UsuariosComponente = () => (
  <div>
    <h2>Usuarios</h2>
    <p>Sección general de usuarios.</p>
  </div>
);

const AgregarUsuarioComponente = () => (
  <div>
    <h2>Agregar Usuario</h2>
    <p>Aquí puedes agregar un nuevo usuario.</p>
  </div>
);

const ListaUsuariosComponente = () => (
  <div>
    <h2>Lista de Usuarios</h2>
    <p>Aquí puedes ver la lista de usuarios.</p>
  </div>
);

const ProductosComponente = () => (
  <div>
    <h2>Productos</h2>
    <p>Sección general de productos.</p>
  </div>
);

const AgregarProductoComponente = () => (
  <div>
    <h2>Agregar Producto</h2>
    <p>Aquí puedes agregar un nuevo producto.</p>
  </div>
);

const ListaProductosComponente = () => (
  <div>
    <h2>Lista de Productos</h2>
    <p>Aquí puedes ver la lista de productos.</p>
  </div>
);

const ConfiguracionComponente = () => (
  <div>
    <h2>Configuración</h2>
    <p>Configuración general del sistema.</p>
  </div>
);

const PerfilComponente = () => (
  <div>
    <h2>Perfil</h2>
    <p>Configuración del perfil del usuario.</p>
  </div>
);

const SeguridadComponente = () => (
  <div>
    <h2>Seguridad</h2>
    <p>Opciones de seguridad y privacidad.</p>
  </div>
);

const AyudaComponente = () => (
  <div>
    <h2>Ayuda</h2>
    <p>Centro de ayuda.</p>
  </div>
);

const PreguntasFrecuentesComponente = () => (
  <div>
    <h2>Preguntas Frecuentes</h2>
    <p>Respuestas a dudas comunes.</p>
  </div>
);

const ContactoSoporteComponente = () => (
  <div>
    <h2>Contacto Soporte</h2>
    <p>Contacta al soporte técnico.</p>
  </div>
);

export const menuTree = [
  {
    title: "Inicio",
    link: "/inicio",
    component: InicioComponente,
    children: [],
  },
  {
    title: "Usuarios",
    link: "/usuarios",
    component: UsuariosComponente,
    children: [
      {
        title: "Agregar Usuario",
        link: "/usuarios/agregar",
        component: AgregarUsuarioComponente,
        children: [],
      },
      {
        title: "Lista de Usuarios",
        link: "/usuarios/lista",
        component: ListaUsuariosComponente,
        children: [],
      },
    ],
  },
  {
    title: "Productos",
    link: "/productos",
    component: ProductosComponente,
    children: [
      {
        title: "Agregar Producto",
        link: "/productos/agregar",
        component: AgregarProductoComponente,
        children: [],
      },
      {
        title: "Lista de Productos",
        link: "/productos/lista",
        component: ListaProductosComponente,
        children: [],
      },
    ],
  },
  {
    title: "Configuración",
    link: "/configuracion",
    component: ConfiguracionComponente,
    children: [
      {
        title: "Perfil",
        link: "/configuracion/perfil",
        component: PerfilComponente,
        children: [],
      },
      {
        title: "Seguridad",
        link: "/configuracion/seguridad",
        component: SeguridadComponente,
        children: [],
      },
    ],
  },
  {
    title: "Ayuda",
    link: "/ayuda",
    component: AyudaComponente,
    children: [
      {
        title: "Preguntas Frecuentes",
        link: "/ayuda/preguntas-frecuentes",
        component: PreguntasFrecuentesComponente,
        children: [],
      },
      {
        title: "Contacto Soporte",
        link: "/ayuda/contacto",
        component: ContactoSoporteComponente,
        children: [],
      },
    ],
  },
];
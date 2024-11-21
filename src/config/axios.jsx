import axios from 'axios';
// Importamos la biblioteca Axios, que se utiliza para realizar solicitudes HTTP desde el cliente.

const configAxios = axios.create({
  // Creamos una instancia personalizada de Axios utilizando el método `axios.create`.

  baseURL: `${import.meta.env.VITE_BACKEND_URL}/user`
  // Definimos la base URL para todas las solicitudes que usen esta instancia.
  // La variable `import.meta.env.VITE_BACKEND_URL` toma su valor del entorno, lo que permite configurar dinámicamente la URL según el entorno (desarrollo, producción, etc.).
  // Agregamos el sufijo `/user` para indicar que todas las rutas relacionadas con usuarios partirán de esta URL base.
});

export default configAxios;
// Exportamos esta instancia para que pueda ser reutilizada en otras partes del proyecto, asegurándonos de que todas las solicitudes usen la misma configuración base.
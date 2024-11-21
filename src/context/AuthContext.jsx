import { useState, useEffect, createContext } from 'react';
import configAxios from '../config/axios.jsx';

const AuthContext = createContext();
// Crea el contexto de autenticación para compartir información entre componentes.

const AuthProvider = ({ children }) => {
  // Componente proveedor para envolver la aplicación y proporcionar el contexto.

  const [auth, setAuth] = useState({});
  // Estado para almacenar la información del usuario autenticado.
  const [loading, setLoading] = useState(true);// Estado de carga para manejar la carga inicial (útil para proteger rutas o mostrar un spinner). Estes estado sirve para evitar que la aplicación redirija prematuramente mientras se están cargando los datos de autenticación; es decir, la aplicación está esperando la respuesta del servidor antes de evaluar si el usuario está autenticado o no

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('bearer_token');
      // Recupera el token del almacenamiento local.

      if (!token) {
        setLoading(false); // Si no hay token, finaliza la carga y no realiza más acciones.
        return;
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };
      // Configuración para la solicitud HTTP con el token incluido.

      try {
        const { data } = await configAxios.get('/dashboard', config);
        // Solicita los datos del usuario autenticado al backend.
        setAuth(data);
        // Actualiza el estado con los datos del usuario.
      } catch (error) {
        console.log(error.response.data.msg);
        // Maneja errores, como un token inválido.
        setAuth({});
        // Resetea el estado de autenticación si ocurre un error.
      } finally {
        setLoading(false);
        // Finaliza la carga, ya sea que la solicitud haya sido exitosa o no.
      };
    };

    authUser();
    // Llama a la función para autenticar al usuario cuando el componente se monta.
  }, []);

  const updateUser = async userData => {

    const token = localStorage.getItem('bearer_token');
    // Recupera el token del almacenamiento local.

    if (!token) {
      setLoading(false);
      return;
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    try {

      const response = await configAxios.put(`/update/${userData._id}`, userData, config);
      // Realiza una solicitud PUT para actualizar los datos del usuario.

      // Aquí actualizamos el estado `auth` con los datos de usuario actualizados
      setAuth(prevAuth => ({
        ...prevAuth,
        ...userData  // Actualizamos solo las propiedades modificadas
      }));
      // Esta operación se le puede denominar: Actualización inmutable del estado usando operador de propagación. *Al final del código se explica con detalle esta operación.

      return ({
        msg: response?.data?.msg || 'Cambiar Datos: Exitoso',
        display: true,
        error: false,
      });
      // Devuelve un mensaje de éxito si la solicitud fue exitosa.

    } catch (error) {

      return ({
        msg: error.response?.data?.msg || 'Cambiar Datos: No Exitoso',
        display: true,
        error: true,
      });
      // Devuelve un mensaje de error si la solicitud falló.

    };

  };

  const verifyPassword = async password => {

    const token = localStorage.getItem('bearer_token');

    if (!token) {
      setLoading(false);
      return;
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    try {

      const response = await configAxios.post(`/verify-password/${auth._id}`, { password }, config);
      // Realiza una solicitud POST para verificar la contraseña del usuario.

      return ({
        msg: response?.data?.msg || 'Bueno: Exitoso',
        display: false,
        error: false,
      });
      // Devuelve un mensaje de éxito si la contraseña es correcta.

    } catch (error) {

      return ({
        msg: error.response?.data?.msg || 'Malo: No Exitoso',
        display: true,
        error: true,
      });
      // Devuelve un mensaje de error si la contraseña es incorrecta.

    };

  };

  const updatePassword = async userData => {

    const token = localStorage.getItem('bearer_token');

    if (!token) {
      setLoading(false);
      return;
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    try {

      const response = await configAxios.put(`/update-password/${userData._id}`, userData, config);
      // Realiza una solicitud PUT para actualizar la contraseña del usuario.

      // Aquí actualizamos el estado `auth` con los datos de usuario actualizados
      setAuth(prevAuth => ({
        ...prevAuth,
        ...userData  // Actualizamos solo las propiedades modificadas
      }));
      // Esta operación se le puede denominar: Actualización inmutable del estado usando operador de propagación. *Al final del código se explica con detalle esta operación.

      return ({
        msg: response?.data?.msg || 'Cambiar Password: Exitoso',
        display: true,
        error: false,
      });


    } catch (error) {

      return ({
        msg: error.response?.data?.msg || 'Cambiar Password: No Exitoso',
        display: true,
        error: true,
      });

    };

  };

  const deleteUser = async () => {

    const token = localStorage.getItem('bearer_token');

    if (!token) {
      setLoading(false);
      return;
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    try {

      const response = await configAxios.delete(`/delete/${auth._id}`, config);
      // Realiza una solicitud DELETE para eliminar al usuario.

      return ({
        msg: response?.data?.msg || 'Bueno: Exitoso',
        display: true,
        error: false,
      });

    } catch (error) {

      return ({
        msg: error.response?.data?.msg || 'Malo: No Exitoso',
        display: true,
        error: true,
      });

    };

  };

  const logOut = () => {

    localStorage.removeItem('bearer_token');
    // Elimina el token de autenticación.
    setAuth({});
    // Resetea el estado de autenticación.

  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,   // Pasamos el estado de loading al contexto
        updateUser,
        verifyPassword,
        updatePassword,
        deleteUser,
        logOut,
      }}
    >
      {children}
      {/* Renderiza los componentes hijos dentro del proveedor de contexto */}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
// Exporta el proveedor y el contexto para su uso en otros componentes.

// *Actualización inmutable del estado usando operador de propagación: Es una forma común de actualizar el estado de un objeto en React utilizando el patrón de actualización funcional con la función setAuth.

// Estado inicial: const [auth, setAuth] = useState({});
// Actualización inmutable: setAuth(prevAuth => ({ ...prevAuth, ...userData}));

// Detalles paso a paso:
// 1. Función de actualización funcional (prevAuth):
// -setAuth puede aceptar una función en lugar de un valor directamente.
// -Esa función recibe como argumento el valor anterior del estado, llamado aquí prevAuth.
// -Usar la función es importante cuando la actualización depende del estado anterior, para evitar inconsistencias en situaciones de estado asincrónico.

// 2. Spread operator (...prevAuth):
// -El operador de propagación (...) copia todas las propiedades del objeto prevAuth (el estado anterior).
// -Esto garantiza que las propiedades existentes en auth no se pierdan al actualizar solo algunas propiedades.

// Por ejemplo, si prevAuth es: { name: 'Joanny', email: 'joanny@example.com' }
// Entonces, al usar ...prevAuth, estás copiando ese contenido en el nuevo objeto que se está creando.

// 3. Propagación de userData (...userData):
// -Después de copiar prevAuth, las propiedades de userData (el nuevo dato que deseas agregar o modificar) se propagan al objeto resultante.
// -Si userData contiene propiedades que ya existen en prevAuth, estas sobrescriben los valores previos.

// Por ejemplo: Si userData es: { email: 'nuevo@example.com' }
// Entonces, el nuevo estado será: { name: 'Joanny', email: 'nuevo@example.com' }

// 4.Retorno del nuevo objeto:
// -La función devuelve el nuevo objeto que se convertirá en el nuevo estado de auth.

// Esta técnica es útil cuando necesitas:
// -Actualizar propiedades específicas del estado sin perder las propiedades existentes.
// -Asegurar que el estado previo se tenga en cuenta durante la actualización.

// Beneficios:
// - Evitas perder datos del estado anterior al actualizar solo las propiedades necesarias.
// - Es una manera elegante y segura de manejar actualizaciones de objetos en React.



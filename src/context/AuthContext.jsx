import { useState, useEffect, createContext } from 'react';
import configAxios from '../config/axios.jsx';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  // Inicializa auth como un objeto vacío, en lugar de undefined
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);  // Estado de carga: para evitar que la aplicación redirija prematuramente mientras se están cargando los datos de autenticación; es decir, la aplicación está esperando la respuesta del servidor antes de evaluar si el usuario está autenticado o no

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('bearer_token');

      if (!token) {
        setLoading(false);  // Si no hay token, termina la carga
        return;
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };

      try {
        const { data } = await configAxios.get('/dashboard', config);
        setAuth(data);  // Guardar los datos del usuario autenticado
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});  // Resetear auth en caso de error
      } finally {
        setLoading(false);  // Finalizar el estado de carga
      }
    };

    authUser();
  }, []);

  const updateUser = async userData => {

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

      const response = await configAxios.put(`/update/${userData._id}`, userData, config);

      // Aquí actualizamos el estado `auth` con los datos de usuario actualizados
      setAuth(prevAuth => ({
        ...prevAuth,
        ...userData  // Actualizamos solo las propiedades modificadas
      }));

      return ({
        msg: response?.data?.msg || 'Cambiar Datos: Exitoso',
        display: true,
        error: false,
      });

    } catch (error) {

      return ({
        msg: error.response?.data?.msg || 'Cambiar Datos: No Exitoso',
        display: true,
        error: true,
      });

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

      return ({
        msg: response?.data?.msg || 'Bueno: Exitoso',
        display: false,
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

      // Aquí actualizamos el estado `auth` con los datos de usuario actualizados
      setAuth(prevAuth => ({
        ...prevAuth,
        ...userData  // Actualizamos solo las propiedades modificadas
      }));

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
    setAuth({});

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
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
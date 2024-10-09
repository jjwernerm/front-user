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

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,   // Pasamos el estado de loading al contexto
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PiSpinnerGapBold } from "react-icons/pi";
import configAxios from '../config/axios.jsx';  // Importa la configuración de Axios para realizar solicitudes HTTP
import { useAuth } from '../hooks/useAuth.jsx';  // Importa el hook 'useAuth' para gestionar la autenticación

export default function Loging() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState({});

  const { setAuth }  = useAuth();  // Utiliza el hook 'useAuth' para establecer la autenticación en el contexto

  const navigate = useNavigate();  // Hook para redirigir a otra ruta una vez que el usuario inicia sesión

  const handleEmailValue = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    setEmail(value);
  };

  const handlePasswordValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async e => {  // Función para manejar el envío del formulario de inicio de sesión
    e.preventDefault();  // Previene el comportamiento por defecto del formulario (recarga de la página)

    try {
      const url = '/loging';  // URL del endpoint de inicio de sesión
      const { data } = await configAxios.post(url, { email, password });  // Realiza una solicitud POST con el correo y la contraseña
      localStorage.setItem('bearer_token', data.bearer_token);  // Guarda el token JWT recibido en el almacenamiento local
      setAuth(data);  // Establece el usuario autenticado en el contexto

      setSpinner(true);  // Activa el spinner de carga
      await new Promise(resolve => setTimeout(resolve, 2000));  // Simula una pausa de 2 segundos
      setSpinner(false);  // Desactiva el spinner de carga

      navigate('/web-user');  // Redirige al usuario a la ruta '/web-user' después de un inicio de sesión exitoso

    } catch (error) {  // Maneja los errores en caso de que la solicitud falle
      setMessage({
        msg: error.response?.data?.msg || 'Iniciar Sesión: No Exitosa',  // Mensaje de error si la solicitud falla
        display: true,  // Muestra el mensaje de error
        error: true,  // Marca el mensaje como error
      });
      setPassword('');  // Borra la contraseña en caso de error
    } finally {  // Bloque que siempre se ejecuta, sin importar si la solicitud fue exitosa o fallida
      await new Promise(resolve => setTimeout(resolve, 5000));  // Espera 5 segundos antes de borrar el mensaje
      setMessage({
        msg: '',  // Borra el mensaje de error o éxito
        error: '',  // Borra el estado de error
        display: false,  // Oculta el mensaje
      });
    };
  };

  return (

    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Inicia Sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo Electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailValue}
                  className="block w-full rounded-md py-1.5 text-gray-900
                  shadow-sm pl-2 sm:text-sm sm:leading-6
                  border-0 outline-none
                  ring-1 ring-inset ring-gray-300
                  hover:ring-1 hover:ring-inset hover:ring-blue-600
                  focus:ring-2 focus:ring-inset focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <NavLink
                    to="/recover-password"
                    className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
                  >
                    Olvidé mi Contraseña
                  </NavLink>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordValue}
                  className="block w-full rounded-md py-1.5 text-gray-900
                  shadow-sm pl-2 sm:text-sm sm:leading-6
                  border-0 outline-none
                  ring-1 ring-inset ring-gray-300
                  hover:ring-1 hover:ring-inset hover:ring-blue-600
                  focus:ring-2 focus:ring-inset focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {spinner ? (
                  <div className="flex items-center">
                    <PiSpinnerGapBold className="animate-spin h-5 w-5 text-white mr-2" />
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>

            <div className={message.display ? 'block' : 'hidden'}>
              <p
                className={`
            ${message.error ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'}
            rounded-md p-2 text-center text-sm md:text-base 
          `}
              >
                {message.msg}
              </p>
            </div>

          </form>

          <p className="mt-10 text-center text-sm">
            <NavLink
              to="/create"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Crear Cuenta
            </NavLink>
          </p>
        </div>
      </div>
    </>

  );

};
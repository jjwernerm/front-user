import { useState } from 'react';
import { useParams, NavLink } from "react-router-dom";
import { PiSpinnerGapBold } from "react-icons/pi";
import configAxios from '../config/axios.jsx';

export default function RecoverPasswordToken() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [login, setLogin] = useState(false);
  const [message, setMessage] = useState({});
  const params = useParams();  // Hook que captura los parámetros de la URL (en este caso el token)
  const { token } = params;  // Desestructuramos el token de la URL

  // Función que maneja el valor de la contraseña nueva.
  const handlePasswordValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPassword(value);
  };

  // Función que maneja el valor de la confirmación de la contraseña.
  const handleConfirmPasswordValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setConfirmPassword(value);
  };

  // Función que maneja el envío del formulario de recuperación de contraseña.
  const handleSubmit = async e => {
    e.preventDefault();

    // Validación de que las contraseñas coinciden
    if (password !== confirmPassword) {
      setMessage({
        msg: 'Las contraseñas no coinciden',
        display: true,
        error: true,
      });
      setPassword('');  // Limpiamos los campos de contraseña
      setConfirmPassword('');
      return;  // No enviamos la solicitud si las contraseñas no coinciden
    }

    try {
      const url = `/recover-password/${token}`;  // URL para la recuperación de contraseña con el token
      const response = await configAxios.post(url, { password, token });  // Hacemos la petición para cambiar la contraseña

      // Activamos el spinner mientras procesamos la solicitud
      setSpinner(true);
      await new Promise(resolve => setTimeout(resolve, 2000));  // Esperamos 2 segundos (simulación de carga)
      setSpinner(false);

      // Limpiamos los campos de contraseña
      setPassword('');
      setConfirmPassword('');

      // Mostramos un mensaje de éxito si la respuesta es positiva
      setMessage({
        msg: response?.data?.msg || 'Nueva Contraseña: Exitosa',
        display: true,
        error: false,
      });

      // Indicamos que el usuario puede iniciar sesión
      setLogin(true);

    } catch (error) {
      // En caso de error, mostramos un mensaje de error
      setMessage({
        msg: error.response?.data?.msg || 'Nueva Contraseña: No Exitosa',
        display: true,
        error: true,
      });
      setPassword('');
      setConfirmPassword('');
    } finally {
      // Reseteamos el mensaje después de 5 segundos
      await new Promise(resolve => setTimeout(resolve, 5000));
      setMessage({
        msg: '',
        error: '',
        display: false,
      });
    }
  };

  return (

    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crear Contraseña
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Nueva Contraseña
                </label>
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
              <div className="flex items-center justify-between">
                <label htmlFor="password-confirm" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirmar Nueva Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password-confirm"
                  name="password-confirm"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordValue}
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
                    Creando contaseña...
                  </div>
                ) : (
                  'Crear Contraseña'
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

          <div className={login ? 'block' : 'hidden'}>
            <p className="mt-10 text-center text-sm">
              <NavLink
                to="/"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Iniciar Sesión
              </NavLink>
            </p>
          </div>

        </div>
      </div>
    </>

  );

};
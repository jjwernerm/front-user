import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { PiSpinnerGapBold } from "react-icons/pi";
import configAxios from '../config/axios.jsx'; // Importa la configuración personalizada de axios para hacer peticiones HTTP

export default function RecoverPasswordEmail() {

  const [email, setEmail] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState({});

  // Función para manejar el cambio de valor del campo de email
  const handleEmailValue = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase(); // Convierte el valor del email a minúsculas para evitar errores de mayúsculas
    setEmail(value); // Actualiza el estado de email con el valor convertido
  };

  // Función para manejar el envío del formulario (solicitud de recuperación de contraseña)
  const handleSubmit = async e => {
    e.preventDefault(); // Previene la acción predeterminada del formulario

    try {

      // URL del endpoint para solicitar la recuperación de contraseña
      const url = '/recover-password';
      // Realiza una petición POST a la API para enviar el email
      const response = await configAxios.post(url, { email });

      // Muestra el spinner durante el proceso de envío
      setSpinner(true);
      // Espera 2 segundos (simulando un proceso de espera)
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Detiene el spinner una vez que la operación se ha completado
      setSpinner(false);

      // Limpia el valor del campo email después de la solicitud
      setEmail('');

      // Establece el mensaje de éxito en el estado
      setMessage({
        msg: response?.data?.msg || 'Email enviado con instrucciones: Exitoso', // Mensaje de éxito, si lo hay
        display: true, // Indica que el mensaje debe mostrarse
        error: false, // Indica que no hubo error
      });

    } catch (error) {

      // En caso de error, establece el mensaje de error en el estado
      setMessage({
        msg: error.response?.data?.msg || 'Email no registrado: No Exitoso', // Mensaje de error, si lo hay
        display: true, // Indica que el mensaje debe mostrarse
        error: true, // Indica que hubo un error
      });

    } finally {

      // Espera 5 segundos antes de ocultar el mensaje de estado
      await new Promise(resolve => setTimeout(resolve, 5000));
      // Resetea el mensaje en el estado
      setMessage({
        msg: '', // Limpia el mensaje
        error: '', // Limpia el estado de error
        display: false, // Oculta el mensaje
      });

    };

  };

  return (

    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Olvidé mi Contraseña
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {spinner ? (
                  <div className="flex items-center">
                    <PiSpinnerGapBold className="animate-spin h-5 w-5 text-white mr-2" />
                    Validando email...
                  </div>
                ) : (
                  'Recuperar Contraseña'
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

          <div className="flex justify-around">
            <p className="mt-10 text-center text-sm">
              <NavLink
                to="/"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Iniciar Sesión
              </NavLink>
            </p>
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
      </div>
    </>

  );

};
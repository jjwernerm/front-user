import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { PiSpinnerGapBold } from "react-icons/pi";
import configAxios from '../config/axios.jsx'; // Se importa la configuración de Axios desde `config/axios.jsx` para realizar la solicitud HTTP.

export default function Create() {

  // Definimos el estado local para los campos del formulario y los mensajes
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('Actualizar...');
  const [address, setAddress] = useState('Actualizar...');
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState({});

  // Funciones para manejar los cambios en los campos del formulario
  const handleNameValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setName(value);
  };

  const handleEmailValue = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase(); // Convertimos el email a minúsculas
    setEmail(value);
  };

  const handlePasswordValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPassword(value);
  };

  const handleConfirmPasswordValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setConfirmPassword(value);
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Comprobamos si las contraseñas coinciden
      if (password != confirmPassword) {
        setMessage({
          msg: 'Las contraseñas no coinciden',
          display: true,
          error: true,
        });
        setPassword(''); // Limpiamos las contraseñas
        setConfirmPassword('');
        return;
      };

      // Definimos la URL y realizamos la solicitud POST con los datos del formulario
      const url = '/create';
      const response = await configAxios.post(url, { name, email, password, address, phone });

      setSpinner(true); // Mostramos el spinner mientras se procesa la solicitud
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulamos un retraso de 2 segundos
      setSpinner(false);

      // Limpiamos los campos del formulario
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Mostramos un mensaje de éxito
      setMessage({
        msg: response?.data?.msg || 'Crear Cuenta: Exitosa',
        display: true,
        error: false,
      });

    } catch (error) {

      // Si hay un error en la solicitud, mostramos un mensaje de error
      setMessage({
        msg: error.response?.data?.msg || 'Crear Cuenta: No Exitosa',
        display: true,
        error: true,
      });
      setPassword('');// Limpiamos las contraseñas
      setConfirmPassword('');

    } finally {

      // Después de 5 segundos, limpiamos el mensaje
      await new Promise(resolve => setTimeout(resolve, 5000));
      setMessage({
        msg: '',
        error: '',
        display: false,
      });

    };

  };

  return (

    <>
      {/* Estructura del formulario de creación de cuenta */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crear Cuenta
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={handleNameValue}
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
              <div className="flex items-center justify-between">
                <label htmlFor="password-confirm" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirmar Contraseña
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
                {/* Operador ternario para el spinner */}
                {spinner ? (
                  <div className="flex items-center">
                    <PiSpinnerGapBold className="animate-spin h-5 w-5 text-white mr-2" />
                    Creando cuenta...
                  </div>
                ) : (
                  'Crear Cuenta'
                )}
              </button>
            </div>

            {/* Operador ternario para el mensaje de error o notificación */}
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
              to="/"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Iniciar Sesión
            </NavLink>
          </p>
        </div>
      </div>
    </>

  );

};
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PiSpinnerGapBold } from "react-icons/pi";
import useAuth from "../hooks/useAuth.jsx"; // Custom hook para el manejo de autenticación
import Header from '../components/Header.jsx';

export default function UpdatePassword() {

  const [userData, setUserData] = useState({});
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState({});

  // Desestructuramos los métodos del hook useAuth para su uso en el componente
  const { auth, verifyPassword, updatePassword } = useAuth();

  // useEffect que se ejecuta cuando el componente se monta y actualiza el estado de userData con los datos de auth
  useEffect(() => {
    setUserData(auth); // Asignamos los datos de la autenticación al estado userData
  }, [auth]); // Este efecto se ejecutará cada vez que auth cambie.

  // Función para manejar el cambio en el valor de la contraseña
  const handlePasswordValue = (e) => {
    setPassword(e.target.value); // Actualizamos el estado de la contraseña con el valor ingresado
  };

  // Función para manejar el cambio en el valor de la confirmación de la contraseña
  const handlePasswordConfirmValue = (e) => {
    setPasswordConfirm(e.target.value); // Actualizamos el estado de la confirmación con el valor ingresado
  };

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario (recarga de la página)

    // Verificamos si las contraseñas ingresadas coinciden
    if (userData.password !== passwordConfirm) {
      // Si las contraseñas no coinciden, mostramos un mensaje de error
      setMessage({
        msg: 'Las contraseñas no coinciden', // Mensaje de error
        display: true, // Indicamos que el mensaje debe ser visible
        error: true, // Indicamos que es un mensaje de error
      });

      // Esperamos 5 segundos antes de limpiar el mensaje de error
      await new Promise(resolve => setTimeout(resolve, 5000));
      setMessage({
        msg: '', // Limpiamos el mensaje
        error: '', // Limpiamos el error
        display: false, // Ocultamos el mensaje
      });
      
      // Limpiamos los campos de usuario y confirmación de la contraseña
      setUserData('');
      setPasswordConfirm('');
      return; // Salimos de la función si las contraseñas no coinciden
    };

    // Si las contraseñas coinciden, comenzamos la operación de actualización
    setSpinner(true); // Activamos el spinner
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulamos un retraso de 2 segundos
    setSpinner(false); // Desactivamos el spinner después de la espera

    // Verificamos la contraseña ingresada usando el método verifyPassword
    const resVerify = await verifyPassword(password);

    // Si la verificación falla, mostramos el mensaje de error
    if (resVerify.error === true) {
      setMessage(resVerify); // Establecemos el mensaje de error
      await new Promise(resolve => setTimeout(resolve, 5000)); // Esperamos 5 segundos antes de limpiar el mensaje
    } else if (resVerify.error === false) {
      // Si la verificación es exitosa, procedemos a actualizar la contraseña
      const resUpdate = await updatePassword(userData); // Llamamos a la función updatePassword para actualizar los datos
      setMessage(resUpdate); // Establecemos el mensaje de éxito
      await new Promise(resolve => setTimeout(resolve, 5000)); // Esperamos 5 segundos antes de limpiar el mensaje
    };

    // Limpiamos el mensaje después de mostrarlo
    setMessage({
      msg: '', // Limpiamos el mensaje
      error: '', // Limpiamos el error
      display: false, // Ocultamos el mensaje
    });
  };

  return (

    <>

      <Header />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950">Cambiar Contraseña</h1>
        </div>
      </header>

      <div className="mr-2 mt-2 text-sm md:text-base flex justify-end">
        <NavLink
          to="/web-user"
          className=" font-semibold leading-6 text-blue-600 hover:text-blue-500"
        >
          Regresar al Dashboard
        </NavLink>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm p-4">

        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Contraseña Actual
            </label>
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
              <label htmlFor="password-new" className="block text-sm font-medium leading-6 text-gray-900">
                Nueva Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password-new"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={userData.password || ''}
                onChange={e => setUserData({
                  ...userData,
                  [e.target.name]: e.target.value
                })}
                // *Esta línea de código se desglosa en el archivo <Update.jsx> al final del código para entender paso a paso
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
                value={passwordConfirm}
                onChange={handlePasswordConfirmValue}
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
                  Enviando solicitud...
                </div>
              ) : (
                'Cambiar Contraseña'
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

      </div>

    </>

  );

};
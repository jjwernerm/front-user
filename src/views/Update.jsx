import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PiSpinnerGapBold } from "react-icons/pi";
import useAuth from "../hooks/useAuth.jsx"; // Hook personalizado que proporciona datos y funciones relacionadas con la autenticación.
import Header from '../components/Header.jsx';

export default function Update() {

  const [userData, setUserData] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState({});

  const { auth, updateUser } = useAuth(); // Extraemos los datos de autenticación y la función para actualizar al usuario desde el hook useAuth.

  useEffect(() => {
    setUserData(auth); // Inicializamos userData con la información de autenticación cuando el componente se monta o auth cambia.
  }, [auth]);

  const handleSubmit = async e => {
    e.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario (recargar la página).

    setSpinner(true); // Activamos el spinner para indicar que el proceso está en curso.
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulamos un retraso de 2 segundos para la UX.
    setSpinner(false); // Desactivamos el spinner tras el retraso.

    const resData = await updateUser(userData); // Llamamos a la función para actualizar los datos del usuario y guardamos la respuesta.
    setMessage(resData); // Actualizamos el mensaje con la respuesta del servidor.

    await new Promise(resolve => setTimeout(resolve, 5000)); // Mantenemos el mensaje visible durante 5 segundos.
    setMessage({
      msg: '', // Vaciamos el mensaje.
      error: '', // Vaciamos el estado de error.
      display: false, // Ocultamos el mensaje.
    });
  };

  return (

    <>

      <Header />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950">Cambiar Datos</h1>
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
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                required
                autoComplete="name"
                value={userData.name || ''} // Inicializamos el campo con el valor de la propiedad "name" del objeto userData.
                onChange={e => setUserData({
                  ...userData, // Mantiene los otros valores del objeto
                  [e.target.name]: e.target.value // Actualiza solo el campo "name"
                })}
                // *Esta línea de código se desglosa al final para entender paso a paso
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
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Número de Teléfono
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="phone"
                required
                autoComplete="phone"
                value={userData.phone || ''}
                onChange={e => setUserData({
                  ...userData,
                  [e.target.name]: e.target.value
                })}
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
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Dirección
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="address"
                required
                autoComplete="address"
                value={userData.address || ''}
                onChange={e => setUserData({
                  ...userData,
                  [e.target.name]: e.target.value
                })}
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
                  Cambiando datos...
                </div>
              ) : (
                'Cambiar Datos'
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


// 1) Atributo <value>: value={userData.name || ''}
// Esta línea determina el valor actual del campo de entrada en el formulario.

// Descomposición:

  // userData.name
    //Se refiere a la propiedad name del objeto userData.
    // Este objeto contiene los datos del usuario que queremos mostrar y/o actualizar.

  // || ''
    // Es un operador lógico OR.
    // Si userData.name es undefined, null o cualquier valor "falsy" (como una cadena vacía), el campo usará como valor una cadena vacía ('') para evitar errores.
    // Esto asegura que siempre haya un valor inicial en el campo de entrada, incluso si userData.name no está definido.

// (Ejemplo práctico - 1)
// Si el estado de userData es: const userData = { name: 'Joanny', phone: '', address: 'Chile' };
// El valor del campo será Joanny porque userData.name tiene un valor.

// (Ejemplo práctico - 2)
// Si el estado de userData es: const userData = { name: undefined, phone: '', address: 'Chile' };
// El valor del campo será una cadena vacía ('') porque userData.name es undefined.

// 2) Atributo <onChange>: onChange={e => setUserData({...userData, [e.target.name]: e.target.value})}
// Esta línea maneja el evento de cambio (onChange) en el campo de entrada, actualizando el estado de userData.

// Descomposición:

  // e:
    // Es el objeto del evento que se genera cuando el usuario escribe algo en el campo.

  // e.target:
    // Representa el elemento que disparó el evento, en este caso, el campo de entrada.

  // e.target.name:
    // Es el atributo name del campo de entrada que identifica qué propiedad de userData debe actualizarse (por ejemplo, name, phone o address).

  // e.target.value:
    // Es el nuevo valor que el usuario ingresó en el campo de entrada.

// Operación dentro de setUserData:

  // {...userData}:
    // Copia todas las propiedades existentes de userData al nuevo objeto. Esto asegura que no se pierdan los valores previos de las otras propiedades.

  // [e.target.name]: e.target.value:
    // Usamos notación de clave dinámica ([]) para indicar que queremos actualizar específicamente la propiedad cuyo nombre coincide con e.target.name.
    // Su valor se actualiza a lo que el usuario ingresó (e.target.value).

// Ejemplo práctico:
// Inicialmente userData es: const userData = { name: 'Joanny', phone: '12345678', address: 'Chile' };

// Cuando el usuario escribe "Werner" en el campo de entrada para name:
// e.target.name será 'name'.
// e.target.value será 'Werner'.

// El nuevo estado será:
// {
//   name: 'Werner',       // Actualizado
//   phone: '12345678',    // Conservado
//   address: 'Chile'      // Conservado
// }

// Esto ocurre sin modificar directamente el objeto original (userData), siguiendo el principio de inmutabilidad en React.

// Conclusión

// value={userData.name || ''}:
  // Inicializa el campo con el valor de userData.name, y usa una cadena vacía como valor predeterminado si userData.name no está definido.

// onChange={e => setUserData({...userData, [e.target.name]: e.target.value})}:
  // Detecta cambios en el campo de entrada, identifica cuál propiedad del estado userData debe cambiar (e.target.name), y actualiza su valor con lo que el usuario escribió (e.target.value), manteniendo intactas las demás propiedades de userData.
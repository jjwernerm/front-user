import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import configAxios from '../config/axios.jsx';

export default function ConfirmUser() {

  const [message, setMessage] = useState({});

  // useParams extrae los parámetros de la URL, en este caso el token
  const params = useParams();
  const { token } = params;
  
  // Contador para evitar que el mensaje se actualice múltiples veces
  let counter = 0;

  // useEffect se ejecuta al montar el componente
  useEffect(() => {

    // Función asíncrona que se llama para confirmar el token del usuario
    const confirmUserToken = async () => {

      try {
        // Construimos la URL para enviar la solicitud GET con el token del usuario
        const url = `/confirm-user/${token}`;
        
        // Realizamos la solicitud GET usando axios
        const response = await configAxios.get(url);

        // Si la respuesta es exitosa, mostramos un mensaje positivo
        setMessage({
          msg: response?.data?.msg || 'Cuenta activada: Exitosa', // Si la respuesta tiene un mensaje, lo usamos; de lo contrario, mostramos el mensaje predeterminado
          display: true,  // Indicamos que el mensaje debe mostrarse
          error: false,   // Establecemos que no es un error
        });

        // Incrementamos el contador (para evitar que se muestre múltiples veces)
        counter++

      } catch (error) {

        // Si ocurre un error y el contador sigue en 0, mostramos el mensaje de error
        if (counter === 0) {
          setMessage({
            msg: error.response?.data?.msg || 'Cuenta no activa: No Exitosa', // Si la respuesta del error contiene un mensaje, lo usamos; de lo contrario, mostramos un mensaje predeterminado
            display: true,  // Indicamos que el mensaje debe mostrarse
            error: true,    // Establecemos que este es un mensaje de error
          });
        };

      };

    };

    // Llamamos a la función de confirmación
    confirmUserToken();

  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

  return (

    <>
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

      <div className="flex justify-center my-10">
        <NavLink
          type="submit"
          className="flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          to="/"
        >
          Iniciar Sesión
        </NavLink>
      </div>
    </>

  );

};

// Este archivo maneja la confirmación de una cuenta de usuario a través de un token, gestionando la respuesta de la solicitud HTTP y mostrando un mensaje adecuado al usuario según el resultado de la operación.
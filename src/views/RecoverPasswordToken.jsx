import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams permite obtener parámetros de la URL.
import configAxios from '../config/axios.jsx';
import RecoverPasswordNew from './RecoverPasswordNew.jsx';

export default function RecoverPasswordToken() {

  const [message, setMessage] = useState({});

  // Obtenemos el parámetro 'token' desde la URL mediante useParams().
  const params = useParams();
  const { token } = params; // Desestructuramos el 'token' de los parámetros de la URL.

  let counter = 0; // Inicialización de un contador local para controlar la lógica de reintentos o condiciones.

  useEffect(() => {
    // Función que realiza la validación del token con el backend.
    const passwordToken = async () => {
      try {
        // URL del endpoint donde se valida el token.
        const url = `/recover-password/${token}`;
        // Realiza una petición GET con Axios al backend.
        await configAxios.get(url);

        // Si la petición es exitosa, incrementa el contador.
        counter++;

      } catch (error) {
        // Si ocurre un error (por ejemplo, token inválido), muestra un mensaje adecuado.
        if (counter === 0) {
          setMessage({
            msg: error.response?.data?.msg || 'Token inválido: No Exitoso', // Si existe un mensaje en la respuesta de error, lo muestra.
            display: true, // Muestra el mensaje.
            error: true, // Marca el mensaje como un error.
          });
        }
      }
    };

    // Llamada a la función que valida el token al cargar el componente.
    passwordToken();
  }, []); // El segundo parámetro vacío significa que este efecto solo se ejecutará una vez cuando se monte el componente.

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

      <div className={message.display ? 'hidden' : 'block'}>
        <RecoverPasswordNew />
      </div>

    </>

  );

};
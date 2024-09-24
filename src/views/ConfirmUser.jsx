import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import configAxios from '../config/axios.jsx';

export default function ConfirmUser() {

  const [message, setMessage] = useState({});
  const params = useParams();
  const { token } = params;
  let counter = 0;

  useEffect(() => {

    const confirmUserToken = async () => {

      try {
        const url = `/confirm-user/${token}`;
        const response = await configAxios.get(url);

        setMessage({
          msg: response?.data?.msg || 'Cuenta activada: Exitosa',
          display: true,
          error: false,
        });

        counter++

      } catch (error) {

        if (counter === 0) {

          setMessage({
            msg: error.response?.data?.msg || 'Cuenta no activa: No Exitosa',
            display: true,
            error: true,
          });

        };

      };

    };

    confirmUserToken();

  }, []);

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
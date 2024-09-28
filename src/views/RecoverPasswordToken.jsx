import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import configAxios from '../config/axios.jsx';
import RecoverPasswordNew from './RecoverPasswordNew.jsx';

export default function RecoverPasswordToken() {

  const [message, setMessage] = useState({});
  const params = useParams();
  const { token } = params;
  let counter = 0;

  useEffect(() => {

    const passwordToken = async () => {

      try {
        const url = `/recover-password/${token}`;
        await configAxios.get(url);

        counter++

      } catch (error) {

        if (counter === 0) {

          setMessage({
            msg: error.response?.data?.msg || 'Token inválido: No Exitoso',
            display: true,
            error: true,
          });

        };

      };

    };

    passwordToken();

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

      <div className={message.display ? 'hidden' : 'block'}>
        <RecoverPasswordNew />
      </div>

    </>

  );

};
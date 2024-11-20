import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PiSpinnerGapBold } from "react-icons/pi";
import useAuth from "../hooks/useAuth.jsx";
import Header from '../components/Header.jsx';

export default function DeleteUser() {

  const [email, setEmail] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState({});
  const { auth, deleteUser, logOut } = useAuth({});

  const handleEmailValue = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    setEmail(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (auth.email === email) {
      
      setSpinner(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSpinner(false);

      const resData = await deleteUser()
      setMessage(resData)
      await new Promise(resolve => setTimeout(resolve, 2000));

      await logOut()

    } else {
      
      setMessage({
        msg: 'El correo electrónico no coincide con el usuario a eliminar',
        display: true,
        error: true,
      });
      await new Promise(resolve => setTimeout(resolve, 5000));

    };

    setMessage({
      msg: '',
      error: '',
      display: false,
    });

  };

  return (

    <>

      <Header />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950">Eliminar Usuario</h1>
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

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Nombre
          </label>
          <p>{auth.name}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Correo Electrónico
          </label>
          <p>{auth.email}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
            Número de Teléfono
          </label>
          <p>{auth.phone}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
            Dirección
          </label>
          <p>{auth.address}</p>
        </div>

        <p className="mt-2 text-center text-sm italic bg-yellow-100 rounded-md">
          Haz clic en <NavLink
            to="/web-user"
            className=" font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Regresar al Dashboard
          </NavLink> si no quieres eliminar tu usuario
        </p>

      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm p-4">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Escribe tu Correo Electrónico
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
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {spinner ? (
                <div className="flex items-center">
                  <PiSpinnerGapBold className="animate-spin h-5 w-5 text-white mr-2" />
                  Eliminando usuario...
                </div>
              ) : (
                'Confirmo Eliminar mi Usuario'
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
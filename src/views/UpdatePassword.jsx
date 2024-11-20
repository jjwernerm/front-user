import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PiSpinnerGapBold } from "react-icons/pi";
import useAuth from "../hooks/useAuth.jsx";
import Header from '../components/Header.jsx';

export default function UpdatePassword() {

  const [userData, setUserData] = useState({});
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState({});

  const { auth, verifyPassword, updatePassword } = useAuth()

  useEffect(() => {
    setUserData(auth)
  }, [auth])

  const handlePasswordValue = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmValue = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (userData.password != passwordConfirm) {
      setMessage({
        msg: 'Las contraseñas no coinciden',
        display: true,
        error: true,
      });
      await new Promise(resolve => setTimeout(resolve, 5000));
      setMessage({
        msg: '',
        error: '',
        display: false,
      });
      setUserData('');
      setPasswordConfirm('');
      return;
    };

    setSpinner(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSpinner(false);

    const resVerify = await verifyPassword(password)

    if (resVerify.error === true) {
      setMessage(resVerify)
      await new Promise(resolve => setTimeout(resolve, 5000));
    } else if (resVerify.error === false) {
      const resUpdate = await updatePassword(userData)
      setMessage(resUpdate)
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
                type="text"
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
                type="text"
                required
                autoComplete="current-password"
                value={userData.password || ''}
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
            <div className="flex items-center justify-between">
              <label htmlFor="password-confirm" className="block text-sm font-medium leading-6 text-gray-900">
                Confirmar Nueva Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password-confirm"
                name="password-confirm"
                type="text"
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
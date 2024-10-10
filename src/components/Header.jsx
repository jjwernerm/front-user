import useAuth from "../hooks/useAuth.jsx";

export default function Header() {

  const { auth, logOut } = useAuth({});

  return (

    <>

      <div className='bg-blue-950 h-16 flex justify-between items-center'>
        <div>
          <p className='text-white ml-2 font-bold'>¡Hola! {auth.name}</p>
        </div>
        <div>
          <button
            type="submit"
            className="text-red-600 mr-2"
            onClick={logOut}
            >Cerrar Sesión</button>
        </div>
      </div>

    </>

  );

};
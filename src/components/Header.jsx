// Importamos el hook personalizado `useAuth` que nos permitirá acceder al contexto de autenticación
import useAuth from "../hooks/useAuth.jsx";

// Definimos el componente funcional Header
export default function Header() {

  // Usamos el hook `useAuth` para obtener el estado de autenticación (`auth`) y la función `logOut` desde el contexto
  // `auth` contiene los datos del usuario y `logOut` es una función para cerrar sesión
  const { auth, logOut } = useAuth({});

  return (

    <>

      <div className='bg-blue-950 h-16 flex justify-between items-center'>
        <div>
          <p className='text-white ml-2 font-bold'>¡Hola! {auth.name}</p>
        </div>
        <div>
          
          {/* Botón que llama a la función `logOut` cuando se hace clic */}
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
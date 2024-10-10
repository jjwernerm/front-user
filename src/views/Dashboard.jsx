import { FaUserCheck } from "react-icons/fa6";
import { FaUserEdit, FaUserTimes } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import Header from '../components/Header.jsx';

export default function Dashboard() {


  return (

    <>

      <Header />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950">Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
            <div className='border rounded-md p-2 shadow shadow-gray-400 cursor-pointer group'>
              <p className='font-bold'>Ver Datos</p>
              <div className='flex items-center'>
                <div className='text-green-600 text-6xl group-hover:scale-110 transition-transform duration-300'>
                  <FaUserCheck />
                </div>
                <div className='text-neutral-500 ml-4 italic text-sm md:text-base'>
                  Consulta tus datos personales como nombres, email, y otros datos adicionales.
                </div>
              </div>
            </div>
            <div className='border rounded-md p-2 shadow shadow-gray-400 cursor-pointer group'>
              <p className='font-bold'>Cambiar Datos</p>
              <div className='flex items-center'>
                <div className='text-blue-600 text-6xl group-hover:scale-110 transition-transform duration-300'>
                  <FaUserEdit />
                </div>
                <div className='text-neutral-500 ml-4 italic text-sm md:text-base'>
                  Edita tus nombres, domicilio y otros datos que sean necesarios.
                </div>
              </div>
            </div>
            <div className='border rounded-md p-2 shadow shadow-gray-400 cursor-pointer group'>
              <p className='font-bold'>Cambiar Contraseña</p>
              <div className='flex items-center'>
                <div className='text-violet-500 text-6xl group-hover:scale-110 transition-transform duration-300'>
                  <TbPasswordUser />
                </div>
                <div className='text-neutral-500 ml-4 italic text-sm md:text-base'>
                  Aquí puedes actualizar tu contraseña, es importante realizarlo periódicamente.
                </div>
              </div>
            </div>
            <div className='border rounded-md p-2 shadow shadow-gray-400 cursor-pointer group'>
              <p className='font-bold'>Eliminar Usuario</p>
              <div className='flex items-center'>
                <div className='text-red-500 text-6xl group-hover:scale-110 transition-transform duration-300'>
                  <FaUserTimes />
                </div>
                <div className='text-neutral-500 ml-4 italic text-sm md:text-base'>
                  Si ya no quieres pertecer a esta plataforma, aquí puedes eliminar tu perfil.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>

  );

};
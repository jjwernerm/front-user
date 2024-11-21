// Importamos `useContext` de React para utilizar el contexto que hemos creado
import { useContext } from 'react';

// Importamos el contexto de autenticación (AuthContext) que contiene la información del usuario y métodos relacionados
import AuthContext from '../context/AuthContext.jsx';

// Creamos un hook personalizado `useAuth` que facilita el acceso al contexto de autenticación
export const useAuth = () => {
  // Usamos el hook `useContext` para obtener el valor del contexto `AuthContext`
  // Esto nos proporciona el estado `auth` y las funciones relacionadas con la autenticación
  return useContext(AuthContext);
};

// Exportamos el hook para que pueda ser utilizado en otros componentes de la aplicación
export default useAuth;

// Este archivo define un hook personalizado, useAuth, que encapsula el uso de useContext para acceder al AuthContext, lo que permite a los componentes acceder a la información de autenticación y a las funciones definidas en dicho contexto, como updateUser, logOut, entre otros.
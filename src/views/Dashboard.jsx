import useAuth from "../hooks/useAuth.jsx";

export default function Dashboard() {

  const { auth } = useAuth({});

  return (

    <>
      <h1>¡Hola {auth.name}!</h1>
    </>

  );

};
// Importamos el componente `Outlet` de `react-router-dom`.
// `Outlet` es utilizado para renderizar las rutas hijas dentro del componente Layout.
import { Outlet } from "react-router-dom";

export default function LayoutPublic() {
  return (
    <>

      <main>
        {/* El componente `Outlet` renderiza el contenido de las rutas hijas */}
        <Outlet />
      </main>

    </>
  )
};
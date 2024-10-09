import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from './context/AuthContext.jsx';

import LayoutPublic from './layout/LayoutPublic.jsx';
import Loging from './views/Loging.jsx';
import Create from './views/Create.jsx';
import ConfirmUser from './views/ConfirmUser.jsx';
import RecoverPasswordEmail from './views/RecoverPasswordEmail.jsx';
import RecoverPasswordToken from './views/RecoverPasswordToken.jsx';
import RecoverPasswordNew from './views/RecoverPasswordNew.jsx';

import LayoutPrivate from './layout/LayoutPrivate.jsx';
import Dashboard from './views/Dashboard.jsx';

import NotFound from './views/NotFound.jsx';
import Footer from './layout/Footer.jsx';

export default function App() {

  return (

    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            {/* <Route path="/update/:id" element={<Update />} /> */}
            {/* <Route path="/delete/:id" element={<Delete />} /> */}


            {/* Public Routes */}
            <Route path='/' element={<LayoutPublic />}>
              <Route index element={<Loging />} />
              <Route path='create' element={<Create />} />
              <Route path="confirm-user/:token" element={<ConfirmUser />} />
              <Route path="recover-password" element={<RecoverPasswordEmail />} />
              <Route path="recover-password/:token" element={<RecoverPasswordToken />} />
              <Route path="recover-password" element={<RecoverPasswordNew />} />

            </Route>

            <Route path='/web-user' element={<LayoutPrivate />}>
              <Route index element={<Dashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />

          </Routes>
        </AuthProvider>
        <Footer />
      </BrowserRouter>
    </>

  );

};
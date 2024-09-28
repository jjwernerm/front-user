import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from './layout/Footer.jsx';

// CRUD
import Create from './views/Create.jsx';
import Loging from './views/Loging.jsx';

// Public Routes
import ConfirmUser from './views/ConfirmUser.jsx';

// Private Routes

// Public Routes
import RecoverPasswordEmail from './views/RecoverPasswordEmail.jsx';
import RecoverPasswordToken from './views/RecoverPasswordToken.jsx';
import RecoverPasswordNew from './views/RecoverPasswordNew.jsx';
import NotFound from './views/NotFound.jsx';

export default function App() {

  return (

    <>
      <BrowserRouter>
        <Routes>

          {/* CRUD */}
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<Loging />} />
          {/* <Route path="/update/:id" element={<Update />} /> */}
          {/* <Route path="/delete/:id" element={<Delete />} /> */}

          {/* Public Routes */}
          <Route path="/confirm-user/:token" element={<ConfirmUser />} />

          {/* Private Routes */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          {/* Public Routes */}
          <Route path="/recover-password" element={<RecoverPasswordEmail />} />
          <Route path="/recover-password/:token" element={<RecoverPasswordToken />} />
          <Route path="/recover-password" element={<RecoverPasswordNew />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>

  );

};
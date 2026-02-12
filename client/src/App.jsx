import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Navbar} from "./components/Navbar";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import { AdminLayout } from "./pages/AdminLayout";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminServices } from "./pages/AdminServices";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminContacts } from "./pages/AdminContacts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </BrowserRouter>
  );
};

export default App;
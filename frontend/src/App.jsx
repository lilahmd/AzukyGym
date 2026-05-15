import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Clases from './pages/Clases';
import MisReservas from './pages/MisReservas';
import MisCuotas from './pages/MisCuotas';
import Inicio from './pages/Inicio';
import Entrenadores from './pages/Entrenadores';
import Rutinas from './pages/Rutinas';

function RutaProtegida({ children }) {
  const { usuario, cargando } = useAuth();
  if (cargando) return <div className="text-center mt-5">Cargando...</div>;
  return usuario ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { usuario } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/login" element={usuario ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/registro" element={usuario ? <Navigate to="/dashboard" /> : <Registro />} />
        <Route path="/dashboard" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
        <Route path="/mis-reservas" element={<RutaProtegida><MisReservas /></RutaProtegida>} />
        <Route path="/mis-cuotas" element={<RutaProtegida><MisCuotas /></RutaProtegida>} />
        <Route path="/entrenadores" element={<Entrenadores />} />
        <Route path="/rutinas" element={<RutaProtegida><Rutinas /></RutaProtegida>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
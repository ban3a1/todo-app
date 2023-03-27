import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ToDo from "./components/ToDo";
import Cookies from "universal-cookie";
import ForgotPassword from "./components/ForgotPassword";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function App() {
  const ProtectedRoute = ({ token, redirectPath = "/" }) => {
    if (!token) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="/todo" element={<ToDo />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

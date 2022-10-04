import { useState } from 'react';
import { useAuth } from "./components/Context";
import { AuthContext } from "./components/Context";
import { ProtectedRoute } from "./components/ProtectedRoute";
import './css/App.css';
import {
  HashRouter,
  NavLink,
  Route,
  Routes,
  Outlet
} from 'react-router-dom';
import Todolist from './pages/todolist';
import Login from './pages/login';
import Register from './pages/register';


// function Layout() {
//   const { token } = useAuth();
//   return (
//     <>
//       {/* <nav>
//         <li>
//           <NavLink to='/'>Home</NavLink>
//         </li>
//         <li>
//           <NavLink to='/signup'>signup</NavLink>
//         </li>
//         <li>
//           <NavLink to='/login'>login</NavLink>
//         </li>
//         {
//           token && <li>
//             <NavLink to='/todo'>todo</NavLink>
//           </li>
//         }
//       </nav> */}
//       <div className="content">
//         <Outlet />
//       </div>
//     </>
//   );
// }
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <div className="container">
      <AuthContext.Provider value={{ token, setToken }}>
        <HashRouter>
          <Routes>
            {/* <Route path="/" element={<Layout />}> */}
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/todo" element={<Todolist />} />
            </Route>
            {/* </Route> */}
          </Routes>
        </HashRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

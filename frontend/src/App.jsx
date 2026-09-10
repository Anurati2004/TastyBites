import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MenuItemDetails from "./pages/MenuItemDetails";
import Register from "./pages/Register";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import MenuItems from "./pages/MenuItems";
import AddMenuItem from "./pages/AddMenuItem";
import EditMenuItem from "./pages/EditMenuItem";
import Users from "./pages/Users";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/menu/:id"
                    element={<MenuItemDetails />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<UserLogin />}
                />

                <Route
                     path="/admin-login"
                     element={<AdminLogin />}
                />

                 <Route
                  path="/dashboard"
                  element={<Dashboard />}
              />


              <Route
                 path="/menu-items"
                 element={<MenuItems />}
              />

              <Route
                path="/menu-items/add"
                element={<AddMenuItem />}
              />

              <Route
               path="/menu-items/edit/:id"
               element={<EditMenuItem />}
              />

              <Route
               path="/users"
               element={<Users />}
              />

              <Route 
              path="/users" 
              element={ <ProtectedRoute> <Users /> </ProtectedRoute> } 
              />
            </Routes>

              
        </BrowserRouter>
    );
}

export default App;
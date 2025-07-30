import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/frontend/Home";
import Contact from "./pages/frontend/contact";
import Features from "./pages/frontend/Features";
import Pricing from "./pages/frontend/Pricing";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/api";
import Dashboard from "./pages/user/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import FilesPage from "./pages/user/FilesPage";
import ProtectedRoute from "./middleware/protectedRoute";
import Plans from "./pages/user/PlansPage";
import Settings from "./pages/user/Settings";
import AdminUsers from "./pages/user/AdminUser";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/features",
          element: <Features />,
        },
        {
          path: "/pricing",
          element: <Pricing />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "files", // ✅ remove `/dashboard/`
          element: <FilesPage />,
        },
        {
          path: "plans", 
          element: <Plans />,
        },
        {
          path: "settings", 
          element: <Settings />,
        },
        {
          path: "admin/users", 
          element: <AdminUsers />,
        }
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;

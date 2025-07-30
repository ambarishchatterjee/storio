import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useReducer, useState } from "react";


export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const [loading, setLoading] = useState(true); // ✅ New loading state

useEffect(() => {
  const verifyTokenWithServer = async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      try {
        const res = await fetch("http://localhost:8001/api/me", {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });

        if (!res.ok) throw new Error("Token invalid");

        dispatch({ type: "LOGIN", payload: user });

      } catch (err) {
        // 🔴 Token is invalid or expired on server
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }
    }
    setLoading(false);
  };

  verifyTokenWithServer();
}, []);

  console.log("AUTH context", state);
  // ✅ Wait for verification before rendering app
  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

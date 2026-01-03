import React from "react";
import {Link, useNavigate} from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    const handleLogout = () =>{
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
        window.location.reload();
    }

    return(
      <nav className="bg-[#004D61] p-4 mb-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">HR System</h1>

                <div className="space-x-4">

                    <Link to="/blog" className="text-white hover:text-indigo-200 transition">
                        Blog
                    </Link>

                    {token ? (
                        <>
                            <Link to="/" className="text-white hover:text-indigo-200 transition">
                                Ver Empleados
                            </Link>
                            <Link to="/nuevo" className="text-white hover:text-indigo-200 transition">
                                Ingresar Empleado
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Salir
                            </button>
                        </>
                    ) : (

                        <>
                            <Link to="/login" className="bg-white text-[#004D61] px-4 py-2 rounded hover:bg-gray-100 transition">
                                Iniciar Sesión
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );


}

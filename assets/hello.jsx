import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import {Lista} from './components/Lista.jsx'
import { ListaFetch } from "./components/ListaFetch.jsx";
import {EmployeeAdd} from "./components/EmployeeAdd.jsx";


const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <nav className="bg-indigo-600 p-4 mb-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold">HR System</h1>
                    <div className="space-x-4">

                        <Link to="/" className="text-white hover:text-indigo-200 transition">
                            Ver Empleados
                        </Link>
                        <Link to="/nuevo" className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100 transition">
                            Ingresar Empleado
                        </Link>
                    </div>
                </div>
            </nav>

            {/*  Rutas definidas */}

            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={<ListaFetch />} />


                    <Route path="/nuevo" element={<EmployeeAdd />} />
                </Routes>
            </div>


        </BrowserRouter>
    </React.StrictMode>





);
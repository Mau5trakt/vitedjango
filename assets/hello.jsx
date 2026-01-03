import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import {Lista} from './components/Lista.jsx'
import { ListaFetch } from "./components/ListaFetch.jsx";
import {EmployeeAdd} from "./components/EmployeeAdd.jsx";
import {BlogLayout} from "./components/BlogLayout.jsx";
import {Login} from "./components/Login.jsx";
import {Header} from "./components/Header.jsx";
import {ProtectedRoute} from "./components/ProtectedRoute.jsx";
import BlogArticle from "./components/BlogArticle.jsx";


const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header/>
            <div className="container mx-auto">
                
                <Routes>

                    <Route element={<ProtectedRoute />} >
                        <Route path="/" element={<ListaFetch />} />
                        <Route path="/nuevo" element={<EmployeeAdd />} />
                        <Route path="/blog" element={<BlogLayout/>} />
                    </Route>

                    <Route path="/login" element={<Login/>} />
                    <Route path="/blog/:slug" element={<BlogArticle/>} />



                </Routes>
            </div>


        </BrowserRouter>
    </React.StrictMode>





);
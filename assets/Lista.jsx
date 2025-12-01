import React from "react";

export const Lista = () => {

    return(
        <>
            <div className="p-4 m-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
                Lista de Empleados
            </h2>
            <ul className="list-disc pl-5 text-gray-600">
                <li>Empleado 1</li>
                <li>Empleado 2</li>
                <li>Empleado 3</li>
            </ul>
            </div>
        </>
    );
}




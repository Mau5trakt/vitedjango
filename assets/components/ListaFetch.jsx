import React, {useState, useEffect} from "react";

export const ListaFetch = () =>{
    const  [employees, setEmployees] = useState([])

    useEffect(() => {
        const fetchEmployees = async () =>{
            try{
                const response = await fetch('/api/employees');

                if (response.ok){
                    const data = await response.json();
                    setEmployees(data);
                    console.log("Datos recibidos:", data);


                } else{
                    console.error("Hubo un problema con la respuesta del servidor")
                }

            } catch (e){
                console.error("Error al hacer el fetch", e)
            }
        }

        fetchEmployees();
    }, []);

    return(
        <>
            <div className="p-4 m-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Lista de Empleados
                </h2>

                <ul className="list-disc pl-5 text-gray-600">
                    {/* 3. Renderizado condicional */}
                    {employees.length === 0 ? (
                        <p>No hay empleados o cargando...</p>
                    ) : (

                        employees.map((employee) => (
                            <li key={employee.id} className="mb-1">

                                {employee.name} - {employee.department} || {employee.salary}
                            </li>
                        ))
                    )}
                </ul>
            </div>

        </>
    );

}
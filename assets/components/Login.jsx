import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {styled} from 'styled-components';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const StyledInput = styled.input`
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid red;
        border-radius: 4px;
        box-sizing: border-box;
        
        &:focus {
            border-color: #007bff;
            outline: none;
        }
    `

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/token', {
                username: username,
                password: password
            });


            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);


            console.log("Login exitoso, redirigiendo...");
            navigate('/blog');

        } catch (error) {
            console.error("Login error:", error);

            setError("Usuario o contraseña incorrectos.");
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Iniciar Sesión</h2>

            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                        disabled={isLoading}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                        disabled={isLoading}
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    style={{ width: '100%', padding: '10px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                    {isLoading ? 'Entrando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
};
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppConfigContext } from '../../context/AppConfigContext';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { backendUrl } = useContext(AppConfigContext);

    const handleRegister = async () => {
        setError('');
        if (!email || !password || !confirmPassword) {
            setError('Email, password, and confirm password must be filled!');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/auth/register`, { email, password });

            if (response.status === 201) {
                navigate('/login');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (e) {
            setError(e.response?.data || 'Server error.');
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Register</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                    <input
                        className={`border ${error ? 'border-red-500' : 'border-blue-600'} rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        type="email"
                        placeholder="Enter your e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                    <input
                        className={`border ${error ? 'border-red-500' : 'border-blue-600'} rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                        className={`border ${error ? 'border-red-500' : 'border-blue-600'} rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <button
                        className={`bg-blue-600 text-white font-bold py-3 px-4 rounded-lg w-full hover:bg-blue-700 transition duration-200 shadow-md transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;

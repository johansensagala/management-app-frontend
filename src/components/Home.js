import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppConfigContext } from '../context/AppConfigContext';
import Navbar from '../layouts/Navbar';

const Home = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { backendUrl } = useContext(AppConfigContext);

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${backendUrl}/api/members`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setMembers(response.data);
                console.log("Fetched members:", response.data);
            } catch (err) {
                setError('Failed to fetch members. You need to login first.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [backendUrl]);

    return (
        <>
            <Navbar />
            <div className="px-6 py-12 md:px-20 bg-gray-100">
                <div className="bg-white shadow-md rounded-lg md:px-12 py-6 mb-8">
                    <h1 className='text-center text-3xl font-bold'>Management Application</h1>
                    {/* Add Member Button */}
                    <Link 
                        to="/add-member" 
                        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Add Member
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-gray-200 animate-pulse rounded-lg p-8 mb-4">
                                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                                <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
                                <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
                                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                            </div>
                        ))} 
                    </div>
                ) : error ? (
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="text-gray-700 text-xl font-semibold">{error}</p>
                    </div>
                ) : members.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {members.map((member) => (
                            <div key={member.id} className="bg-white shadow-lg rounded-lg p-8 mb-4 transition-transform transform hover:shadow-xl">
                                <h5 className="text-xl font-bold">{member.name}</h5>
                                <p className="text-lg text-blue-600 font-semibold">{member.user.email}</p>
                                <p className="text-gray-600">{member.position}</p>
                                <Link to={`/members/${member.id}`} className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                                    Detail
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="text-gray-700 text-xl font-semibold">No members available at the moment.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;

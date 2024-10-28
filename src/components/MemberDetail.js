import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppConfigContext } from '../context/AppConfigContext';
import Navbar from '../layouts/Navbar';

const MemberDetail = () => {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { backendUrl } = useContext(AppConfigContext);

    useEffect(() => {
        const fetchMember = async () => {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${backendUrl}/api/members/${id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setMember(response.data);
                console.log("Fetched member:", response.data);
            } catch (err) {
                setError('Failed to fetch member details. You need to login first.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, [backendUrl, id]);

    return (
        <>
            <Navbar />
            <div className="px-6 py-12 md:px-20 bg-gray-100">
                {loading ? (
                    <div className="bg-white shadow-lg rounded-lg p-8 mb-4 w-1/2 mx-auto animate-pulse">
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                        <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
                        <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
                    </div>
                ) : error ? (
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="text-gray-700 text-xl font-semibold">{error}</p>
                    </div>
                ) : member ? (
                    <div className="bg-white shadow-lg rounded-lg p-8 mb-4 w-1/2 mx-auto">
                        <div className='w-3/4 mx-auto mb-10'>
                            <img src={member.pictureUrl} alt={member.name} className="mt-4 rounded-lg w-full h-auto w-1/2" />
                        </div>
                        <table className="w-full text-lg">
                            <tbody>
                                <tr>
                                    <td className="px-6 py-2 font-semibold">Name:</td>
                                    <td className="px-6 py-2">{member.name}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-2 font-semibold">Email:</td>
                                    <td className="px-6 py-2 text-blue-600">{member.user.email}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-2 font-semibold">Position:</td>
                                    <td className="px-6 py-2">{member.position}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-2 font-semibold">Join from:</td>
                                    <td className="px-6 py-2">{new Date(member.createdAt).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-2 font-semibold">Superior:</td>
                                    <td className="px-6 py-2">{member.superior ? member.superior.name : 'No superior assigned'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="text-gray-700 text-xl font-semibold">Member not found.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default MemberDetail;

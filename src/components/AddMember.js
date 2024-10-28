import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppConfigContext } from '../context/AppConfigContext';
import Navbar from '../layouts/Navbar';

const AddMember = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [userId, setUserId] = useState('');
    const [superiorId, setSuperiorId] = useState('');
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);
    const { backendUrl } = useContext(AppConfigContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsersAndMembers = async () => {
            const token = localStorage.getItem('token');
            try {
                const userResponse = await axios.get(`${backendUrl}/api/auth/users/not-in-members`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setUsers(userResponse.data);

                const memberResponse = await axios.get(`${backendUrl}/api/members`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setMembers(memberResponse.data);
            } catch (err) {
                setError('Failed to fetch users or members. You need to login first.');
                console.error(err);
            }
        };

        fetchUsersAndMembers();
    }, [backendUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        const token = localStorage.getItem('token');
        const formData = new FormData();
        
        const memberData = {
            name,
            position,
            user: {
                id: userId,
                email: users.find(user => user.id === userId)?.email || '',
            },
            superior: superiorId ? { id: parseInt(superiorId, 10) } : null,
        };
    
        formData.append('member', JSON.stringify(memberData));
        formData.append('picture', picture);
    
        try {
            const response = await axios.post(`${backendUrl}/api/members`, formData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Member added:', response.data);
            navigate('/');
        } catch (err) {
            setError('Failed to add member. You need to login first.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-6 py-12 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6 text-center">Add New Member</h1>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-medium mb-2">Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-medium mb-2">Position</label>
                        <select 
                            value={position} 
                            onChange={(e) => setPosition(e.target.value)} 
                            required 
                            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Position</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-medium mb-2">User</label>
                        <select 
                            value={userId} 
                            onChange={(e) => setUserId(e.target.value)} 
                            required 
                            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-medium mb-2">Superior</label>
                        <select 
                            value={superiorId} 
                            onChange={(e) => setSuperiorId(e.target.value)} 
                            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Superior (Optional)</option>
                            {members.map(member => (
                                <option key={member.id} value={member.id}>{member.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-medium mb-2">Profile Picture</label>
                        <input 
                            type="file" 
                            onChange={(e) => setPicture(e.target.files[0])} 
                            required 
                            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button 
                            type="submit" 
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Member'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddMember;

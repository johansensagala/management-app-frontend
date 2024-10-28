import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import AddMember from './components/AddMember';
import Home from './components/Home';
import MemberDetail from './components/MemberDetail';
import Login from './components/auth/Login';
import Register from './components/auth/Register.js';
import { AppConfigProvider } from './context/AppConfigContext';

const App = () => {
    return (
        <AppConfigProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='' element={<Home />} />
                    <Route path='/members/:id' element={<MemberDetail />} />
                    <Route path="/add-member" element={<AddMember />} />
                </Routes>
            </BrowserRouter>
        </AppConfigProvider>
    );
}

export default App;

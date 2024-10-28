import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 py-6 px-8" role="navigation" aria-label="main navigation">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/" className="text-white text-4xl font-bold mr-2">Management</Link>
                    <p className="text-white text-4xl font-light">App</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

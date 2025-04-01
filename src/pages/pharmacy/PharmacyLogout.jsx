import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../service/GlobalState";

const Logout = () => {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUser()); 
        localStorage.removeItem("authToken");
        navigate("/pharmacy-login"); 
    };

    return (
        <div className="sidebar">
            <button onClick={() => setShowLogoutConfirm(true)} className="logout-btn">
                Logout
            </button>

            {showLogoutConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-medium">Do you want to logout?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;

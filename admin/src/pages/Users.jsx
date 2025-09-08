import { useEffect, useState } from "react";
import { getAllUsersData } from "../services/user";
import { showLoader, hideLoader } from "../features/loaderSlice";
import { useDispatch } from "react-redux";

export default function Users() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const fetchUsers = async () => {
        try {
            dispatch(showLoader());
            const data = await getAllUsersData();
            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">All Users</h2>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Mobile No</th>
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id || index}>
                            <td className="px-4 py-2 border">{index + 1}</td>
                            <td className="px-4 py-2 border">{user.username}</td>
                            <td className="px-4 py-2 border">{user.email || "NA"}</td>
                            <td className="px-4 py-2 border">{user.mobileNo || "NA"}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => handleBlockUser(user._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Block
                                </button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center p-4">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

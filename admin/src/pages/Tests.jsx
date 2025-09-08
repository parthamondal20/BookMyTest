import { useState, useEffect } from "react";
import { getTests } from "../services/test.js";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { editTest, addTest, deleteTest } from "../services/test.js";
import { showLoader, hideLoader, setMsg } from "../features/loaderSlice";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { showSuccess, showError } from "../utils/toast.js";

export default function Test() {
    const [tests, setTests] = useState([]);
    const [testForm, setTestForm] = useState({
        testname: "",
        description: "",
        shortDescription: "",
        preparation: "",
        image: "",
        price: "",
        duration: "",
        category: "",
        lab: "",
    });
    const [openEditForm, setOpenEditForm] = useState(false);
    const [editingTestId, setEditingTestId] = useState(null); // track which test is being edited
    const [deletingTestId, setDeletingTestId] = useState(null); // track which test is being edited
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const fetchAllTests = async () => {
        try {
            const data = await getTests();
            setTests(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllTests();
    }, []);

    const handleChange = (e) => {
        setTestForm({ ...testForm, [e.target.name]: e.target.value });
    };

    const handleEdit = (test) => {
        setTestForm(test); // prefill form with test data
        setEditingTestId(test._id);
        setOpenEditForm(true);
    };

    const handleAdd = () => {
        setTestForm({
            testname: "",
            description: "",
            shortDescription: "",
            preparation: "",
            image: "",
            price: "",
            duration: "",
            category: "",
            lab: "",
        });
        setEditingTestId(null);
        setOpenEditForm(true);
    };

    const handleDelete = async () => {
        dispatch(showLoader());
        dispatch(setMsg("Deleting test..."));
        try {
            await deleteTest(deletingTestId);
            setTests((prev) => prev.filter((t) => t._id !== deletingTestId))
        } catch (error) {
            showError("Falied to delte test");
            console.log(error);
        } finally {
            showSuccess("Test deleted successfully");
            dispatch(hideLoader());
        }
        setDeleteConfirm(false);
        setDeletingTestId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTestId) {
            dispatch(showLoader());
            dispatch(setMsg("Updating.."));
            try {
                const updatedTest = await editTest(testForm, editingTestId);
                setTests((prevTests) =>
                    prevTests.map((t) =>
                        t._id === editingTestId ? updatedTest : t
                    )
                );
            } catch (error) {
                showError("Falied to edit test");
                console.log(error);
            } finally {
                showSuccess("Test edited successfully");
                dispatch(hideLoader());
            }
        } else {
            dispatch(showLoader());
            dispatch(setMsg("Adding new test.."));
            try {
                const newTest = await addTest(testForm);
                setTests(prev => [...prev, newTest]);
            } catch (error) {
                showError("Failed to add test");
                console.log(error);
            } finally {
                showSuccess("Test added successfully");
                dispatch(hideLoader());
            }
        }
        setOpenEditForm(false);
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <Loader />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">🧪 All Tests</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
                >
                    <Plus className="w-5 h-5" />
                    Add Test
                </button>
            </div>

            {/* Edit / Add Form */}
            {openEditForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="animate-fadeInScale w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl relative max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                {editingTestId ? "✏️ Edit Test" : "➕ Add New Test"}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setOpenEditForm(false)}
                                className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scrollable form */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex-1 overflow-y-auto px-6 py-4 space-y-5"
                        >
                            {[
                                { name: "testname", label: "Test Name", type: "text" },
                                { name: "description", label: "Description", type: "textarea" },
                                { name: "shortDescription", label: "Short Description", type: "text" },
                                { name: "preparation", label: "Preparation", type: "text" },
                                { name: "image", label: "Image URL", type: "text" },
                                { name: "price", label: "Price", type: "number" },
                                { name: "duration", label: "Duration", type: "text" },
                                { name: "category", label: "Category", type: "text" },
                                { name: "lab", label: "Lab", type: "text" },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                                        {field.label}
                                    </label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            name={field.name}
                                            value={testForm[field.name] || ""}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={testForm[field.name] || ""}
                                            onChange={handleChange}
                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                    )}
                                </div>
                            ))}
                        </form>

                        {/* Footer with buttons (sticky at bottom) */}
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-b-2xl">
                            <button
                                type="button"
                                onClick={() => setOpenEditForm(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="px-6 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md transition"
                            >
                                {editingTestId ? "Update Test" : "Save Test"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                            ⚠️ Delete Confirmation
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-1">Are you sure you want to delete this test?</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">You can't undo this action.</p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setDeleteConfirm(false)}
                                className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-medium transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tests Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wide">
                        <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.length > 0 ? (
                            tests.map((test, index) => (
                                <tr
                                    onClick={() => navigate(`/test-details/${test._id}`)}
                                    key={test._id}
                                    className={`border-t border-gray-200 dark:border-gray-600 cursor-pointer ${
                                        index % 2 === 0 
                                            ? "bg-gray-50 dark:bg-gray-700/50" 
                                            : "bg-white dark:bg-gray-800"
                                    } hover:bg-blue-50 dark:hover:bg-blue-900/20 transition`}
                                >
                                    {/* Image */}
                                    <td className="px-4 py-3">
                                        <img
                                            src={test.image || "https://via.placeholder.com/60"}
                                            alt={test.testname}
                                            className="w-14 h-14 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                                        />
                                    </td>
                                    {/* Name */}
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                                        {test.testname}
                                    </td>
                                    {/* Category */}
                                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{test.category}</td>
                                    {/* Price */}
                                    <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                                        ₹{test.price}
                                    </td>
                                    {/* Actions */}
                                    <td
                                        className="px-4 py-3 flex justify-center gap-3"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            onClick={() => handleEdit(test)}
                                            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setDeletingTestId(test._id);
                                                setDeleteConfirm(true)
                                            }}
                                            className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No tests found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
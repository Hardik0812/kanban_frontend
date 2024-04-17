import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addProject, updateProject } from "../../redux/slices/projectSlice";

Modal.setAppElement('#root');

const ProjectModal = ({ isModalOpen, handleCloseModal, currentProject, setCurrentProject }) => {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
        };

        if (currentProject && currentProject.id) {
            await dispatch(updateProject({ ...data, id: currentProject.id }));
        } else {
            await dispatch(addProject(data));
        }
        handleCloseModal();
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Project Form"
            className="fixed inset-0 mx-auto my-auto p-5 overflow-auto rounded-lg bg-white outline-none max-w-lg w-auto h-[450px]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="bg-white rounded shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-center">
                    {currentProject?.id ? "Edit Project" : "Add Project"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        defaultValue={currentProject?.title || ""}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-customGreen"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        defaultValue={currentProject?.description || ""}
                        required
                        className="w-full p-3 border border-gray-300 rounded h-40 focus:outline-none focus:ring focus:ring-customGreen"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-customGreen text-white px-4 py-2 rounded hover:bg-white hover:text-customGreen transition duration-200"
                        >
                            {currentProject?.id ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ProjectModal;

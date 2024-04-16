import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Tippy from "@tippyjs/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  projectList,
  addProject,
  updateProject,
  deleteProject,
} from "../../redux/slices/projectSlice";

import "tippy.js/dist/tippy.css";

Modal.setAppElement("#root");

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projectList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(projectList());
    }
  }, [dispatch, projects.length]);

  const handleOpenAddModal = () => {
    setCurrentProject({ title: "", description: "" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProject = (projectId) => {
    console.log("projectId", projectId);
    dispatch(deleteProject(projectId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
    };

    if (currentProject.id) {
      await dispatch(updateProject({ ...data, id: currentProject.id }));
    } else {
      await dispatch(addProject(data));
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-lg font-semibold mb-6">Project List</h1>
      <button
        onClick={handleOpenAddModal}
        className="mb-4 shadow-lg flex items-center bg-customGreen text-white px-3 py-1 rounded hover:bg-white hover:text-customGreen transition duration-200 ease-in-out"
      >
        <FaPlus className="mr-2" /> Add Project
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Project Form"
        className="absolute inset-0 mx-auto my-auto max-w-4xl p-5 overflow-auto rounded-lg bg-white outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
          },
          zIndex: "9999999",
        }}
      >
        <h2 className="text-xl font-bold mb-4">
          {currentProject?.id ? "Edit Project" : "Add Project"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            name="title"
            type="text"
            placeholder="Title"
            defaultValue={currentProject?.title || ""}
            required
            className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            defaultValue={currentProject?.description || ""}
            required
            className="p-2 mb-4 border border-gray-300 rounded h-40 focus:outline-none focus:ring-2 focus:ring-green-500"
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
      </Modal>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {project.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.created_by}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.created_at}
                </td>
                <td className="px-6 py-4 text-center text-sm font-medium">
                  <Tippy content="Edit Project">
                    <button
                      onClick={() => handleOpenEditModal(project)}
                      className="text-customGreen hover:text-green-900 mr-2"
                    >
                      <FaEdit size={18} />
                    </button>
                  </Tippy>
                  <Tippy content="Delete Project">
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-customGreen hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </Tippy>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;

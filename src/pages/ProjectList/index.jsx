import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  projectList,
  deleteProject,
} from "../../redux/slices/projectSlice";

import "tippy.js/dist/tippy.css";
import ProjectModal from "../../components/ProjectModel";

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
    dispatch(deleteProject(projectId));
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
      <ProjectModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />
      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created By
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                  {project.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm  text-center text-gray-500">
                  {project.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {project.created_by}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {project.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center items-center space-x-2">
                  <Tippy content="Edit Project">
                    <button
                      onClick={() => handleOpenEditModal(project)}
                      className="text-customGreen hover:text-green-800 mr-2"
                    >
                      <FaEdit size={18} />
                    </button>
                  </Tippy>
                  <Tippy content="Delete Project">
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-customGreen hover:text-red-400"
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

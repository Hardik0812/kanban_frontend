import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
  createAction,
} from "@reduxjs/toolkit";
import { ProjectApi } from "../../services/apis/ProjectApis";
import { Toast } from "../../utils/Toasts";

export const initialState = {
  loading: false,
  projectList: [],
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || action.error.message;
};

const handleFulfilled = (state, action) => {
  state.loading = false;

  if (action.type.startsWith("project/projectList")) {
    state.projectList = action.payload?.data;
  }

  if (action.type.startsWith("project/add")) {
    state.projectList.push(action.payload);
  }

  if (action.type.startsWith("project/update")) {
    const index = state.projectList.findIndex(
      (project) => project.id === action.payload.id
    );
    if (index !== -1) {
      state.projectList[index] = action.payload;
    }
  }

  if (action.type.startsWith("project/delete")) {
    state.projectList = state.projectList.filter(
      (project) => project.id !== action.payload
    );
  }
};

export const projectList = createAsyncThunk(
  "project/projectList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ProjectApi.get();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addProject = createAsyncThunk(
  "project/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ProjectApi.create(data);
      Toast.success("Project added successfully!");
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/update",
  async (data, { rejectWithValue }) => {
    try {
      const updateData = {
        title: data.title,
        description: data.description,
      };
      const response = await ProjectApi.update(updateData, data.id);
      Toast.success("Project updated successfully!");
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/delete",
  async (projectId, { rejectWithValue }) => {
    console.log(projectId);
    try {
      await ProjectApi.delete(projectId);
      Toast.success("Project deleted successfully!");
      return projectId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.error = null;
      state.projectList = [];
    },
    resetApp: () => { },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, handlePending)
      .addMatcher(isRejected, handleRejected)
      .addMatcher(isFulfilled, handleFulfilled);
  },
});

export const resetApp = createAction("resetApp");
export const { clearError, logout } = projectSlice.actions;
export default projectSlice.reducer;

import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";

const rootReducer = {
  auth: authReducer,
  project: projectReducer,
};

export default rootReducer;

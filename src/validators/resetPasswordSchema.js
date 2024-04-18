import * as yup from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=\[\]{};':".,<>?|\\]).{8,}$/;

const resetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .matches(
        passwordRegex,
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one special character"
      )
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

export default resetPasswordSchema;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthLayout from "../../layout/AuthLayout";
import InputWithIcon from "../../components/InputWithIcon";
import signInSchema from "../../validators/signInSchema";

import { ReactComponent as EmailSvg } from "../../assets/email.svg";
import { ReactComponent as PasswordSvg } from "../../assets/password.svg";
import { useUnauth } from "../../hooks/useAuth";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import { signin } from "../../redux/slices/authSlice";
import { Toast } from "../../utils/Toasts";

const SignIn = () => {
  useUnauth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    dispatch(signin(data)).then((response) => {
      setLoading(false);
      if (
        response.payload.success === "True" ||
        response.payload.success === true
      ) {
        localStorage.setItem("full_name", response?.payload?.data?.userData?.full_name);
        localStorage.setItem("accessToken", response?.payload?.data?.access);
        Toast.success(response.payload.message);
        navigate("/project");
      }
    });
  };
  return (
    <AuthLayout>
      <div className="col-span-7 sm:col-span-3 bg-white text-customGreen flex justify-center items-center sm:items-start flex-col h-screen order-0 sm:order-1 px-3 sm:px-0">
        <div className="w-full max-w-[430px] pl-[0px] sm:ml-[40px] lg:ml-[140px] pr-0 md:pr-10 xl:pr-0">
          <div className="mb-8">
            <h1 className="text-lg text-center sm:text-left font-extrabold mb-2">
              Sign In
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputWithIcon
              icon={EmailSvg}
              placeholder="Email Address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <InputWithIcon
              icon={PasswordSvg}
              placeholder="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
            <p className="text-sm text-end text-customGreen  ">
              <span
                className="cursor-pointer"
                onClick={() => navigate("/forgot-password")}
              >
                {" "}
                Forgot Password?
              </span>
            </p>
            <ButtonWithLoader isLoading={loading} disabled={loading}>
              Sign In
            </ButtonWithLoader>{" "}
          </form>
          <p className="mt-8 text-sm ">
            By signing up, you agree to the{" "}
            <Link to="#" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="my-10 border-t border-gray-400 text-sm text-center"></p>
          <p className="text-sm font-semibold text-center sm:text-left">
            <Link
              to="/signup"
              className="underline text-customGreen text-center sm:text-left "
            >
              Sign up
            </Link>
            &nbsp;If you don’t have an account
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;

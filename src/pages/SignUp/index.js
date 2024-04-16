import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { ReactComponent as BackArrow } from "../../assets/back.svg";
import { ReactComponent as EmailSvg } from "../../assets/email.svg";
import { ReactComponent as PasswordSvg } from "../../assets/password.svg";

import AuthLayout from "../../layout/AuthLayout";
import InputWithIcon from "../../components/InputWithIcon";

import signUpSchema from "../../validators/signUpSchema";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import { useUnauth } from "../../hooks/useAuth";
import { checkEmailExists, sendOtp } from "../../redux/slices/authSlice";
import { Toast } from "../../utils/Toasts";

const SignUp = () => {
  useUnauth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const checkEmail = async (data) => {
    dispatch(checkEmailExists({ email: data.email })).then((response) => {
      if (
        response.payload.success === "True" ||
        response.payload.success === true
      ) {
        sendCodeToEmail(data);
      }
    });
  };

  const sendCodeToEmail = async (data) => {
    dispatch(sendOtp({ email: data.email })).then((response) => {
      if (
        response.payload.success === "True" ||
        response.payload.success === true
      ) {
        Toast.success(response.payload.message);
        setTimeout(() => {
          navigate("/verify-code", {
            state: {
              data,
              expires: response.payload?.data[0].expires,
            },
          });
        }, 1500);
      }
    });
  };

  return (
    <AuthLayout>
      <div className="col-span-7 sm:col-span-3 bg-white text-customGreen flex justify-center items-center sm:items-start flex-col h-screen order-0 sm:order-1 px-3 sm:px-0">
        <div className="w-full max-w-[430px] pl-[0px] sm:ml-[40px] lg:ml-[140px] pr-0 md:pr-10 xl:pr-0">
          <div className="mb-8">
            <button className="mb-4" onClick={() => navigate(-1)}>
              <BackArrow />
            </button>
            <h1 className="text-lg text-center sm:text-left font-extrabold mb-2">
              Sign Up
            </h1>
          </div>
          <form onSubmit={handleSubmit(checkEmail)} className="px-2 sm:px-0">
            <InputWithIcon
              icon={EmailSvg}
              placeholder="Full Name"
              type="text"
              {...register("full_name")}
              error={errors.full_name?.message}
            />
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
            <InputWithIcon
              icon={PasswordSvg}
              placeholder="Confirm Password"
              type="password"
              {...register("confirm_password")}
              error={errors.confirm_password?.message}
            />
            <ButtonWithLoader isLoading={loading} disabled={loading}>
              Sign Up
            </ButtonWithLoader>
          </form>
          <p className="mt-8 text-sm">
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

          <p className="my-10 border-t border-gray-400 text-sm text-center mt-5"></p>
          <p className="text-sm font-semibold">
            <Link to="/" className="underline text-customGreen">
              {""}
              Sign in{""}
            </Link>
            {""}
            &nbsp;If you have an account
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

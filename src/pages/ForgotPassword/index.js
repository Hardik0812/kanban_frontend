import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as BackArrow } from "../../assets/back.svg";
import { ReactComponent as EmailSvg } from "../../assets/email.svg";
import AuthLayout from "../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import InputWithIcon from "../../components/InputWithIcon";
import { Toast } from "../../utils/Toasts";
import forgotPasswordSchema from "../../validators/forgotPasswordSchema";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import { forgotPassword } from "../../redux/slices/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    dispatch(forgotPassword(data)).then((response) => {
      if (
        response.payload.success === "True" ||
        response.payload.success === true
      ) {
        Toast.success(response.payload.message);
      }
    });
  };

  return (
    <AuthLayout>
      <div className="col-span-7 sm:col-span-3 bg-white text-customGreen flex justify-center items-center sm:items-start flex-col h-screen order-0 sm:order-1 px-3 sm:px-0">
        <div className="w-full max-w-[430px] pl-[0px] sm:ml-[40px] 2xl:ml-[140px] pr-0 md:pr-10 xl:pr-0">
          <div className="mb-8">
            {" "}
            <button className="mb-4" onClick={() => navigate(-1)}>
              <BackArrow />
            </button>
            <h1 className="text-lg text-center sm:text-left font-extrabold mb-2">
              Forgot Password
            </h1>
            <p className="text-sm text-center lg:text-left ">
              Enter the email address associated with your account.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputWithIcon
              icon={EmailSvg}
              placeholder="Email Address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <ButtonWithLoader isLoading={loading} disabled={loading}>
              Submit
            </ButtonWithLoader>
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
          <p className="text-sm font-semibold text-center lg:text-left">
            <Link
              to="/signup"
              className="underline text-customGreen text-center sm:text-left "
            >
              {""}
              Sign up{""}&nbsp;
            </Link>{" "}
            If you don’t have an account
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;

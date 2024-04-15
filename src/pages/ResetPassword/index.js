import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as BackArrow } from "../../assets/back.svg";
import { ReactComponent as PasswordSvg } from "../../assets/password.svg";
import AuthLayout from "../../layout/AuthLayout";
import InputWithIcon from "../../components/InputWithIcon";
import resetPasswordSchema from "../../validators/resetPasswordSchema";
import { Toast } from "../../utils/Toasts";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import { resetPassword } from "../../redux/slices/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toastShownRef = useRef(false);
  const { loading } = useSelector((state) => state.auth);

  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token && !toastShownRef.current) {
      Toast.error("Token is missing or invalid.");
      toastShownRef.current = true;
      setTimeout(() => navigate("/forgot-password"), 1000);
    } else {
      setToken(token);
    }
  }, [navigate, location.search]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      token,
    };
    dispatch(resetPassword(updatedData)).then((response) => {
      if (
        response.payload.success === "True" ||
        response.payload.success === true
      ) {
        Toast.success(response.payload.message);
        setTimeout(() => navigate("/"), 1500);
      }
    });
  };

  return (
    <AuthLayout>
      <div className="col-span-7 sm:col-span-3  bg-black text-white flex justify-center items-center sm:items-start flex-col h-screen order-0 sm:order-1 px-3 sm:px-0">
        <div className="w-full max-w-[430px] pl-[0px] sm:ml-[40px] 2xl:ml-[140px] pr-0 md:pr-10 xl:pr-0">
          <div className="mb-8">
            <button className="mb-4" onClick={() => navigate(-1)}>
              <BackArrow />
            </button>
            <h1 className="text-lg text-center sm:text-left font-extrabold mb-2">
              Reset Password
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputWithIcon
              icon={PasswordSvg}
              placeholder="New Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
            <InputWithIcon
              icon={PasswordSvg}
              placeholder="Confirm New Password"
              type="confirm_password"
              {...register("confirm_password")}
              error={errors.confirm_password?.message}
            />
            <ButtonWithLoader isLoading={loading} disabled={loading}>
              Reset
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

          <p className="my-10 border-t border-gray-400 text-sm text-center"></p>
          <p className="text-sm font-semibold">
            <Link to="/" className="underline text-customGreen">
              {""}
              Sign in{""}
            </Link>{" "}
            &nbsp;If you have an account
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;

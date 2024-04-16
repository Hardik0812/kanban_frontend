import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as BackArrow } from "../../assets/back.svg";
import AuthLayout from "../../layout/AuthLayout";
import { Toast } from "../../utils/Toasts";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import CountDownTimer from "../../components/CountDownTImer";
import { sendOtp, signup, verifyOtp } from "../../redux/slices/authSlice";

const VerifyCode = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const [OTP, setOTP] = useState("");
  const [expiryTime, setExpiryTime] = useState(location.state?.expires || 0);

  useEffect(() => {
    if (!location.state || !location.state.data || !location.state?.expires) {
      navigate("/signup");
    }
  }, [location.state, navigate]);

  if (!location.state || !location.state.data || !location.state?.expires) {
    return null;
  }

  function handleChange(OTP) {
    setOTP(OTP);
  }

  const validateOtp = (otp) => {
    return /^\d{6}$/.test(otp);
  };

  const handleResendCode = async () => {
    dispatch(
      sendOtp({
        email: location.state.data.email,
      })
    ).then((response) => {
      if (
        response.payload.success === "True" ||
        response.payload.success === true
      ) {
        Toast.success(response.payload.message);
        setExpiryTime(response.payload.data[0].expires);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateOtp(OTP)) {
      Toast.error("Invalid Code format. Please enter a 6-digit Code.");
      return;
    }

    dispatch(
      verifyOtp({
        otp: OTP,
        email: location.state.data.email,
      })
    ).then((response) => {
      if (
        response.payload.success === "True" ||
        response.payload.success === true
      ) {
        dispatch(signup(location.state.data)).then((signupResponse) => {
          if (
            response.payload.success === "True" ||
            response.payload.success === true
          ) {
            Toast.success(signupResponse.payload.message);
            navigate("/");
          }
        });
      }
    });
  };

  return (
    <AuthLayout>
      <div className="col-span-7 lg:col-span-3 bg-white text-customGreen flex justify-center items-center sm:items-start flex-col h-screen order-0 sm:order-1 px-3 sm:px-0">
        <div className="w-full max-w-[430px] pl-[0px] sm:ml-[40px] lg:ml-[140px] pr-0 md:pr-10 xl:pr-0">
          <div className="mb-8 ">
            <button className="mb-4" onClick={() => navigate(-1)}>
              <BackArrow />
            </button>
            <h1 className="text-lg text-center lg:text-left font-extrabold mb-2">
              Verify Code
            </h1>
            <p className="text-sm ">Verify your Email Address, Enter Code</p>
          </div>
          <form onSubmit={handleSubmit} className="text-center">
            <OTPInput
              className="p-2 bg-transparent"
              value={OTP}
              onChange={handleChange}
              numInputs={6}
              inputStyle={
                {
                  // background: "transparent",
                  // padding: "10px",
                  // color: "#fff",
                }
              }
              skipDefaultStyles
              renderSeparator={<span className="mr-2"> </span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="p-4 border bg-transparent border-[#312E36] rounded-lg focus:outline-none w-full focus:border-customGreen text-center"
                />
              )}
            />

            <ButtonWithLoader
              isLoading={loading}
              disabled={loading || !OTP || OTP.length < 6}
            >
              Verify
            </ButtonWithLoader>
            <CountDownTimer expires={expiryTime} onResend={handleResendCode} />
          </form>
          <p className="mt-12 text-sm ">
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
              {""}
              Sign up{""}
            </Link>{" "}
            &nbsp;If you don’t have an account
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyCode;

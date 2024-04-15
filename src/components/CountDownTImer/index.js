import React from "react";

const CountDownTimer = ({ expires, onResend }) => {
  return (
    <div className="mt-[20px] text-sm">
      <p>
        Didn't get the code?{" "}
        <span
          className="cursor-pointer text-customGreen hover:text-customGreen"
          onClick={onResend}
        >
          Resend
        </span>
      </p>
    </div>
  );
};

export default CountDownTimer;

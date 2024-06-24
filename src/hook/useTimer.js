import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useTimer = (initialTime, toastMessage, isSubmitted) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if(isSubmitted) {
        clearInterval(interval);
        return
      }
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
          toast.error(toastMessage);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, isSubmitted]);

  return timeLeft;
};

export default useTimer;

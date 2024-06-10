import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../../redux/actions/auth";

const NonProtected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile(navigate, "/", null));
  }, [dispatch, navigate]);

  return children;
};

export default NonProtected;

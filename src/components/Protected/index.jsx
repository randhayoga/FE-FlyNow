import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../../redux/actions/auth";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // get user profile if we have token
    dispatch(profile(navigate, null, "/login"));
  }, [dispatch, navigate]);

  return children;
};
export default Protected;

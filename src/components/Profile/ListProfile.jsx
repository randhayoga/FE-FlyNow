import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/auth";

import { FiLogOut } from "react-icons/fi";
import { TbPasswordUser } from "react-icons/tb";
import { FiEdit3 } from "react-icons/fi";

const ListProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const ResetPasswordPage = () => {
    navigate("/reset-password/:token");
  };

  return (
    <div>
      <button className="border-b-2 w-full flex items-center p-2">
        <FiEdit3
          className="w-6 h-6 mr-2 text-primary "
          style={{ color: "#30628C" }}
        />

        <span className="text-base font-semibold">Ubah Profil</span>
      </button>
      <button
        className="border-b-2 w-full flex items-center p-2"
        onClick={ResetPasswordPage}
      >
        <TbPasswordUser
          className="w-6 h-6 mr-2 text-primary "
          style={{ color: "#30628C" }}
        />
        <Link></Link>
        <span className="text-base font-semibold">Reset Kata Sandi</span>
      </button>
      <button
        type="button"
        className="border-b-2 w-full flex items-center p-2"
        onClick={handleLogout}
      >
        <FiLogOut className="w-6 h-6 mr-2 " style={{ color: "#30628C" }} />

        <span className="text-base font-semibold ">Keluar</span>
      </button>
    </div>
  );
};

export default ListProfile;

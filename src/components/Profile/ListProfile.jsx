import { VerifiedIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/actions/auth";

import { FiEdit3, FiLogOut } from "react-icons/fi";
import { TbPasswordUser } from "react-icons/tb";

const ListProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const ResetPasswordPage = () => {
    navigate("/reset-password");
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
      {user.isVerified ? (
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
      ) : null}
      {user.isVerified ? null : (
        <Link
          to="/otp"
          state={{ email: user.email }}
          className="border-b-2 w-full flex items-center p-2 text-primary"
        >
          <VerifiedIcon className="mr-2" stroke="#30628C" />
          <span className="text-base font-semibold">Verifikasi Akun</span>
        </Link>
      )}
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

import logoImg from "@/assets/images/FlyNow-logo.svg";
import logoIn from "@/assets/images/navbar In.svg";
import bellRing from "@/assets/images/fi_bell.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout, profile } from "../../../redux/actions/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(profile(null, null, null));
  }, [dispatch, token]);

  const handleLogin = () => {
    navigate("/login"); // Navigasi ke halaman login saat tombol "Masuk" diklik
  };

  return (
    <nav className="bg-white dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-lg rounded-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logoImg} alt="FlyNow Logo" className="w-14 py-1" />
        </a>
        {user ? (
          <div className="flex md:order-2 space-x-4 md:space-x-6 rtl:space-x-reverse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <img src={bellRing} alt="bellRing" className="w-5 mr-3" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src={user?.image}
                  alt="profile"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex items-center text-white bg-[#30628C] hover:bg-[#20496C] focus:ring-4 focus:outline-none focus:ring-[#20496C] font-medium rounded-lg text-sm px-3 py-2 text-center shadow-md"
              onClick={handleLogin}
            >
              <img src={logoIn} alt="FlyNow Logo" className="w-5" />
              <div className="flex items-center ml-3 mr-1">Masuk</div>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;

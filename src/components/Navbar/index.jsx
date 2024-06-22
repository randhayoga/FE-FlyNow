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

  const handleHistory = () => {
    navigate("/history");
  };
  return (
    <div className="border-b-2 shadow-md rounded-md">
      <nav className="container bg-white">
        <div className="sm:max-w-screen- flex flex-wrap items-center justify-between mx-auto">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logoImg} alt="FlyNow Logo" className="w-14 py-1" />
          </button>
          <div className="flex items-center md:order-2 space-x-5 rtl:space-x-reverse">
            {user ? (
              <>
                <button type="button" className="" onClick={handleHistory}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </button>
                <img src={bellRing} alt="Notifications" className="w-5 " />
                {/* <DropdownMenu>
                  <DropdownMenuTrigger> */}

                <Link to="/profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </Link>
                {/* </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
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
                </DropdownMenu> */}
              </>
            ) : (
              <button
                type="button"
                className="flex items-center text-white bg-[#30628C] hover:bg-[#20496C] focus:ring-4 focus:outline-none focus:ring-[#20496C] font-medium rounded-lg text-sm px-3 py-2 text-center shadow-md"
                onClick={handleLogin}
              >
                <img src={logoIn} alt="Login" className="w-5" />
                <div className="flex items-center ml-3 mr-1">Masuk</div>
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;

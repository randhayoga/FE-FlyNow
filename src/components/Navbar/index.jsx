import logoImg from "@/assets/images/FlyNow-logo.svg";
import logoIn from "@/assets/images/navbar In.svg";

const navbarComponent = () => {
  return (
    <>
      <nav className="bg-white dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-lg rounded-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logoImg} alt="FlyNow Logo" className="w-18" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex items-center text-white bg-[#30628C] hover:bg-[#20496C] focus:ring-4 focus:outline-none focus:ring-[#20496C] font-medium rounded-lg text-sm px-3 py-2 text-center shadow-md"
            >
              <img src={logoIn} alt="FlyNow Logo" className="w-5" />
              <div className="flex items-center ml-3 mr-1">Masuk</div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default navbarComponent;

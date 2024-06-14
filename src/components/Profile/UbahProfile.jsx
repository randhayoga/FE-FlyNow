const UbahProfile = () => {
  return (
    <div className="w-auto  max-w-sm p-4 mt-10 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" action="#">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Ubah Data Profil
        </h1>
        <div className="border rounded-t-xl h-8 text-white bg-ColorPrimary">
          {" "}
          <span className="ml-6">Data Diri</span>
        </div>
        <div>
          <label
            htmlFor="nama"
            className="block mb-1 text-sm font-bold  text-ColorPrimary"
          >
            {/* <img
              class="w-24 h-24 mb-3 rounded-full shadow-lg ml-24"
              src="/docs/images/people/profile-picture-3.jpg"
              alt=""
            /> */}
            Nama Lengkap
          </label>
          <input
            type="text"
            name="nama"
            id="nama"
            className="bg-white-50 border border-white-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Prakash"
            required
          />
        </div>
        <div>
          <label
            htmlFor="nomorTefl"
            className="block mb-1 text-sm font-bold  text-ColorPrimary"
          >
            Nomor Telpon
          </label>
          <input
            type="nomorTefl"
            name="nomorTefl"
            id=""
            placeholder="08211234456"
            className="bg-white-50 border border-white-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-bold  text-ColorPrimary"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="prakashfilemon@gmail.com"
            className="bg-white-50 border border-white-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-ColorPrimary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default UbahProfile;

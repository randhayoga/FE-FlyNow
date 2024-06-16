const UbahProfile = () => {
  return (
    <div className="w-4/5 max-w-lg p-4 mt-8 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
      <form className="space-y-2" action="#">
        <h1 className="text-2xl font-bold text-gray-900">Ubah Data Profil</h1>

        <div className="border rounded-t-xl h-8 text-white bg-color-primary flex items-center">
          <span className="ml-6">Data Diri</span>
        </div>
        <div>
          <label
            htmlFor="nama"
            className="block mb-1 text-sm font-bold text-color-primary"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            name="nama"
            id="nama"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder="Harry"
            required
          />
        </div>
        <div>
          <label
            htmlFor="nomorTefl"
            className="block mb-1 text-sm font-bold text-color-primary"
          >
            Nomor Telpon
          </label>
          <input
            type="text"
            name="nomorTefl"
            id="nomorTefl"
            placeholder="+62 897823232"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-bold text-color-primary"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Johndoe@gmail.com"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-color-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default UbahProfile;

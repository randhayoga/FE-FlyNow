import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProfile, profile } from "../../../redux/actions/auth";

const UbahProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [image, setImage] = useState();

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setphoneNumber(user.phoneNumber);
      setImage(user.image);
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    //Update Profile Action (fetch Api)
    dispatch(editProfile(user.id, navigate, name, phoneNumber, image));
  };

  return (
    <>
      {" "}
      {!user ? (
        <>
          <h2>Loading...</h2>
        </>
      ) : (
        <div className="w-full max-w-md mx-auto p-4 mt-8 bg-white border border-gray-200 rounded-lg shadow sm:ml-10">
          <form className="space-y-4" action="#" onSubmit={onSubmit}>
            <h1 className="text-2xl font-bold text-gray-900">
              Ubah Data Profil
            </h1>

            <div className="border rounded-t-xl h-8 text-white bg-color-primary flex items-center">
              <span className="ml-4 text-lg font-bold">Data Diri</span>
            </div>
            <Avatar className="m-auto w-32 h-32">
              <AvatarImage
                src={image}
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
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
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              />
            </div>
            {/* <div>
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
        </div> */}
            <button
              type="submit"
              className="w-full text-white bg-color-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Simpan
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UbahProfile;

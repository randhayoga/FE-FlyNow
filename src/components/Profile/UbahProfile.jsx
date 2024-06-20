import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProfile, profile } from "../../../redux/actions/auth";
import { Input } from "@/components/ui/input";

const UbahProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
    dispatch(editProfile(name, phoneNumber, image));
  };

  return (
    <>
      {!user ? (
        <h1>Loading.....</h1>
      ) : (
        <div className="border w-auto">
          <div className="p-4 w-auto">
            <form className="space-y-2" action="#" onSubmit={onSubmit}>
              <h1 className="text-lg font-bold">Ubah Data Profil</h1>
              <div className="border rounded-t-xl h-10 text-white bg-color-primary flex items-center">
                <span className="m-auto text-lg ">Data Diri</span>
              </div>
              <Avatar className="m-auto w-24 h-24">
                <AvatarImage
                  src={imagePreview || image}
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <label
                  htmlFor="nama"
                  className="ml-1 text-sm font-bold text-color-primary"
                >
                  Nama Lengkap
                </label>
                <div className="relative border-2 border-slate-200 rounded-xl ">
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="relative  border-slate-200 rounded-xl focus:ring-color-primary-500 focus:border-color-primary-500 block w-full p-2"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="phoneNumber"
                  className="ml-1 text-sm font-bold text-color-primary"
                >
                  Nomor Telepon
                </label>
                <div className="relative border-2 border-slate-200 rounded-xl ">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setphoneNumber(e.target.value)}
                    className="relative  border-slate-200 rounded-xl focus:ring-color-primary-500 focus:border-color-primary-500 block w-full p-2"
                    required
                  />
                </div>
              </div>
              <div className="relative border-2 border-slate-200 rounded-xl ">
                <button className="file-upload text-sm py-3.5 px-4 text-color-primary bg-slate-50 rounded-l-lg text-uxl">
                  Ubah Gambar Profil
                </button>

                <span>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    required
                  />
                </span>
              </div>
              <button
                type="submit"
                className="w-32 h-10  text-white bg-color-primary  font-bold rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UbahProfile;

import HeaderProfile from "@/components/Profile/HeaderProfile";
import ListProfile from "@/components/Profile/ListProfile";
import UbahProfile from "@/components/Profile/UbahProfile";

const ProfilePage = () => {
  return (
    <div className="container mx-auto h-screen p-4">
      <div className="flex flex-col items-center pt-2 w-full h-full">
        <HeaderProfile />
        <div className="grid grid-cols-1 md:grid-cols-2  w-full">
          <div className=" w-full sm:ml-20">
            <ListProfile />
          </div>
          <div className=" w-full sm:mr-10">
            <UbahProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

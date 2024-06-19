import HeaderProfile from "@/components/Profile/HeaderProfile";
import ListProfile from "@/components/Profile/ListProfile";
import UbahProfile from "@/components/Profile/UbahProfile";

const ProfilePage = () => {
  return (
    <div className="container mx-auto h-screen p-4 md:ml-44">
      <div className="flex flex-col items-center pt-2 w-full h-full">
        <HeaderProfile />
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
          <div className="w-full md:w-4/5 sm:ml-14 px-4 md:px-0">
            <ListProfile />
          </div>
          <div className="w-full px-4 md:px-0">
            <UbahProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

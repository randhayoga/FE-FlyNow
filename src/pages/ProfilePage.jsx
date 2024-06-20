import HeaderProfile from "@/components/Profile/HeaderProfile";
import ListProfile from "@/components/Profile/ListProfile";
import UbahProfile from "@/components/Profile/UbahProfile";

const ProfilePage = () => {
  return (
    <div className="container  px-2 sm:px-8 md:px-12 lg:px-20 xl:px-32 ">
      <div className="grid grid-cols-1">
        <HeaderProfile />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="p-4 ">
          <ListProfile />
        </div>
        <div className="p-4">
          <UbahProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

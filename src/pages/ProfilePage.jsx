import HeaderProfile from "@/components/Profile/HeaderProfile";
import ListProfile from "@/components/Profile/ListProfile";
import UbahProfile from "@/components/Profile/UbahProfile";

const ProfilePage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center pt-5">
      <HeaderProfile />
      <div className="grid grid-cols-3 gap-4">
        <div className="">
          <ListProfile />
        </div>
        <div className="...">
          <UbahProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

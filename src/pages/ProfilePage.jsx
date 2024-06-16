import HeaderProfile from "@/components/Profile/HeaderProfile";
import ListProfile from "@/components/Profile/ListProfile";
import UbahProfile from "@/components/Profile/UbahProfile";

const ProfilePage = () => {
  return (
    <div className="sm:container sm:mx-auto">
      <div className=" flex flex-col h-screen w-screen items-center pt-2 ml-10 ">
        <HeaderProfile />
        <div className="grid grid-cols-3 ml-auto gap-9">
          <div className="">
            <ListProfile />
          </div>
          <div className="col-span-2">
            <UbahProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

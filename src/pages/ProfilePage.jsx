import HeaderProfile from "@/components/Profile/HeaderProfile";
import ListProfile from "@/components/Profile/ListProfile";
import UbahProfile from "@/components/Profile/UbahProfile";
import { useEffect } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "sonner";

export async function loader({ request }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return redirect("/login");
  }

  return new URL(request.url).searchParams.get("message");
}

const ProfilePage = () => {
  const message = useLoaderData();

  useEffect(() => {
    if (message) {
      // toast.message("Tidak bisa melakukan booking", {
      //   description: message,
      // });
      toast.error(message);
    }
  }, []);

  return (
    <div className="container  px-2 sm:px-8 md:px-12 lg:px-20 xl:px-32 ">
      <div className="grid grid-cols-1">
        <HeaderProfile />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3  mt-4">
        <div className="p-4 ">
          <ListProfile />
        </div>
        <div className="p-4 col-span-2">
          <UbahProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

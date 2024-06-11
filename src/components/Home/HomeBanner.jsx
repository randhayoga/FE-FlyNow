import homeImgBanner from "@/assets/images/home-img-banner.png";
import { useDispatch } from "react-redux";

const HomeBanner = () => {
  const dispatch = useDispatch();
  return (
    <div className="lg:flex items-center hidden w-full h-full -mb-10">
      <div className="bg-color-secondary h-36 flex-grow"></div>
      <img src={homeImgBanner} alt="Home Banner" className="w-3/4" />
      <div className="bg-color-secondary h-36 flex-grow"></div>
    </div>
  );
};

export default HomeBanner;

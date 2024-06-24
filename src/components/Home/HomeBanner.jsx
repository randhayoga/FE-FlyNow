import homeImgBanner from "@/assets/images/home-img-banner.png";

const HomeBanner = () => {
  return (
    <div className="lg:flex items-center hidden w-full h-full -mb-10">
      <div className="bg-color-secondary h-36 flex-grow"></div>
      <img src={homeImgBanner} alt="Home Banner" className="w-4/5" />
      <div className="bg-color-secondary h-36 flex-grow"></div>
    </div>
  );
};

export default HomeBanner;

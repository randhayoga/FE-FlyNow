import homeImgBanner from "@/assets/images/home-img-banner.png";

const HomeBanner = () => {
  return (
    <div className="container lg:flex items-center hidden w-full h-full">
      <div className="bg-color-secondary h-36 w-full absolute start-0"></div>
      <img src={homeImgBanner} alt="Home Banner" className="w-[85%] z-10 mx-auto" />
    </div>
  );
};

export default HomeBanner;

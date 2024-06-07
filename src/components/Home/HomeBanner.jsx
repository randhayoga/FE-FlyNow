import homeImgBanner from "@/assets/images/home-img-banner.png";

const HomeBanner = () => {
  return (
    <div className="md:block hidden w-full -mb-10">
        <div className="flex items-center h-full">
          <div className="bg-ColorSecondary h-3/4 flex-grow"></div>
          <img src={homeImgBanner} alt="Home Banner" className="w-4/5" />
          <div className="bg-ColorSecondary h-3/4 flex-grow"></div>
        </div>
      </div>
  )
}

export default HomeBanner
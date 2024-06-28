import {
  HomeBanner,
  SearchFlightForm,
  FavDestination,
} from "@/components/Home";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full items-center pt-8">
      <HomeBanner />
      <div className="container w-full">
        <div className="flex flex-col mx-auto w-full lg:w-2/3">
          <div className="mx-auto bg-background rounded-xl w-full lg:-mt-12 z-20 shadow-md p-6 relative">
            <h2 className="text-xl font-bold tracking-wide mb-3">
              Pilih Jadwal Penerbangan Spesial di{" "}
              <span className="text-color-primary">FlyNow!</span>
            </h2>
            <SearchFlightForm />
          </div>
          <FavDestination />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

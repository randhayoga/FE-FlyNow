import HomeBanner from "@/components/Home/HomeBanner";
import SearchFlightForm from "@/components/Home/SearchFlightForm";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full items-center pt-8">
      <HomeBanner />
      <div className="lg:w-3/5 w-10/12 bg-background rounded-xl shadow-md p-6 relative">
        <h2 className="text-xl font-bold tracking-wide mb-3">
          Pilih Jadwal Penerbangan Spesial di{" "}
          <span className="text-color-primary">FlyNow!</span>
        </h2>
        <SearchFlightForm />
      </div>
    </div>
  );
};

export default HomePage;

import HomeBanner from "@/components/Home/HomeBanner";
import SearchFlightForm from "@/components/Home/SearchFlightForm";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full items-center pt-20">
      <HomeBanner />
      <div className="w-3/5 bg-background rounded-xl shadow-md p-6 relative">
        <h2 className="text-xl font-semibold tracking-wide mb-3">
          Pilih Jadwal Penerbangan Spesial di{" "}
          <span className="text-color-primary">FlyNow!</span>
        </h2>
        <SearchFlightForm />
      </div>
    </div>
  );
};

export default HomePage;

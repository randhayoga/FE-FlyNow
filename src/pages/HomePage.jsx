import HomeBanner from "@/components/Home/HomeBanner";
import SearchFlightForm from "@/components/Home/SearchFlightForm";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center pt-5">
      <HomeBanner />
      <div className="w-4/5 md:w-3/5 bg-background rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold tracking-wide mb-3">
          Pilih Jadwal Penerbangan Spesial di{" "}
          <span className="text-ColorPrimary">FlyNow!</span>
        </h2>
        <SearchFlightForm />
      </div>
      <Button onClick={() => toast.success("You've clicked me")}>Hello</Button>
    </div>
  );
};

export default HomePage;

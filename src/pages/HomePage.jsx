import HomeBanner from "@/components/Home/HomeBanner";
import SearchFlightForm from "@/components/Home/SearchFlightForm";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center pt-5">
      <HomeBanner />
      <div className="w-2/3 bg-background rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold tracking-wide mb-3">
          Pilih Jadwal Penerbangan Spesial di{" "}
          <span className="text-ColorPrimary">FlyNow!</span>
        </h2>
        <SearchFlightForm />
      </div>
      <Button onClick={() => toast.error("You've clicked me")}>Nyoba Toast</Button>
    </div>
  );
};

export default HomePage;

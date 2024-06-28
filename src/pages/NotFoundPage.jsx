import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import notFoundImg from "@/assets/images/not-found.svg";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center h-screen md:flex-row md:overflow-y-hidden">
      <div className="w-96 flex items-center justify-center md:w-1/2 md:h-full">
        <img src={notFoundImg} className="" alt="not found" />
      </div>
      <div className="w-4/5 md:w-1/2 h-full flex flex-col items-center md:items-start md:justify-center md:ps-6">
        <section className="not-found-title text-5xl font-bold mb-4">
          <h1 className="text-center md:text-start mb-2">Oops,</h1>
          <h1>
            <span className="text-color-primary">nothing</span> here...
          </h1>
        </section>
        <p className="w-4/5 text-center text-base font-medium md:text-start">
          The page you’re looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <Link to="/" className="w-full">
          <Button className="w-full md:w-fit mt-3 bg-color-primary hover:bg-hover-primary text-white font-semibold py-2 px-6 rounded-full">
            <ArrowLeft /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

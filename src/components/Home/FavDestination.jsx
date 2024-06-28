import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFavoriteFlights } from "../../../redux/actions/flight";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaArrowRightLong } from "react-icons/fa6";

import { format } from "date-fns";
import { id } from "date-fns/locale";

import FavDestinationLoading from "./FavDestinationLoading";

const FavDestination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { favoriteFlights } = useSelector((state) => state.flights);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getFavoriteFlights(setIsLoading));
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return null;
    return format(new Date(date), "dd MMMM yyyy", { locale: id });
  };

  return (
    <div className="w-full mt-10">
      <h1 className="font-bold text-base mb-2">Destinasi Favorit</h1>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {!isLoading ? (
          favoriteFlights.map((item) => (
            <Card
              onClick={() => {
                navigate(`/destinasi-favorit/${item.id}`);
                window.scrollTo(0, 0);
              }}
              key={item.id}
              className="w-full rounded cursor-pointer"
            >
              <CardHeader className="p-2 pb-0">
                <div className="relative">
                  <div className="absolute top-0 right-0 flex items-center justify-end pe-2 rounded-s-xl px-5 py-1 bg-color-primary">
                    <p className="font-normal text-[11px] text-white">
                      {item.discount}
                    </p>
                  </div>
                  <img
                    src={item.image}
                    alt={`Destination image ${item.id}`}
                    className="rounded w-full sm:h-36 md:h-32 lg:h-28 object-cover"
                  />
                </div>
                <CardTitle className="flex items-center gap-2 font-medium text-sm">
                  {item.departureCity}
                  <FaArrowRightLong />
                  {item.arrivalCity}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs leading-5 px-2">
                <p className="font-bold text-color-primary">{item.airline}</p>
                <p className="font-medium">{formatDate(item.departureTime)}</p>
                <p className="text-sm font-normal">
                  Mulai dari{" "}
                  <span className="font-bold text-alert-danger">
                    IDR {item.price.toLocaleString("id-ID")}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <FavDestinationLoading />
        )}
      </div>
    </div>
  );
};

export default FavDestination;

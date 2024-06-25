import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteFlights } from "../../../redux/actions/flight";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaArrowRightLong } from "react-icons/fa6";

import { format } from "date-fns";
import { id } from "date-fns/locale";

const FavDestination = () => {
  const dispatch = useDispatch();

  const { favoriteFlights } = useSelector((state) => state.flights);

  useEffect(() => {
    dispatch(getFavoriteFlights());
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return null;
    return format(new Date(date), "dd MMMM yyyy", { locale: id });
  };

  return (
    <div className="w-full mt-10">
      <h1 className="font-bold text-base mb-2">Destinasi Favorit</h1>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {favoriteFlights.map((item) => (
          <Card key={item.id} className="w-full rounded">
            <CardHeader className="p-2 pb-0">
              <div className="relative">
                <div className="absolute top-0 right-0 flex items-center justify-end pe-2 rounded-s-xl w-2/5 h-6 bg-color-primary">
                  <p className="font-normal text-[11px] text-white">
                    {item.discount.toUpperCase()}
                  </p>
                </div>
                <img
                  src={item.image}
                  alt={`Destination image ${item.id}`}
                  className="rounded w-full sm:h-32 md:h-28 lg:h-24 object-cover"
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
        ))}
      </div>
    </div>
  );
};

export default FavDestination;

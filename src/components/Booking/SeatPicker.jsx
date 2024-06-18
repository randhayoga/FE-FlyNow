import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeatsByFlightId } from "../../../redux/actions/flight";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SeatPicker = ({ flight, maxSeats }) => {
  const dispatch = useDispatch();
  const { seats } = useSelector((state) => state.flights);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    dispatch(getSeatsByFlightId(parseInt(flight.id)));
  }, [dispatch, flight.id]);

  const availableSeatsCount = seats.filter((seat) => seat.seatAvailable).length;

  const renderSeatText = (seat) => {
    if (!seat.seatAvailable) {
      return "X";
    } else {
      return selectedSeats.includes(seat.seatCode) ? seat.seatCode : "";
    }
  };

  const handleSeatClick = (seatCode) => {
    if (selectedSeats.includes(seatCode)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatCode));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seatCode]);
    }
  };

  const leftSeats = seats.filter((_, index) => index % 6 < 3);
  const rightSeats = seats.filter((_, index) => index % 6 >= 3);
  const leftLetters = ["A", "B", "C"];
  const rightLetters = ["D", "E", "F"];

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold tracking-wide mb-3">Pilih Kursi</h1>
      <div className="w-full bg-alert-success text-white text-center p-2 mb-3">
        {flight.flightClass &&
          flight.flightClass
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
        - {availableSeatsCount} Seats Available
      </div>
      <p className="text-center">
        {selectedSeats.length} of {maxSeats} Seats Chosen
      </p>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2">
          {leftLetters.map((letter) => (
            <div
              key={letter}
              className="flex justify-center w-9 h-9 items-center"
            >
              {letter}
            </div>
          ))}
          {leftSeats.map((seat) => (
            <Button
              key={seat.seatCode}
              disabled={!seat.seatAvailable}
              onClick={() => handleSeatClick(seat.seatCode)}
              className={cn("w-9 h-9 flex items-center justify-center", {
                "bg-gray-400 cursor-not-allowed": !seat.seatAvailable,
                "bg-color-primary text-white": selectedSeats.includes(
                  seat.seatCode
                ),
                "bg-alert-success":
                  seat.seatAvailable && !selectedSeats.includes(seat.seatCode),
              })}
            >
              {renderSeatText(seat)}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-9 h-9"></div>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i + 1}
              className="flex justify-center w-9 h-9 items-center"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {rightLetters.map((letter) => (
            <div
              key={letter}
              className="flex justify-center w-9 h-9 items-center"
            >
              {letter}
            </div>
          ))}
          {rightSeats.map((seat) => (
            <Button
              key={seat.seatCode}
              disabled={!seat.seatAvailable}
              onClick={() => handleSeatClick(seat.seatCode)}
              className={cn("w-9 h-9 flex items-center justify-center", {
                "bg-gray-400 cursor-not-allowed": !seat.seatAvailable,
                "bg-color-primary text-white": selectedSeats.includes(
                  seat.seatCode
                ),
                "bg-alert-success":
                  seat.seatAvailable && !selectedSeats.includes(seat.seatCode),
              })}
            >
              {renderSeatText(seat)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatPicker;

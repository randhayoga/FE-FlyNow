import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SeatPicker = ({
  flight,
  seats,
  label,
  maxSeats,
  isLoading,
  selectedSeats,
  setSelectedSeats,
}) => {
  const availableSeatsCount = seats.filter((seat) => seat.seatAvailable).length;

  const numColumns = 6; // Misalnya, 6 kolom per baris
  const numRows = Math.ceil(seats.length / numColumns);

  const leftColumns = 3; // Kolom di sisi kiri
  const rightColumns = numColumns - leftColumns;

  const lettersLeft = useMemo(
    () =>
      Array.from({ length: leftColumns }, (_, i) =>
        String.fromCharCode(65 + i)
      ),
    [leftColumns]
  );
  const lettersRight = useMemo(
    () =>
      Array.from({ length: rightColumns }, (_, i) =>
        String.fromCharCode(68 + i)
      ),
    [rightColumns]
  );

  const handleSeatClick = (seatCode) => {  
    // Check if seat is already selected
    if (selectedSeats.includes(seatCode)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((id) => id !== seatCode));
    } else {
      if (selectedSeats.length >= maxSeats) {
        // Replace the earliest selected seat with the new seat
        setSelectedSeats([...selectedSeats.slice(1), seatCode]);
      } else {
        // Select the new seat
        setSelectedSeats([...selectedSeats, seatCode]);
      }
    }
  };

  const renderSeatText = (seat) =>
    seat.seatAvailable
      ? selectedSeats.includes(seat.seatCode)
        ? seat.seatCode
        : ""
      : "X";

  const renderSeat = (seat) => (
    <Button
      key={seat.seatCode}
      disabled={!seat.seatAvailable}
      onClick={() => handleSeatClick(seat.seatCode)}
      className={cn("w-9 h-9 flex items-center justify-center", {
        "bg-gray-400 cursor-not-allowed": !seat.seatAvailable,
        "bg-color-primary text-white": selectedSeats.includes(seat.seatCode),
        "bg-alert-success":
          seat.seatAvailable && !selectedSeats.includes(seat.seatCode),
      })}
    >
      {renderSeatText(seat)}
    </Button>
  );

  const SeatGrid = ({ seats, letters }) => (
    <div className="grid grid-cols-3 gap-2">
      {letters.map((letter) => (
        <div key={letter} className="flex justify-center w-9 h-9 items-center">
          {letter}
        </div>
      ))}
      {seats.map(renderSeat)}
    </div>
  );

  return (
    <section className="border-2 border-[#8A8A8A] rounded-xl px-3 py-6 mb-6">
      {!isLoading ? (
        <>
          <h1 className="text-xl font-bold tracking-wide mb-3">{label}</h1>
          <div className="w-full bg-alert-success tracking-wide text-white text-center p-2 mb-3">
            {flight.airline?.airlineName} (
            {flight.flightClass &&
              flight.flightClass
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            ) - {availableSeatsCount} Seats Available
          </div>
          <p className="text-center">
            {selectedSeats.length} of {maxSeats} Seats Chosen
          </p>
          <div className="flex items-center justify-center">
            <SeatGrid
              seats={seats.filter(
                (_, index) => index % numColumns < leftColumns
              )}
              letters={lettersLeft}
            />
            <div className="flex flex-col gap-2">
              <div className="w-9 h-9"></div>
              {Array.from({ length: numRows }, (_, i) => (
                <div
                  key={i + 1}
                  className="flex justify-center w-9 h-9 items-center"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <SeatGrid
              seats={seats.filter(
                (_, index) => index % numColumns >= leftColumns
              )}
              letters={lettersRight}
            />
          </div>
        </>
      ) : (
        "Loading Seats..."
      )}
    </section>
  );
};

export default SeatPicker;

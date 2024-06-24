import BreadcrumbBooking from "./BreadcrumbBooking";
import Timer from "./Timer";

const BookingPageHeader = ({ isSubmitted }) => {
  return (
    <div className="w-full flex flex-col justify-center bg-white tracking-wide">
      <BreadcrumbBooking />
      <Timer isSubmitted={isSubmitted} />
    </div>
  );
};

export default BookingPageHeader;

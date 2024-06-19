import { React, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchFlight } from "../../redux/actions/flight";

// Import Search Flight Component
import Header from "@/components/SearchFlight/Header";
import SelectSort from "@/components/SearchFlight/SelectSort";
import SelectedFlightCard from "@/components/SearchFlight/SelectedFlightCard";
import FlightCard from "@/components/SearchFlight/FlightCard";
import PaginationComponent from "@/components/SearchFlight/PaginationComponent";
import Loading from "@/components/SearchFlight/Loading";
import NotFound from "@/components/SearchFlight/NotFound";

const SearchFlightPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { flights } = useSelector((state) => state.flights);

  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
  const [selectedDepartureFlightOneWay, setSelectedDepartureFlightOneWay] =
    useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [isSelectingReturnFlight, setIsSelectingReturnFlight] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Adjust the page size

  useEffect(() => {
    const queryParams = {
      da: searchParams.get("da"),
      aa: searchParams.get("aa"),
      dd: searchParams.get("dd"),
      rd: searchParams.get("rd"),
      class: searchParams.get("class"),
      sort: searchParams.get("sort"),
      page: currentPage,
      pageSize,
    };
    dispatch(searchFlight(queryParams));
  }, [dispatch, searchParams]);

  const toggleExpand = (flightId) => {
    setExpandedCard((prev) => (prev === flightId ? null : flightId));
  };

  const adult = parseInt(searchParams.get("adult"), 10) || 0;
  const children = parseInt(searchParams.get("children"), 10) || 0;
  const baby = parseInt(searchParams.get("baby"), 10) || 0;
  const totalPassengers = adult + children + baby;

  const handleSelectDepartureOneWay = (flight) => {
    setSelectedDepartureFlightOneWay(flight);
    navigate(
      `/flight/booking?df=${flight.id}&adult=${adult}&children=${children}&baby=${baby}`
    );
  };

  const handleSelectDeparture = (flight) => {
    setSelectedDepartureFlight(flight);
    setIsSelectingReturnFlight(true);
  };

  const handleSelectReturn = (flight) => {
    setSelectedReturnFlight(flight);
    navigate(
      `/flight/booking?df=${selectedDepartureFlight.id}&rf=${flight.id}&adult=${adult}&children=${children}&baby=${baby}`
    );
  };

  const handleSortChange = (value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", value);
    setSearchParams(newSearchParams);
    navigate(`/flight/search?${newSearchParams.toString()}`);
  };

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    setSearchParams(newSearchParams);
    navigate(`/flight/search?${newSearchParams.toString()}`);
    setCurrentPage(page);
  };

  const handleSelectDepartureAndResetPage = (flight) => {
    handleSelectDeparture(flight);
    handlePageChange(1);
  };

  return (
    <div>
      <div className="shadow-md py-4">
        <div className="container">
          <Header
            searchParams={searchParams}
            totalPassengers={totalPassengers}
          />
        </div>
      </div>

      <div className="container ">
        <SelectSort handleSortChange={handleSortChange} />

        {!flights.departureFlights ? (
          <Loading />
        ) : flights.departureFlights && flights.returnFlights ? (
          <div>
            {selectedDepartureFlight && (
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-3">Penerbangan Pergi</h2>
                <SelectedFlightCard
                  selectedDepartureFlight={selectedDepartureFlight}
                  toggleExpand={toggleExpand}
                  expandedCard={expandedCard}
                />
              </div>
            )}

            {isSelectingReturnFlight ? (
              <div>
                <h2 className="text-lg font-bold mb-3">Penerbangan Pulang</h2>
                {flights.returnFlights && flights.returnFlights.length > 0 ? (
                  <>
                    {flights.returnFlights.map((flight) => (
                      <FlightCard
                        flight={flight}
                        expandedCard={expandedCard}
                        toggleExpand={toggleExpand}
                        ButtonHandler={handleSelectReturn}
                      />
                    ))}
                    <PaginationComponent
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                      totalPages={flights.totalReturnPages}
                    />
                  </>
                ) : (
                  <NotFound />
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-bold mb-3">Penerbangan Pergi</h2>
                {flights.departureFlights &&
                flights.departureFlights.length > 0 ? (
                  <>
                    {flights.departureFlights.map((flight) => (
                      <FlightCard
                        flight={flight}
                        expandedCard={expandedCard}
                        toggleExpand={toggleExpand}
                        ButtonHandler={handleSelectDepartureAndResetPage}
                      />
                    ))}
                    <PaginationComponent
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                      totalPages={flights.totalDeparturePages}
                    />
                  </>
                ) : (
                  <NotFound />
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-3">Penerbangan Pergi</h2>
            {flights.departureFlights && flights.departureFlights.length > 0 ? (
              <>
                {flights.departureFlights.map((flight) => (
                  <FlightCard
                    flight={flight}
                    expandedCard={expandedCard}
                    toggleExpand={toggleExpand}
                    ButtonHandler={handleSelectDepartureOneWay}
                  />
                ))}
                <PaginationComponent
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  totalPages={flights.totalDeparturePages}
                />
              </>
            ) : (
              <NotFound />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFlightPage;

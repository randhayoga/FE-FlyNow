import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFavoriteFlightById } from "../../redux/actions/flight";

import DestinasiFavoritSkeleton from "@/components/DetailDestinasiFavorit/DestinasiFavoritSkeleton";
import DestinasiFavoritHeader from "@/components/DetailDestinasiFavorit/DestinasiFavoritHeader";
import DestinasiFavoritBody from "@/components/DetailDestinasiFavorit/DestinasiFavoritBody";

const DetailDestinasiFavoritPage = () => {
  const dispatch = useDispatch();
  const { favoriteFlight } = useSelector((state) => state.flights);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getFavoriteFlightById(id));
  }, [dispatch, id]);
  return (
    <>
      <div className="shadow-md pb-5">
        <div className="container">
          <DestinasiFavoritHeader />
        </div>
      </div>

      {!favoriteFlight ? (
        <DestinasiFavoritSkeleton />
      ) : (
        <DestinasiFavoritBody favoriteFlight={favoriteFlight} />
      )}
    </>
  );
};

export default DetailDestinasiFavoritPage;

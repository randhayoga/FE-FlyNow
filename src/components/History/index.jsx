import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import Header from "@/components/History/Header";
import Loading from "@/components/History/Loading";
import Body from "@/components/History/Body";
import { searchHistories } from "../../../redux/actions/history";
import { useDispatch, useSelector } from "react-redux";

moment.locale("id");

function HistoryPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { histories } = useSelector((state) => state.histories);

  useEffect(() => {
    const fetchHistories = async () => {
      setLoading(true);
      await dispatch(searchHistories());
      setLoading(false);
    };
    fetchHistories();
  }, [dispatch]);

  return (
    <div className="container overflow-x-hidden">
      <Header setLoading={setLoading} />
      <div className="content mt-5 sm:mx-3 md:mx-3">
        {loading === true ? <Loading /> : <Body histories={histories} />}
      </div>
    </div>
  );
}

export default HistoryPage;

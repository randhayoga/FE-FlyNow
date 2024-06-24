import React, { useEffect, useState } from "react";
import NotFound from "./NotFound";
import Cards from "./Cards";
import Detail from "./Detail";

function Body({ histories }) {
  const [currentHistory, setCurrentHistory] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (histories.length > 0) {
      setCurrentHistory(histories[0]);
    }
  }, [histories]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setModal(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Set initial state based on window width
    if (window.innerWidth >= 1024) {
      setModal(true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return histories.length === 0 ? (
    <NotFound />
  ) : (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      <Cards
        histories={histories}
        currentHistory={currentHistory}
        setCurrentHistory={setCurrentHistory}
        setModal={setModal}
      />
      {currentHistory?.id && (
        <Detail
          currentHistory={currentHistory}
          modal={modal}
          setModal={setModal}
        />
      )}
    </div>
  );
}

export default Body;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGrip,
  faList,
  faRightFromBracket,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

const Header = (props) => {
  const size = useWindowSize();
  return (
    <div
      id="sticky-banner"
      tabIndex="-1"
      className="fixed top-0 left-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <div
        style={{ flex: 1, justifyContent: "space-between" }}
        className="flex items-center mx-auto"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={() => {
              props.changeView(true);
            }}
            style={{ margin: "10px", cursor: "pointer" }}
          >
            <FontAwesomeIcon style={{ fontSize: "25" }} icon={faGrip} />
          </div>
          <div
            onClick={() => {
              props.changeView(false);
            }}
            style={{ margin: "10px", cursor: "pointer" }}
          >
            <FontAwesomeIcon style={{ fontSize: "20" }} icon={faList} />
          </div>
        </div>
        <div>
          <div className="flex">
            <div
              onClick={() => {
                props.changePage("Prev");
              }}
              style={{ cursor: "pointer" }}
              href="#"
              className="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-3.5 h-3.5 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Previous
            </div>
            <div
              onClick={() => {
                props.changePage("Next");
              }}
              style={{ cursor: "pointer" }}
              href="#"
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <button
            onClick={props.toggleFav}
            type="button"
            className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
          >
            <FontAwesomeIcon style={{ margin: "10px" }} icon={faHeart} />

            {size.width > 648
              ? props.showingFav
                ? "All News"
                : "My Favourites"
              : ""}
          </button>
          <button
            onClick={props.handleLogout}
            type="button"
            className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
          >
            <FontAwesomeIcon
              style={{ margin: "10px" }}
              icon={faRightFromBracket}
            />
            {size.width > 648 ? "Logout" : ""}
          </button>
        </div>
      </div>
      <div className="flex items-center"></div>
    </div>
  );
};

export default Header;

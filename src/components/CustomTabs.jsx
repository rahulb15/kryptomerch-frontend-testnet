// // CustomTabs.jsx
// import Link from "next/link";
// import { useState } from "react";
// import { Rings } from "react-loader-spinner";
// import RocketIcon from "src/data/icons/RocketIcon";

// const CustomTabs = ({ activeTab, onTabChange }) => {
//     return (
//         <div className="tabs-outer-wrapper">
//             <div className="tabs-nav">
//                 <button
//                     className={`tab-button ${
//                         activeTab === "live" ? "active" : ""
//                     }`}
//                     onClick={() => onTabChange("live")}
//                 >
//                     <Rings
//                         color="#111"
//                         height={20}
//                         width={20}
//                         radius={10}
//                         margin={2}
//                     />
//                     Live
//                 </button>
//                 <button
//                     className={`tab-button ${
//                         activeTab === "upcoming" ? "active" : ""
//                     }`}
//                     onClick={() => onTabChange("upcoming")}
//                 >
//                     Upcoming
//                 </button>
//                 <button
//                     className={`tab-button ${
//                         activeTab === "past" ? "active" : ""
//                     }`}
//                     onClick={() => onTabChange("past")}
//                 >
//                     Past
//                 </button>
//             </div>
//             {/* <div className="launch-text">
//                 Launch with Kryptomerch {<RocketIcon />}
//             </div> */}
//             <Link href="/apply-launchpad" passHref>
//                 <div className="launch-text">
//                     Launch with Kryptomerch {<RocketIcon />}
//                 </div>
//             </Link>
//         </div>
//     );
// };

// export default CustomTabs;


// CustomTabs.jsx
import Link from "next/link";
import { useState } from "react";
import { Rings } from "react-loader-spinner";
import RocketIcon from "src/data/icons/RocketIcon";

const CustomTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs-container">
      <div className="tabs-nav">
        <div className="tabs-left-group">
          <span className="bullet-point">•</span>
          <div className="tabs-list">
            <div className="tab-item">
              <button
                className={`tab-button ${activeTab === "live" ? "active" : ""}`}
                onClick={() => onTabChange("live")}
              >
                Live
                {activeTab === "live" && <div className="tab-indicator" />}
              </button>
            </div>
            <div className="tab-item">
              <button
                className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
                onClick={() => onTabChange("upcoming")}
              >
                Upcoming
                {activeTab === "upcoming" && <div className="tab-indicator" />}
              </button>
            </div>
            <div className="tab-item">
              <button
                className={`tab-button ${activeTab === "past" ? "active" : ""}`}
                onClick={() => onTabChange("past")}
              >
                Past
                {activeTab === "past" && <div className="tab-indicator" />}
              </button>
            </div>
          </div>
        </div>
        
        <Link href="/apply-launchpad" className="launch-link">
          Launch with Kryptomerch
        </Link>
      </div>
    </div>
  );
};

export default CustomTabs;
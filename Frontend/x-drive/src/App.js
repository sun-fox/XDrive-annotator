import TopNavigation from "./Components/TopNavigation";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

import LeftSide from "./Components/LeftSide";
import RightSide from "./Components/RightSide";

export default function App() {
  console.log("Helooo");
  return (
    <div >
      <TopNavigation />
      <div className="appContainer">
        <div className="l3">
          <LeftSide />
        </div>
        <div className="l7">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

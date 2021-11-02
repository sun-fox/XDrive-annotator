import TopNavigation from "./Components/TopNavigation";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

import DataSetExplorer from "./Components/DatasetExplorer";
import ImgAnnotator from "./Components/ImgAnnotator"
import ReactAnnotator from "./Components/ReactAnnotator";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import RightSide from "./Components/RightSide";
import DatasetDisplayer from "./Components/DatasetDisplayer";

export default function App() {
  console.log("Helooo");
  return (
    <Router>
      <div >
        <TopNavigation />
        <Switch>
          <Route path="/" exact component={DatasetDisplayer}/>
          <Route path="/annotate" component={ImgAnnotator}/>
          <Route path="/label" component={ReactAnnotator}/>
          <Route path='/datasets/:folder' component={RightSide}/>
        </Switch>
      </div>
    </Router>
    
  );
}

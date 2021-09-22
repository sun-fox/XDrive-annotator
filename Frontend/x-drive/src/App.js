import TopNavigation from "./Components/TopNavigation";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

import DataSetExplorer from "./Components/DatasetExplorer";
import ImgAnnotator from "./Components/ImgAnnotator"

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

export default function App() {
  console.log("Helooo");
  return (
    <Router>
      <div >
        <TopNavigation />
        <Switch>
          <Route path="/" exact component={DataSetExplorer}/>
          <Route path="/annotate" component={ImgAnnotator}/>
        </Switch>
      </div>
    </Router>
    
  );
}

import React, {useState, useEffect} from "react";
import LeftSide from "../LeftSide";
import RightSide from "../RightSide";
import Datasetsdisplayer from "../DatasetDisplayer"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import "./datasetExplorer.css";

export default function DataSetExplorer() {
  const [showDatasets, setShowDatasets]= useState('')
  
  return (
    <div className="appContainer">
    <div className="l2">
      <LeftSide />
    </div>
    {/* <Router>
      <div className="l8">
        <Switch>
          <Route path={"/explorer"} exact component={Datasetsdisplayer}> </Route>
          <Route path="/explorer/images" component={RightSide}></Route>
        </Switch>
      </div>
    </Router> */}
    <div className="l8">
      {showDatasets.length>0?<RightSide showDatasets={showDatasets} setShowDatasets={setShowDatasets}/>:<Datasetsdisplayer showDatasets={showDatasets} setShowDatasets={setShowDatasets}/>}
      
    </div>
  </div>
  );
};



import React, {useState} from "react";
import './imgAnnotator.css'
import { useLocation } from "react-router-dom";
import ToolPanel from '../ToolPanel'
import ImagePanel from '../ImagePanel'
import LabelPanel from '../LabelPanel'

export default function ImgAnnotator() {

    const [data, setData] = useState()
    const loc = useLocation();
    console.log("Console: "+loc?.state?.dat_name);

  return (
      <div>
          <div class="row">
            <div class="col col-lg-2">
                <ToolPanel dat_name={loc?.state?.dat_name} />
            </div>
            <div class="col col-lg-8">
                <ImagePanel data={data} setData={setData}/>
            </div>
            <div class="col col-lg-2">
                <LabelPanel data={data}/>
            </div>
        </div>
      </div>
  );
};



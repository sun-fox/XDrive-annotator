import React, {useState} from "react";
import './imgAnnotator.css'

import ToolPanel from '../ToolPanel'
import ImagePanel from '../ImagePanel'
import LabelPanel from '../LabelPanel'

export default function ImgAnnotator() {

    const [data, setData] = useState()

  return (
      <div>
          <div class="row">
            <div class="col col-lg-2">
                <ToolPanel/>
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



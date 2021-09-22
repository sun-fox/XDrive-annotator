import React from "react";
import './imgAnnotator.css'

import ToolPanel from '../ToolPanel'
import ImagePanel from '../ImagePanel'
import LabelPanel from '../LabelPanel'

export default function ImgAnnotator() {
  return (
      <div>
          <div class="row">
            <div class="col col-lg-2">
                <ToolPanel/>
            </div>
            <div class="col col-lg-8">
                <ImagePanel/>
            </div>
            <div class="col col-lg-2">
                <LabelPanel/>
            </div>
        </div>
      </div>
  );
};



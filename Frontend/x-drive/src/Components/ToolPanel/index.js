import React, {useState} from "react";
import './index.css'

import ImageUploader from '../ImageUploader'
import ImgAnnotator from "../ImgAnnotator";

export default function ToolPanel(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    console.log("Button-clicked")
    console.log(!modal)
    setModal(!modal);
  };

  // if(modal) {
  //   document.body.classList.add('active-modal')
  // } else {
  //   document.body.classList.remove('active-modal')
  // }
  return (
      <div>
        <div className="lsContainer">
            <div className="d-grid gap-2 col-10 mx-auto" >
                <button className="btn btn-success" style={{marginTop: '20px'}}><i class="fas fa-draw-polygon"></i> Draw</button>
                <button className="btn btn-warning"><i class="far fa-save"></i> Save</button>
                
                <button onClick={toggleModal} className="btn btn-danger">
                <i class="fas fa-file-upload"></i> Import Image
                </button>

                {modal && (
                  <div className="modalx">
                    <div onClick={toggleModal} ></div>
                    <div className="modal-content">
                      <ImageUploader dat_name={props.dat_name}/>
                      <button className="close-modal" onClick={toggleModal}>
                        CLOSE
                      </button>
                    </div>
                  </div>
                )}

                
                
                <button className="btn btn-info"><i class="fas fa-file-export"></i> Export Image</button>
            </div>

            

        </div>
      </div>
  );
};



import React, {useState} from "react";

import "./leftSide.css";
export default function LeftSide() {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    console.log("Clicked Modal " + modal)
  };

  let file_path = ""

  const imageHandler = (e) =>{
    // console.log(e)
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        // this.setState({profileImg: reader.result})
        file_path = reader.result;
        console.log(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
    console.log("Image")
    var formdata = new FormData();
    formdata.append("folder", file_path);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://172.18.12.202:5000//import_dataset", requestOptions)
      .then(response => {
        return response.text()})
      .then(result => {
        // setImg("detections/"+loc?.state?.src.substring(8))
        // setData(result)
      })
      .catch(error => console.log('error', error));
      

  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <div className="lsContainer">
      <div className="d-grid gap-2 col-10 mx-auto" >
        <button className="btn btn-success btn-lg" style={{marginTop: '20px'}}>Generate Annotations</button>
        <button className="btn btn-warning btn-lg">Scan Drive</button>
        <button className="btn btn-danger btn-lg" onClick={toggleModal}>Import DataSet</button>

        {modal && (
        <div className="modal1">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal1-content">
            <h2>Provide the Path for the Dataset</h2>
            <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} />
            <div className="label">
            <label className="btn btn-primary image-upload" htmlFor="input">Browse</label>
            </div>
            <button className="close-modal1" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
       )}


        <button className="btn btn-info btn-lg">Export Dataset</button>
      </div>
    </div>
  );
}

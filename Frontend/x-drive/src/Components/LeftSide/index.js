import React, {useEffect, useState} from "react";
import axios from "axios";
import "./leftSide.css";
export default function LeftSide() {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    console.log("Clicked Modal " + modal)
  };

  // let file_path = ""

  // const imageHandler = (e) =>{
  //   console.log(e.target.files)
  //   // uploadMultipleFiles(e) {
  //     let fileObj = []
  //     let fileArray = []
  //     fileObj.push(e.target.files)
  //     for (let i = 0; i < fileObj[0].length; i++) {
  //         fileArray.push(URL.createObjectURL(fileObj[0][i]))
  //     }
  //     console.log(fileArray)
  // // }
  //   // const reader = new FileReader();
  //   // reader.onload = () =>{
  //   //   if(reader.readyState === 2){
  //   //     // this.setState({profileImg: reader.result})
  //   //     file_path = reader.result;
  //   //     console.log(reader.result)
  //   //   }
  //   // }
  //   // reader.readAsDataURL(e.target.files[0])
  //   // console.log("Image")
  //   // var formdata = new FormData();
  //   // formdata.append("files", fileArray);

  //   var requestOptions = {
  //     method: 'POST',
  //     mode:'no-cors',
  //     // body: formdata,
  //     body: fileArray,
  //     redirect: 'follow'
  //   };

  //   // fetch("http://192.168.0.104:5000/import_dataset", requestOptions)
  //   fetch("http://localhost:4000/import_dataset", requestOptions)
  //     .then(response => {
  //       console.log(response)
  //       return response.text()})
  //     .then(result => {
  //       // setImg("detections/"+loc?.state?.src.substring(8))
  //       // setData(result)
  //     })
  //     .catch(error => console.log('error', error));
  // }

  const [dataset, setDataset] = useState()

  const uploadPhotos = (e) => {
    const files = e.target.files;
    let formData = new FormData();

    for (const key of Object.keys(files)) {
      formData.append("imagesArray", files[key]);
    }
    // formData.append("dat_name",dataset);
    axios.post(`http://localhost:4000/upload_dataset/${dataset}`, formData, {}).then((response) => {
      // setImg(response.data);
      console.log(response.data);
    });
  };

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
            <div className="label">
            <label htmlFor="input"> Dataset Name:  &nbsp; </label>
            <input type="text" onChange={(e)=>
            {
              setDataset(e.target.value)
            }}/> 
            </div>
            <input type="file" accept="image/*" name="image-upload" id="input" multiple onChange={uploadPhotos} />
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

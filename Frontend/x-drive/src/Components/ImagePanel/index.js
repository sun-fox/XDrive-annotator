import React, {useState} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import './index.css'

export default function ImagePanel(props) {
  const loc = useLocation();
  console.log("Console: "+loc?.state?.src);
  const {data,setData}=props
  const [img,setImg] = useState()
  // const [data, setData] = useState()
  // const [images, setImage] = useState()

  const SegmentationHandler = (e)=>{
    // var dataset_path = 'C:/Users/1999s/OneDrive/Desktop/Xdrive/Frontend/x-drive/public/detections'

    console.log("Img_path: ")
    console.log(img || loc?.state?.src)
    var img_path = img || loc?.state?.src
    // const reader = new FileReader();
    // reader.onload = () =>{
    //   if(reader.readyState === 2){
    //     // this.setState({profileImg: reader.result})
    //     console.log("Image Loaded")
	  //  }
    // }
    // reader.readAsDataURL(img_path)

    // var formdata = new FormData();
    // console.log(e.target.value)
    // formdata.append("file1", e.target.value)

    // var requestOptions = {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   body: formdata,
    //   redirect: 'follow'
    // };

    // fetch("http://439c-35-236-129-183.ngrok.io/get_image", requestOptions)
    // .then(response => {
    //   console.log(response)
    //   return response.text()})
    // .then(result => {
    //   // console.log(loc)
    //   setImg("\\detections"+loc?.state?.src)
    //   console.log("Result:",result)
    //   setData(result)
    // })
    // .catch(error => console.log('error', error));
    
  }

  const ClickHandler= async()=>{
    var formdata = new FormData();
    console.log(formdata)
    formdata.append("images", loc?.state?.src);
    console.log("ipath:",loc?.state?.src )

    var requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://172.18.12.70:5000/image", requestOptions)
      .then(response => {
        console.log(response)
        return response.text()})
      .then(result => {
        // console.log(loc)
        setImg("\\detections"+loc?.state?.src)
        console.log("Result:",result)
        setData(result)
      })
      .catch(error => console.log('error', error));
  }

  return (
      <div>
        <div  className="imgPanel">
          <h1>Image: {loc?.state?.src.split("\\")[3]}</h1>
          {/* <div>
          <label htmlFor="img_upload"> Instance Segment: &nbsp;</label>
          <input type='file' name="img_upload" id = 'img_upload' onChange={SegmentationHandler}/>
          </div> */}
          <button className="btn btn-warning" onClick={SegmentationHandler}>Segmentation</button>
          &nbsp;
          <button className="btn btn-success" onClick={ClickHandler}> Bounding-Box</button>
        </div>
        {loc && <img src={img || loc?.state?.src} alt=''></img>} 
        <div>
        </div>        
      </div>
  );
};



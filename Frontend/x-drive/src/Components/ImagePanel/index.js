import React, {useState} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import './index.css'

export default function ImagePanel(props) {
  const loc = useLocation();
  console.log("Console: "+loc?.state?.src.substring(8));
  const {data,setData}=props
  const [img,setImg] = useState()
  // const [data, setData] = useState()
  // const [images, setImage] = useState()

  const ClickHandler= async()=>{
    // let data = await fetch("http://192.168.0.101:5000/image", requestOptions)
    // // console.log(data)
    // data = await data.text()
    // // console.log(data)
    // setImg("detections/"+loc?.state?.src.substring(8))


    // var formdata = new FormData();
    // formdata.append("images", loc?.state?.src.substring(8));
    // var requestOptions = {
    //   body: JSON.stringify(formdata),
    //   mode: 'no-cors'
    // };
    // const instance = axios.create({baseURL:"http://192.168.0.101:5000/image"})
    // let data = await instance.post("/", requestOptions)
    // console.log(data)
    // setImg("detections/"+loc?.state?.src.substring(8))


    var formdata = new FormData();
    formdata.append("images", loc?.state?.src.substring(8));

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://172.18.12.202:5000//image", requestOptions)
      .then(response => {
        // console.log(response)
        return response.text()})
      .then(result => {
        setImg("detections/"+loc?.state?.src.substring(8))
        // console.log(result)
        setData(result)
        // const options = {
        //   method: 'POST',
        //   headers: {
        //       'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(data)
        // };
        // console.log("Request Made to API to dump into MongoDB")
        // fetch("http://localhost:4000/auto_annotations",options);
      })
      .catch(error => console.log('error', error));
      

    // console.log("hello")
    // const formData = new FormData();
    // formData.append('images', 'C:/Users/1999s/OneDrive/Desktop/Xdrive/Frontend/x-drive/public/images/cabc30fc-e7726578.jpg');
    // console.log("Imgpath:",'../../../public/images',loc?.state?.src)
    // let data = await fetch('http://192.168.0.103:5000/image',{method:'POST',body:JSON.stringify({images: loc?.state?.src}) , mode:'no-cors', headers:{'Content-Type': 'multipart/form-data'}})//.then(response=>response.json())
    // console.log(formData)
    // console.log(image)
    // let data = await fetch('http://192.168.0.103:5000/image',{method:'POST',body:formData , mode:'no-cors'})
    
    
    // // console.log("DATA", data)
    // data = await data?.json()
    // // const data = 'https://media.istockphoto.com/photos/generic-red-suv-on-a-white-background-side-view-picture-id1157655660?k=20&m=1157655660&s=612x612&w=0&h=WOtAthbmJ9iG1zbKo4kNUsAGMe6-xM-E7a8TMxb5xmk=';
    // setImg(data)
  }

  return (
      <div>
        <div  className="imgPanel">
          <h1>Image: {loc?.state?.src.split("\\")[3]}</h1>
          <button className="btn btn-success" onClick={ClickHandler}> Annotate</button>
        </div>
        {loc && <img src={img || loc?.state?.src} alt=''></img>} 
        <div>
          {/* <input type='file' name='inpFile' onInput={(e)=>{
            // console.log(e)
            setImage(e.target.files)
            const formData = new FormData();
            formData.append({images: images})
            console.log("FormData", formData)
            let data = fetch('http://192.168.0.103:5000/image',{method:'POST',body:formData , mode:'no-cors'})
            data=data.json()
            console.log("Data", data)
            setImg(data)
            }}/>   */}
        </div>        
      </div>
  );
};



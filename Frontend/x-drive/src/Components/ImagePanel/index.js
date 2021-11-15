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
    var formdata = new FormData();
    console.log(e.target)
    formdata.append("file1", e.target.file)
    // const reader = new FileReader();
    // reader.onload = () =>{
    //   if(reader.readyState === 2){
    //     // this.setState({profileImg: reader.result})
    //     fileInput = reader.result;
    //     console.log(reader.result)
    //   }
    // formdata.append("file1", fileInput.files[0], "/E:/bdd100k_images_100k/bdd100k/images/100k/test/cac07407-0396e053.jpg");

    // formdata.append("file1", loc?.state?.src);
    // console.log("image: ",dataset_path + loc?.state?.src.replace('\\','/'))
    // console.log('send_data', formdata)

    var requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://2905-35-236-129-183.ngrok.io/get_image", requestOptions)
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
    console.log(formdata)
    formdata.append("images", loc?.state?.src);

    var requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://192.168.0.104:5000/image", requestOptions)
      .then(response => {
        console.log(response)
        return response.text()})
      .then(result => {
        // console.log(loc)
        setImg("\\detections"+loc?.state?.src)
        console.log("Result:",result)
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
          <div>
          <label htmlFor="input"> Instance Segment: &nbsp;</label>
          <input type='file' onChange={SegmentationHandler}/>
          </div>
          {/* <button className="btn btn-warning" onClick={SegmentationHandler}>Segmentation</button> */}
          &nbsp;
          <button className="btn btn-success" onClick={ClickHandler}> Bounding-Box</button>
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



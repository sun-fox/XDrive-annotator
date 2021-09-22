import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import './index.css'

export default function ImagePanel() {
  const loc = useLocation();
  console.log(loc);

  const [img,setImg] = useState()

  const ClickHandler= async()=>{
    // let data = await fetch('http://192.168.0.103:5000/image',{method:'POST',body:loc?.state?.src})
    // data = await data.json()
    const data = 'https://media.istockphoto.com/photos/generic-red-suv-on-a-white-background-side-view-picture-id1157655660?k=20&m=1157655660&s=612x612&w=0&h=WOtAthbmJ9iG1zbKo4kNUsAGMe6-xM-E7a8TMxb5xmk=';
    setImg(data)
  }

  return (
      <div>
        <div  className="imgPanel">
          <h1 style={{fontSize:'2rem'}}>ImageName/Path: '/Image/euogfipqhpf_wegoue.jpg'</h1>
          <button className="btn btn-success" onClick={ClickHandler}> Annotate</button>
        </div>
        {loc && <img src={img || loc?.state?.src} alt=''></img>}         
      </div>
  );
};



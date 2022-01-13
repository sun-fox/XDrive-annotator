import React from "react";
import ReactImageAnnotate from "react-image-annotate"
import { useLocation } from "react-router-dom";
import './index.css'

export default function ReactAnnotator() {
    const loc = useLocation();
    console.log("Hello",loc?.state?.src)

    return  (
        <ReactImageAnnotate
        selectedImage= {loc.state.src}   
        taskDescription="# Draw region around each object in the field of view."
        images={[{ src: loc?.state?.src, name: loc?.state?.src.split("\\")[3]}]}
        regionClsList={["biker", "car", "pedestrian", "trafficLight", "truck"]}
        showPointDistances={true}
        enabledTools={["create-box"]}
        onExit={(e)=>{
            console.log("Printing Values!!")
            console.log(e.images[0])
            let data = e.images[0];
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            try{
                fetch("http://localhost:4000/new_annotations",options);
            }
            catch(e){}
        }}
        />
        // How to pass a path : selectedImage="./images/cabc30fc-e7726578.jpg"
    );
};



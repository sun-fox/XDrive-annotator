import React, {useState, useEffect} from "react";
import Pagination from "../Pagination";
import Wrapper from "../wrapper";
import axios from "axios"
import {useHistory} from "react-router-dom"

import "./index.css";
export default function DatasetDisplayer(props) {
  const [data,setData]= useState()
  const history = useHistory();
  // const {showDatasets, setShowDatasets} = props
//   const [loading, setLoading] = useState(false);
  // const [flag, setFlag] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); //Number of Images, per image crude set.



  useEffect(() => {
    // setLoading(true);
    fetch('http://localhost:4000/get_datasets').then((data)=>{return data.json()}).then((data)=>{
      console.log("Incoming Data", data)
      setData(data);
    //   setLoading(false);
    })
  }, [])

// Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData =data?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Wrapper>
    <div className="rsContainer" style={{marginBottom:'10px'}}>
          <div className="rsContainerTop" style={{backgroundColor:'rgb(66, 65, 65)'}}>
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link disabled" aria-current="page" href="#">Images</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#">Datasets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Members</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Statistics</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">Settings</a>
              </li>
            </ul>
          </div>
          <div className="rsImageContainer" style={{marginTop:'10px',justifyContent:"space-around"}}>
            {currentData?.map((singleData) => {
              return (
                <div>
                    <div className="card text-center" style={{width: '18rem', marginBottom: '5px'}}>
                    <img src={"./folder.png"} class="card-img-top" alt=""></img>
                    <div className="card-body">
                    <h5 className="card-title" style={{fontSize:'1.5rem'}}>{singleData}</h5>
                    {/* <p className="card-text">The Information about the dataset goes here...</p> */}
                    <div className="btn btn-success" style={{width:'80%', marginTop:'5px'}} onClick={()=>{
                      // setShowDatasets(singleData)
                      history.push("/datasets/"+singleData)
                    }}>Show</div>
                     <div className="btn btn-info" style={{width:'80%', marginTop:'5px'}} onClick={(e)=>{
                         e.preventDefault()
                         console.log("to be written")
                         var formdata = new FormData();
                         formdata.append("dataset", singleData);

                         var requestOptions = {
                          method: 'POST',
                          mode:'no-cors',
                          body: formdata,
                          redirect: 'follow'
                        };

                        fetch("http://192.168.0.104:5000/annotate_dataset", requestOptions)
                          .then(response => {
                            console.log(response)
                            return response.text()})
                          .then(result => {
                            // setImg("detections/"+loc?.state?.src.substring(8))
                            // setData(result)
                          })
                          .catch(error => console.log('error', error));

                        // setFlag(true)

                        // fetch("http://localhost:4000/annotate_dataset", requestOptions)
                        //   .then(response => {
                        //     console.log(response)
                        //     return response.text()})
                        //   .then(result => {
                        //     console.log(result)
                        //     // setImg("detections/"+loc?.state?.src.substring(8))
                        //     // setData(result)
                        //   })
                        //   .catch(error => console.log('error', error));
                        
                        // var FormData = require('form-data');
                        // var data = new FormData();
                        // data.append('dataset', singleData);

                        // var config = {
                        //   method: 'post',
                        //   url: 'http://192.168.0.104:5000/annotate_dataset',
                        //   data : data
                        // };

                        //   axios(config)
                        //   .then(function (response) {
                        //     console.log(JSON.stringify(response.data));
                        //   })
                        //   .catch(function (error) {
                        //     console.log(error);
                        //   });


                    }}>Auto-Annotate</div>
                    
                    {/* { flag ?
                    <div> */}
                      <div className="btn btn-outline-danger" style={{width:'80%', marginTop:'5px'}} onClick={()=>{
                        // setShowDatasets(singleData)
                        history.push("/annotated/"+singleData)
                      }}>Annotations</div>
                      <div className="btn btn-outline-primary" style={{width:'80%', marginTop:'5px'}} onClick={()=>{
                        // setShowDatasets(singleData)
                        history.push("/report/"+singleData)
                      }}>Report</div>
                      {/* </div>
                      : null
                    } */}
                    </div>
                </div>
              </div>
              );
            })}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={data?.length}
            paginate={paginate}/>
        </div>
    </Wrapper>
    
  );
}


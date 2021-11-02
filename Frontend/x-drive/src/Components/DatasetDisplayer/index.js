import React, {useState, useEffect} from "react";
import Pagination from "../Pagination";
import Wrapper from "../wrapper";
import {useHistory} from "react-router-dom"

import "./index.css";
export default function DatasetDisplayer(props) {
  const [data,setData]= useState()
  const history = useHistory();
  // const {showDatasets, setShowDatasets} = props
//   const [loading, setLoading] = useState(false);
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
                    <h5 className="card-title">{singleData}</h5>
                    <p className="card-text">The Information about the dataset goes here...</p>
                    <div className="btn btn-success" style={{width:'80%', marginTop:'5px'}} onClick={()=>{
                      // setShowDatasets(singleData)
                      history.push("/datasets/"+singleData)
                    }}>Show</div>
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

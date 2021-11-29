import React, {useState, useEffect} from "react";
// import { data } from "../../data";
import Card from "../report_card";
import Pagination from "../Pagination";
import Wrapper from "../wrapper";
// import {useHistory} from "react-router-dom"

import "./index.css";
export default function Report({match}) {
  const [data,setData]= useState()
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/get_report/'+match.params.folder).then((data)=>{return data.json()}).then((data)=>{
      setData(data);
      setLoading(false);
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
                <a class="nav-link active" aria-current="page" href="#">Images</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Exports</a>
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
          <div className="rsImageContainer" style={{marginTop:'10px'}}>
            {currentData?.map((singleData) => {
              return (
                <Card
                  src={singleData.Image.split('public')[1]}
                  key={singleData.Image.split('.')[1]}
                  image={singleData.Image}
                  detects ={singleData.detections}
                />
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


import React, {useState, useEffect} from "react";
// import { data } from "../../data";
import Card from "../Card";
import Pagination from "../Pagination";

import "./rightSide.css";
export default function RightSide() {
  const [data,setData]= useState()
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/get_images').then((data)=>{return data.json()}).then((data)=>{
      // data.forEach(element => {
      //   element.replace("\\","/")
      // });
      // console.log("Incoming Data", data)
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
              src={singleData}
              key={singleData.split('.')[1]}
              image={singleData}
            />
          );
        })}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data?.length}
        paginate={paginate}/>
    </div>
  );
}


// const Posts = ({ posts, loading }) => {
//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <ul className='list-group mb-4'>
//       {posts.map(post => (
//         <li key={post.id} className='list-group-item'>
//           {post.title}
//         </li>
//       ))}
//     </ul>
//   );
// };

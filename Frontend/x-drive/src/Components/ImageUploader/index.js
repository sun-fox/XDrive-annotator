import React, { Component } from 'react';
import './index.css';
import axios from "axios";
export class App extends Component {
  state={
    profileImg:'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'
  }
  imageHandler = (e) => {
	console.log(e.target.value)
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({profileImg: reader.result})

		// var dataset = 'qwertyu'
		console.log("help:", this.props.dat_name)
		const files = e.target.files;
		let formData = new FormData();

		for (const key of Object.keys(files)) {
		formData.append("imagesArray", files[key]);
		}
		// formData.append("dat_name",dataset);
		axios.post(`http://localhost:4000/upload_dataset/${this.props.dat_name}`, formData, {}).then((response) => {
		// setImg(response.data);
		console.log(response.data);
		});
	   }
    }
    reader.readAsDataURL(e.target.files[0])
  };

//   imageAdder = (e) => {
// 	  console.log(e.target)
	// const reader = new FileReader();
	//   reader.onload = () =>{
	//     if(reader.readyState === 2){
	//       // this.setState({profileImg: reader.result})
	//       file_path = reader.result;
	//       console.log(reader.result)
	//     }
	//   }
	//   reader.readAsDataURL(e.target.files[0])
	//   console.log("Image")
	//   var formdata = new FormData();
	//   formdata.append("file",e.target.values);
  
	//   var requestOptions = {
	//     method: 'POST',
	//     mode:'no-cors',
	//     body: formdata,
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
// 	}
//   };


	render() {
    const { profileImg} = this.state
		return (
			<div className="page">
				<div className="container">
					<h1 className="heading">Add an Image to this Dataset</h1>
					<span>Preview:</span>
					<div className="img-holder">
						<img src={profileImg} alt="" id="img" className="img" />
					</div>
					<input type="file" accept="image/*" name="image-upload" id="input" multiple onChange={this.imageHandler} />
					<div className="label">
					<label className="btn btn-primary image-upload" htmlFor="input">Browse</label>
					</div>
					{/* <button className="btn btn-success" onClick={this.imageAdder}>Add</button> */}
				</div>
			</div>
		);
	}
}

export default App;
import React, { Component } from 'react';
import './index.css';
export class App extends Component {
  state={
    profileImg:'https://lh3.googleusercontent.com/proxy/OxgK8d6yYc99sjB2vCxn95FYmg5w4RHroNkdHm5ihFkx57jSMkDl8K9CxoY_DZZLg-FQVjRjz5SWeGMe0PtQYJXubzPHoTPXABa5HZa5H1Z7-g'
  }
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({profileImg: reader.result})

      }
    }
    reader.readAsDataURL(e.target.files[0])
  };

  imageAdder = (e) => {
	  console.log("Image to be Dumped in public.")
  };
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
					<input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
					<div className="label">
					<label className="btn btn-primary image-upload" htmlFor="input">Browse</label>
					</div>
					<button className="btn btn-success" onClick={this.imageAdder}>Add</button>
				</div>
			</div>
		);
	}
}

export default App;
import React, { Component } from "react";
import axios from "axios";
import FileViewer from 'react-file-viewer';
import './Upload.css'


export class Upload extends Component {
  state = {
    file: "",
    filePath: "",
    blobUrl: null
  };

  onChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //When the user starts filling the form, e.target.value will be empty. So seperate handler should be written for file handling.
  fileHanlde = e => {
    e.preventDefault();
    console.log("file", e.target.files);
    this.setState({
      file: e.target.files[0]
    });
    const formData = new FormData();

    //HTML 'name' attribute should match with first argument of append
    formData.append("image", this.state.file);
    formData.append("filePath", this.state.filePath);
    e.preventDefault();


    //This is for preview of file uploaded
    this.setState({
      filePath: URL.createObjectURL(e.target.files[0])
    });
  };

  onSubmitClick = e => {
    // const formData = new FormData();

    // //HTML 'name' attribute should match with first argument of append
    // formData.append("image", this.state.file);
    // formData.append("filePath", this.state.filePath);

    let fileData = {
      fileName: this.state.file.name
    };
    e.preventDefault();

    console.log("state", this.state);

    axios
      .post("http://localhost:5000/api/upload/file", fileData)
      .then(res => {
        console.log("res", res.data);
        this.setState({
          blobUrl: res.data.url
        });
      })
      .catch(err => console.log("err", err));
  };

  render() {
    console.log('state', this.state)
    return (
      <div style={{ marginTop: "100px" }}>
        <center>
          <form onSubmit={this.onSubmitClick}>
            <input type="file" name="image" onChange={this.fileHanlde} />
            <button type="submit">Upload</button>
          </form>
          <br />

         { this.state.blobUrl ? <FileViewer
            fileType={"csv"}
            filePath={this.state.blobUrl}
          /> : null}
        </center>
      </div>
    );
  }
}

export default Upload;

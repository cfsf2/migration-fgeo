import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { apiFarmageo } from "../../../config";

class ImgUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagen: null,
    };
  }

  submitFile = (event) => {
    const formData = new FormData();
    formData.append("file", this.state.imagen[0]);
    axios
      .post(apiFarmageo + "/imagenes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        this.props.handleImg(
          response.data.Key,
          this.props.name,
          this.state.imagen[0].name
        );
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  handleFileUpload = async (event) => {
    await this.setState({ imagen: event.target.files });
    this.submitFile();
  };

  render() {
    return (
      <form onSubmit={this.submitFile}>
        <input width="100%" type="text" value={this.props.value} />
        <input
          type="button"
          value="Seleccionar archivo"
          onClick={() => document.getElementById(this.props.name).click()}
          className="btn btn-add-to-car d-block"
        />
        <input
          width="100%"
          type="file"
          size="sm"
          onChange={this.handleFileUpload}
          accept="image/gif, image/jpeg, image/png, .pdf"
          style={{ display: "none" }}
          name={this.props.name}
          id={this.props.name}
        />
      </form>
    );
  }
}

export default ImgUploader;

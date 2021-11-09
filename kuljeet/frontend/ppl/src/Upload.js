import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dropzone from "react-dropzone";
import Dropdown from "react-dropdown";
import "./App.css";
import { DropdownList } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";
let category = ["Dog", "Cat", "Bird", "Rabbit", "Others"];
class Upload extends Component {
  constructor(props) {
    super(props);
    console.log("child constructor", this.props);
    this.state = {
      description: "",
      value: "cat",

      accepted: [{ preview: "../images/icon_004.png" }]
    };
  }

  handleClick = e => {
    e.preventDefault();

    console.log(this.state.accepted[0]);
    let formData = new FormData();

    formData.append("file", this.state.accepted[0]);
    formData.append("description", this.state.description);
    formData.append("category", this.state.value);
    formData.append("username", JSON.parse(localStorage.getItem("data"))[1]);
    let options = {
      method: "POST",

      body: formData
    };

    fetch("http://localhost:1414/def/uploadpost", options)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.props.changePage();
      })

      .catch(err => {
        console.log(err);
      });
  };
  updateState = e => {
    console.log("", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  updateState2 = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    console.log("child", this.props);
    console.log("render");
    return (
      <div className="content_rgt2">
        <div className="login_sec">
          <section>
            <div className="dropzone">
              <Dropzone
                name="file"
                onDrop={accepted => {
                  this.setState({ accepted });
                }}
              >
                <img className="drop" src={this.state.accepted[0].preview} />
              </Dropzone>
            </div>
            <aside>
              <h2>Dropped Image </h2>
              <ul>
                {this.state.accepted.map(f => (
                  <li>
                    {f.name} - {f.size} bytes
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <li>
            <li>Description</li>

            <input
              type="text"
              name="description"
              ref="description"
              onChange={this.updateState}
            />
          </li>

          <li>
            <li>Category</li>

            <select value={this.state.value} onChange={this.updateState2}>
              {this.props.categories.map(a => {
                return <option value={a.category}>{a.category}</option>;
              })}
            </select>
          </li>

          <br />
          <li>
            <br />

            <input
              type="submit"
              defaultValue="Upload"
              onClick={this.handleClick}
            />
          </li>
        </div>
      </div>
    );
  }
}

export default Upload;

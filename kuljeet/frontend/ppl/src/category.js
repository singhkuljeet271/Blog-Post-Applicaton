import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dropzone from "react-dropzone";
class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      accepted: [{ preview: "../images/icon_004.png" }]
    };
  }

  handleClick = e => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("file", this.state.accepted[0]);
    formData.append("category", this.state.category);
    let options = {
      method: "POST",

      body: formData
    };

    fetch("http://localhost:1414/ghi/addcategory", options)
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
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
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
              <h2>Dropped Icon</h2>
            </aside>
          </section>

          <li>
            <input
              type="text"
              name="category"
              ref="category"
              onChange={this.updateState}
            />
          </li>

          <br />
          <li>
            <input
              type="submit"
              defaultValue="Add"
              onClick={this.handleClick}
            />
          </li>
        </div>
      </div>
    );
  }
}

export default Category;

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { Redirect } from "react-router-dom";
class Singlepost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      singlepost: this.props.singlepost,
      comment: {}
    };
  }

  render() {
    {
      return (
        <div>
          <div className="contnt_2">
            <div className="div_a">
              <div className="div_title">
                {this.props.singlepost.description}
              </div>
              <div className="btm_rgt">
                <div className="btm_arc"> {this.props.singlepost.category}</div>
              </div>
              <div className="div_top">
                <div className="div_top_lft">
                  <img src="../images/img_6.png" />{" "}
                  {this.props.singlepost.username}
                </div>
                <div className="div_top_rgt">
                  <span className="span_date">
                    {" "}
                    {this.props.singlepost.date}
                  </span>
                  <span className="span_time">
                    {" "}
                    {this.props.singlepost.time}
                  </span>
                </div>
              </div>
              <div className="div_image">
                <img
                  src={
                    "http://localhost:1414/uploads/" +
                    this.props.singlepost.imagename
                  }
                  alt="pet"
                />
              </div>
              <div className="div_btm">
                <div className="btm_list">
                  <ul>
                    <li>
                      <a href="#">
                        <span className="btn_icon">
                          <img src="../images/icon_001.png" alt="share" />
                        </span>Share
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="btn_icon">
                          <img src="../images/icon_002.png" alt="share" />
                        </span>{" "}
                        {this.props.singlepost.clicks} Click
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={e => {
                          this.props.postLike(e, this.state.singlepost);
                        }}
                      >
                        <span className="btn_icon">
                          <img src="../images/icon_003.png" alt="share" />
                        </span>{" "}
                        {this.props.singlepost.like.length} Likes
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="btn_icon">
                          <img src="../images/icon_004.png" alt="share" />
                        </span>
                        {this.props.singlepost.comment.length} Comments
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="contnt_3">
            <ul>
              {this.props.singlepost.comment.map(a => {
                return (
                  <li>
                    <div className="list_image">
                      <div className="image_sec">
                        <img src="../images/post_img.png" />
                      </div>
                      <div className="image_name">{Object.keys(a)[0]}</div>
                    </div>
                    <div className="list_info">{Object.values(a)[0]}</div>
                    <input
                      type="button"
                      defaultValue="Reply"
                      className="orng_btn"
                    />
                  </li>
                );
              })}

              <li>
                <div className="cmnt_div1">
                  <input
                    type="text"
                    placeholder="Enter your Comment"
                    className="cmnt_bx1"
                    onChange={this.props.updateState3}
                  />
                  <input
                    type="submit"
                    className="sub_bttn1"
                    defaultValue="Submit Comment"
                    onClick={this.props.handleComment}
                  />
                </div>
              </li>
            </ul>
            <div className="view_div">
              <a href="#">View more</a>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default Singlepost;

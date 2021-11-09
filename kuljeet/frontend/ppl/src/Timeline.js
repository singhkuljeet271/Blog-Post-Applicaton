import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

class Timeline extends Component {
  constructor(props) {
    super(props);
    console.log("constructor timeline ka");
  }

  latestFirst = () => {
    this.props.uploaddata.sort(function(a, b) {
      var dateA = new Date(a.iso),
        dateB = new Date(b.iso);
      return dateB - dateA;
    });
  };
  oldestFirst = () => {
    this.props.uploaddata.sort(function(a, b) {
      var dateA = new Date(a.iso),
        dateB = new Date(b.iso);
      return dateA - dateB;
    });
  };
  mostCommented = () => {
    this.props.uploaddata.sort(function(a, b) {
      var c = a.comment.length,
        d = b.comment.length;
      return d - c;
    });
  };
  mostClick = () => {
    this.props.uploaddata.sort(function(a, b) {
      var c = a.clicks,
        d = b.clicks;
      return d - c;
    });
  };

  render() {
    return (
      <div>
        <div className="contnt_1">
          <div className="post_div">
            <div className="post_list">
              <ul>
                <li>
                  <a href="#" onClick={this.latestFirst}>
                    <span className="list_img">
                      <img src="../images/img_1.png" />
                    </span>Latest First
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.oldestFirst}>
                    <span className="list_img">
                      <img src="../images/img_2.png" />
                    </span>Oldest First
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="list_img">
                      <img src="../images/img_3.png" />
                    </span>Most Pet
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.mostClick}>
                    <span className="list_img">
                      <img src="../images/img_4.png" />
                    </span>Most Clicks
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.mostCommented}>
                    <span className="list_img">
                      <img src="../images/img_5.png" />
                    </span>Most Commented
                  </a>
                </li>
              </ul>
            </div>
            <div className="post_txt">4 New Post Updates</div>
          </div>
        </div>
        <div>
          <ul>
            {this.props.uploaddata.map(a => {
              return (
                <div>
                  <li>
                    <div className="contnt_2">
                      <div className="div_a">
                        <div className="div_title"> {a.description}</div>
                        <div className="btm_rgt">
                          <div className="btm_arc">{a.category}</div>
                        </div>
                        <div className="div_top">
                          <div className="div_top_lft">
                            <img src="../images/img_6.png" />
                            {a.username}
                          </div>
                          <div className="div_top_rgt">
                            <span className="span_date">{a.date}</span>
                            <span className="span_time">{a.time}</span>
                          </div>
                        </div>
                        <div className="div_image">
                          <a href="#">
                            <img
                              src={
                                "http://localhost:1414/uploads/" + a.imagename
                              }
                              alt="pet"
                              onClick={e => {
                                this.props.postChange(e, a);
                              }}
                            />{" "}
                          </a>
                        </div>
                        <div className="div_btm">
                          <div className="btm_list">
                            <ul>
                              <li>
                                <a href="#">
                                  <span className="btn_icon">
                                    <img
                                      src="../images/icon_001.png"
                                      alt="share"
                                    />
                                  </span>Share
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <span className="btn_icon">
                                    <img
                                      src="../images/icon_002.png"
                                      alt="share"
                                    />
                                  </span>{" "}
                                  {a.clicks} Click
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  onClick={e => {
                                    this.props.postLike(e, a);
                                  }}
                                >
                                  <span className="btn_icon">
                                    <img
                                      src="../images/icon_003.png"
                                      alt="share"
                                    />
                                  </span>
                                  {a.like.length} Likes
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <span className="btn_icon">
                                    <img
                                      src="../images/icon_004.png"
                                      alt="share"
                                    />
                                  </span>
                                  {a.comment.length} Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              );
            }, this)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Timeline;

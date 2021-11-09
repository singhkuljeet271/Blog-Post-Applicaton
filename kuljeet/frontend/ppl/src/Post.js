import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            {this.props.uploaddata.map(a => {
              return (
                <div>
                  <div className="contnt_2">
                    <div className="div_a">
                      <div className="div_title">{a.description}</div>
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
                            src={"http://localhost:1414/uploads/" + a.imagename}
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
                                {a.like.length}Likes
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="btn_icon">
                                  <img
                                    src="../images/icon_004.png"
                                    alt="share"
                                  />
                                </span>{" "}
                                {a.comment.length} Comments
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }, this)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Post;

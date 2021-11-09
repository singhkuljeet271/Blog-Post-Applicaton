import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dropzone from "react-dropzone";
import Upload from "./Upload";
import { Link } from "react-router-dom";
import Singlepost from "./Singlepost";
import Category from "./category";
import Post from "./Post";
import Timeline from "./Timeline";
import "./App.css";
import { Redirect } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
let found;
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadpost: false,
      addcategories: false,
      categories: [],
      logout: false,
      singlepost: {},
      singlepostgo: false,
      post: true,
      id: "",
      like: "",
      uploaddata: [],
      uploaddata2: [],
      timelineClick: false,
      uploadClick: true,

      comment: {},

      body: ""
    };
    console.log(this.state.body);
  }

  handleComment = e => {
    e.preventDefault();

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    };

    fetch("http://localhost:1414/def/updatecomment", options)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log("vasuuuuuu", data);
        this.setState({ singlepost: data });
      })

      .catch(err => {
        console.log(err);
      });
  };
  updateState3 = e => {
    this.setState({
      comment: { [JSON.parse(localStorage.getItem("data"))[1]]: e.target.value }
    });
  };

  logOut = () => {
    localStorage.clear();
    this.setState({ logout: true });
  };
  changeTimeline = e => {
    e.preventDefault();
    this.setState({ timelineClick: false });
    this.setState({ uploadClick: true });
    this.setState({ body: "" });

    this.setState({ post: true });
    this.setState({ singlepostgo: false });
    let options3 = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    };
    fetch("http://localhost:1414/def/reg", options3)
      .then(response => response.json())
      .then(json => {
        this.setState({ uploaddata: json });
      })
      .catch(err => {
        console.log(err);
      });
  };
  changePost = e => {
    e.preventDefault();
    this.setState({ timelineClick: true });
    this.setState({ uploadClick: false });

    this.setState({ body: JSON.parse(localStorage.getItem("data"))[1] });
    this.setState({ post: false });
    this.setState({ singlepostgo: false });

    let options3 = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    };
    fetch("http://localhost:1414/def/reg", options3)
      .then(response => response.json())
      .then(json => {
        this.setState({ uploaddata: json });
      })
      .catch(err => {
        console.log(err);
      });
  };
  postCategories = (e, a) => {
    found = this.state.uploaddata.filter(element => {
      return element.category == a.category;
    });

    this.setState({ uploaddata: found }, () => {});
  };
  postLike = (e, a) => {
    e.preventDefault();

    let data = { id: a._id, like: JSON.parse(localStorage.getItem("data"))[1] };
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    fetch("http://localhost:1414/def/updatelike", options)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(json => {
        console.log("like----", json);
        this.setState({ uploaddata: json[1] });
        this.setState({ singlepost: json[0] });
      })
      .catch(err => {
        console.log(err);
      });
  };
  postChange = (e, a) => {
    e.preventDefault();
    console.log("hello dosto");
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(a)
    };

    fetch("http://localhost:1414/def/updateclick", options)
      .then(response => response.json())
      .then(json => {
        console.log("update clickk-----", json);
        this.setState({ singlepost: a }, () => {
          console.log(this.state.singlepost);
        });
        this.setState({ singlepostgo: true });
      })
      .catch(err => {
        console.log(err);
      });
  };
  changePage = () => {
    fetch("http://localhost:1414/ghi/getcategory")
      .then(response => response.json())
      .then(json => {
        this.setState({ categories: json });
      })
      .catch(err => {});
    this.setState({ uploadpost: false });
    this.setState({ addcategories: false });
    let options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    };
    fetch("http://localhost:1414/def/reg", options)
      .then(response => response.json())
      .then(json => {
        this.setState({ uploaddata: json });
      })
      .catch(err => {
        console.log(err);
      });
    // window.location.reload();
  };

  componentDidMount() {
    console.log("parent ka component did mount");
    if (JSON.parse(localStorage.getItem("data")) == null) {
      alert("you Cant acess this page");
      this.props.history.push("/Login");
    }

    fetch("http://localhost:1414/ghi/getcategory")
      .then(response => response.json())
      .then(json => {
        console.log("<<<<<data", json);
        this.setState({ categories: json });
      })
      .catch(err => {
        console.log(err);
      });

    let options3 = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    };
    fetch("http://localhost:1414/def/reg", options3)
      .then(response => response.json())
      .then(json => {
        this.setState({ uploaddata: json });
      })
      .catch(err => {
        console.log(err);
      });
    console.log("componentdidmount profile ka ");
    let options2 = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    };
    fetch("http://localhost:1414/def/allcomment", options2)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ singlepost: json[0] });
      })

      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log("parent ka render");

    if (this.state.logout == true) {
      return <Redirect to="/Login" />;
    } else {
      return (
        <div>
          <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="navbar-inner">
              <div className="container">
                <button
                  type="button"
                  className="btn btn-navbar"
                  data-toggle="collapse"
                  data-target=".nav-collapse"
                >
                  {" "}
                  <span className="icon-bar" /> <span className="icon-bar" />{" "}
                  <span className="icon-bar" />{" "}
                </button>
                <a className="brand" href>
                  PPL
                </a>
                <div className="pro_info pull-right">
                  <div className="pro_icn">
                    <img src="images/pic_small.png" />
                  </div>
                  <div className="pro_txt">
                    Me<b className="caret" />
                  </div>
                  <ul
                    className="dropdown-menu"
                    role="menu"
                    aria-labelledby="dLabel"
                  >
                    <li>
                      <a tabIndex={-1} href="#">
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a tabIndex={-1} href="#">
                        Message Box
                      </a>
                    </li>
                    <li>
                      <a tabIndex={-1} href="#">
                        Change Language
                      </a>
                    </li>
                    <li className="divider" />
                    <li>
                      <a tabIndex={-1} href="#">
                        <input type="text" placeholder="search" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="nav-collapse collapse">
                  <ul className="nav">
                    <li className="active">
                      {" "}
                      <a href="#">Home</a>{" "}
                    </li>
                    <li className>
                      {" "}
                      <a href>E-Coupons</a>{" "}
                    </li>
                    <li className>
                      {" "}
                      <a href>E-Brands</a>{" "}
                    </li>
                    <li className>
                      {" "}
                      <a href>Resuse Market</a>{" "}
                    </li>
                    <li className>
                      {" "}
                      <a href>Lost and Found</a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header">
            <div className="header_lft">
              <div className="logo">
                <a href="#">
                  <img src="images/logo.png" />
                </a>
              </div>
              <div className="navigatn">
                <ul>
                  <li>
                    <a href="#" className="active">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#"> E-Coupons </a>
                  </li>
                  <li>
                    <a href="#">E-Brands </a>
                  </li>
                  <li>
                    <a href="#"> Resuse Market </a>
                  </li>
                  <li>
                    <a href="#"> Lost and Found</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="header_rgt">
              <div className="flag_div">
                <img src="images/flag.png" />
              </div>
              <input type="text" placeholder="Search" className="txt_box" />
              <div className="msg_box">
                <a href="#">
                  <span className="msg_count">100</span>
                </a>
              </div>
              <div className="info_div">
                <div className="image_div">
                  {" "}
                  <img src="images/pic.png" />{" "}
                </div>
                <div className="info_div1">
                  <a href="#" onClick={this.logOut} style={{ color: "white" }}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="rght_btn">
                  {" "}
                  <span className="rght_btn_icon">
                    <img src="images/btn_iconb.png" alt="up" />
                  </span>{" "}
                  <span className="btn_sep">
                    <img src="images/btn_sep.png" alt="sep" />
                  </span>{" "}
                  <a
                    href="#"
                    name="uploadpost"
                    onClick={() => {
                      this.setState({ uploadpost: true });
                    }}
                  >
                    Upload Post
                  </a>{" "}
                </div>
                <div className="rght_btn">
                  {" "}
                  <span className="rght_btn_icon">
                    <img src="images/btn_icona.png" alt="up" />
                  </span>{" "}
                  <span className="btn_sep">
                    <img src="images/btn_sep.png" alt="sep" />
                  </span>{" "}
                  <a
                    href="#"
                    name="addcategories"
                    onClick={() => {
                      this.setState({ addcategories: true });
                    }}
                  >
                    Add Categories
                  </a>{" "}
                </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="rght_cat_bg">
                    Categories
                  </div>
                  {this.state.addcategories ? (
                    <Category changePage={this.changePage} />
                  ) : null}
                  <div className="rght_list">
                    <ul>
                      {this.state.categories.map(a => {
                        return (
                          <li>
                            <a
                              href="#"
                              onClick={e => {
                                this.postCategories(e, a);
                              }}
                            >
                              <span className="list_icon">
                                <img
                                  className="ico"
                                  src={
                                    "http://localhost:1414/uploads/" +
                                    a.imagename
                                  }
                                />{" "}
                              </span>
                              {a.category}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="opn_cat_bg">
                    Featured
                  </div>
                  <div className="sub_dwn">
                    <div className="feat_sec">
                      <div className="feat_sec_img">
                        <img src="images/feat_img1.png" alt="image" />
                      </div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img">
                        <img src="images/feat_img2.png" alt="image" />
                      </div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Dogs</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img">
                        <img src="images/feat_img3.png" alt="image" />
                      </div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Rabbits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content_lft">
                <div className="contnt_1">
                  <div className="timeline_div">
                    <div className="timeline_div1">
                      <div className="profile_pic">
                        <img src="images/timeline_img1.png" />
                        <div className="profile_text">
                          <a href="#">Change Profile Pic</a>
                        </div>
                      </div>
                      <div className="profile_info">
                        <div className="edit_div">
                          <a href="#">
                            Edit <img src="images/timeline_img.png" />
                          </a>
                        </div>
                        <div className="profile_form">
                          <ul>
                            <li>
                              <div className="div_name1">Name :</div>
                              <div className="div_name2">Stefiney Gibbs</div>
                            </li>
                            <li>
                              <div className="div_name1">Sex :</div>
                              <div className="div_name2">Female</div>
                            </li>
                            <li>
                              <div className="div_name1">Description :</div>
                              <div className="div_name3">
                                This is an example of a comment. You can create
                                as many comments like this one or sub comments
                                as you like and manage all of your content
                                inside Account.
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="timeline_div2">
                      <ul>
                        <li>
                          <a
                            href="#"
                            className={this.state.timelineClick ? "active" : ""}
                            onClick={this.changePost}
                            ref="timeline"
                          >
                            Timeline
                          </a>
                        </li>
                        <li>
                          <a href="#">About </a>
                        </li>
                        <li>
                          <a href="#">Album</a>
                        </li>
                        <li>
                          <a href="#"> Pets</a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className={this.state.uploadClick ? "active" : ""}
                            onClick={this.changeTimeline}
                            ref="myUpload"
                          >
                            My Uploads{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {this.state.uploadpost ? (
                  <Upload
                    changePage={this.changePage}
                    categories={this.state.categories}
                  />
                ) : null}
                <Switch>
                  <Route
                    exact
                    path="/Profile/Timeline"
                    render={props => (
                      <Timeline
                        uploaddata={this.state.uploaddata}
                        postChange={this.postChange}
                        postLike={this.postLike}
                        {...props}
                      />
                    )}
                  />{" "}
                  <Route
                    exact
                    path="/Profile"
                    render={props => (
                      <Post
                        uploaddata={this.state.uploaddata}
                        postChange={this.postChange}
                        postLike={this.postLike}
                        {...props}
                      />
                    )}
                  />{" "}
                  <Route
                    exact
                    path="/Profile/Singlepost"
                    render={props => (
                      <Singlepost
                        handleComment={this.handleComment}
                        singlepost={this.state.singlepost}
                        postLike={this.postLike}
                        updateState3={this.updateState3}
                        {...props}
                      />
                    )}
                  />{" "}
                </Switch>

                {this.state.singlepostgo ? (
                  <Redirect to="/Profile/Singlepost" />
                ) : this.state.post ? (
                  <Redirect to="/Profile" />
                ) : (
                  <Redirect to="/Profile/Timeline" />
                )}
              </div>
            </div>
            <div className="clear" />
          </div>

          <div className="footr">
            <div className="footr_lft">
              <div className="footer_div1">
                Copyright © Pet-Socail 2014 All Rights Reserved
              </div>
              <div className="footer_div2">
                <a href="#">Privacy Policy </a>|{" "}
                <a href="#"> Terms &amp; Conditions</a>
              </div>
            </div>

            <div className="footr_rgt">
              <ul>
                <li>
                  <a href="#">
                    <img src="images/social_1.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="images/social_2.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="images/social_3.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="images/social_4.png" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;

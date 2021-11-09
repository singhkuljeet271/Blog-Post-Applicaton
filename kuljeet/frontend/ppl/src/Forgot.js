import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailregister: "",
      changepage: false,
      showpopup: false,
    };
  }

  validEmail = () => {
    console.log("function ok h");

    let email = this.refs.email;

    let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (email.value == "") {
      email.placeholder = "please enter the email";

      email.focus();
      return 0;
    } else if (!reg.test(email.value)) {
      email.placeholder = "please enter the valid email";

      email.value = "";
      email.focus();
      return 0;
    } else {
      return 1;
    }
  };
  handleClick = (e) => {
    e.preventDefault();
    let result = this.validEmail();
    console.log(this.state);
    if (result) {
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      };

      fetch("http://localhost:1414/abc/forget", options)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data == "1") {
            this.setState({ emailregister: "Email not Registered" });
          } else {
            this.setState({ showpopup: true });
          }
        })

        .catch((err) => {
          console.log(err);
        });
    }
  };
  updateState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ emailregister: "" });
  };
  updateState2 = (e) => {
    this.setState({ changepage: true });
  };
  render() {
    if (this.state.changepage === true) {
      return <Redirect to="/Login" />;
    } else {
      return (
        <div>
          {this.state.showpopup ? (
            <Popup updateState2={this.updateState2} />
          ) : null}
          <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="navbar-inner">
              <div className="container">
                <button
                  type="button"
                  className="btn btn-navbar"
                  data-toggle="collapse"
                  data-target=".nav-collapse"
                >
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <a className="brand" href>
                  PPL
                </a>
                <div className="pro_info pull-right">
                  <div className="pro_icn">
                    <img src="images/pic_small.png" />
                  </div>
                  <div className="pro_txt">
                    Me
                    <b className="caret" />
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
                      <a href>Home</a>
                    </li>
                    <li className>
                      <a href>E-Coupons</a>
                    </li>
                    <li className>
                      <a href>E-Brands</a>
                    </li>
                    <li className>
                      <a href>Resuse Market</a>
                    </li>
                    <li className>
                      <a href>Lost and Found</a>
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
                  <img src="images/pic.png" />{" "}
                </div>
                <div className="info_div1">Me</div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="register_sec">
                  <h1>Forgot Password</h1>
                  <ul>
                    <li>
                      <span>Enter E-mail ID</span>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        placeholder="User@gmail.com"
                        name="email"
                        ref="email"
                        onChange={this.updateState}
                      />
                    </li>
                    <li>
                      <h4 style={{ color: "red" }}>
                        {this.state.emailregister}
                      </h4>
                    </li>
                    <li>
                      <input
                        type="submit"
                        defaultValue="Submit"
                        onClick={this.handleClick}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content_lft">
                <h1>Welcome from PPL!</h1>
                <p className="discrptn">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text.{" "}
                </p>
                <img src="images/img_9.png" alt />{" "}
              </div>
            </div>
          </div>
          <div className="clear" />
          <div className="footr">
            <div className="footr_lft">
              <div className="footer_div1">
                Copyright © Pet-Socail 2014 All Rights Reserved
              </div>
              <div className="footer_div2">
                <a href="#">Privacy Policy </a>|
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
class Popup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="popup_sec" id="pop_forgt">
        <div className="clos_btn">
          <img src="images/clos.png" alt id="clos_pop" />
        </div>
        <div className="pop_hdr">
          A mail has been send to your e-mail Id for Reset Password Link
        </div>
        <div className="man_contnt">
          <span>Please Check Your Mail Box!</span>
          <input
            type="submit"
            defaultValue="Ok"
            onClick={this.props.updateState2}
          />
        </div>
      </div>
    );
  }
}

export default Forgot;

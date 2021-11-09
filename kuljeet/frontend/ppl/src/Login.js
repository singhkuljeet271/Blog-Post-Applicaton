import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import App from "./App";
import Forgot from "./Forgot";
import "./App.css";
//localStorage.setItem("lastname", "Smith");
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      iemail: "",
      ipassword: "",
      move: false,
    };
  }

  validEmail = () => {
    console.log("function ok h");

    let password = this.refs.password.value;
    let emailid = this.refs.email.value;
    let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if (!reg.test(emailid)) {
      let email = this.refs.email;

      email.placeholder = "please enter the valid email";

      email.value = "";
      email.focus();
      return 0;
    } else if (password == "") {
      let password1 = this.refs.password;

      password1.placeholder = "please enter the password";

      password1.focus();

      return 0;
    } else {
      console.log("return 1 kia");
      return 1;
    }
  };
  handleClick = (e) => {
    console.log("clicked");

    e.preventDefault();

    let result = this.validEmail();
    if (result) {
      let options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(this.state),
      };
      fetch("http://localhost:1414/abc/login", options)
        .then((response) => response.json())
        .then((json) => {
          if (json.result == 1) {
            let iemail = this.refs.iemail;

            this.setState({ iemail: "Email not Registered" });
          } else if (json.result == 2) {
            let ipassword = this.refs.ipassword;

            this.setState({ ipassword: "Password Incorrect" });
          } else if (json.result == 3) {
            let ipassword = this.refs.ipassword;

            this.setState({
              ipassword: "You have not verified yet. Plssss Verify",
            });
          } else {
            let userdata = [json.email, json.username];
            localStorage.setItem("data", JSON.stringify(userdata));
            this.setState({ move: true });

            this.setState({ move: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  updateState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ iemail: "" });
    this.setState({ ipassword: "" });
  };

  render() {
    if (this.state.move === true || localStorage.getItem("data") != null) {
      return <Redirect to="/Profile" />;
    } else
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
                      {" "}
                      <a href>Home</a>{" "}
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
              </div>
            </div>
          </div>
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="login_sec">
                  <h1>Log In</h1>
                  <ul>
                    <li>
                      <span>Email-ID</span>

                      <input
                        style={{ color: "black" }}
                        type="text"
                        name="email"
                        ref="email"
                        placeholder="Enter your email"
                        required
                        onChange={this.updateState}
                      />
                    </li>
                    <h6 className="incorrect" ref="iemail">
                      {this.state.iemail}
                    </h6>
                    <li>
                      <span>Password</span>
                      <input
                        type="password"
                        style={{ color: "black" }}
                        placeholder="Enter your password"
                        name="password"
                        ref="password"
                        required
                        onChange={this.updateState}
                      />
                    </li>
                    <li>
                      <h6
                        style={{ color: "red" }}
                        className="incorrect"
                        ref="ipassword"
                      >
                        {this.state.ipassword}
                      </h6>
                    </li>
                    <li>
                      <input type="checkbox" />
                      Remember Me
                    </li>
                    <li>
                      <input
                        type="submit"
                        defaultValue="Log In"
                        onClick={this.handleClick}
                      />
                      <Link to="/Forgot">Forgot Password</Link>
                    </li>
                  </ul>
                  <div className="addtnal_acnt">
                    I do not have any account yet.
                    <li>
                      <Link to="/App"> Create My Account Now ! </Link>
                    </li>
                  </div>
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

export default Login;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      useralready: "",
    };
  }

  validEmail = () => {
    let username = this.refs.username;
    let email = this.refs.email;
    let password = this.refs.password;
    let firstname = this.refs.firstname;
    let lastname = this.refs.lastname;

    let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (username.value == "") {
      username.placeholder = "please enter the username";

      username.focus();
      return 0;
    } else if (password.value == "") {
      password.placeholder = "please enter the password";

      password.focus();
      return 0;
    } else if (email.value == "") {
      email.placeholder = "please enter the email";

      email.focus();
      return 0;
    } else if (firstname.value == "") {
      firstname.placeholder = "please enter the firstname";

      firstname.focus();
      return 0;
    } else if (lastname.value == "") {
      lastname.placeholder = "please enter the lastname";

      lastname.focus();
      return 0;
    } else if (!reg.test(email.value)) {
      email.placeholder = "please enter the valid email";

      email.value = "";
      email.focus();
      return 0;
    } else if (!(password.value.length > 5 && password.value.length < 11)) {
      let password2 = this.refs.password;

      password2.placeholder = "please enter 6 to 10 length password";

      password2.value = "";
      password2.focus();
      return 0;
    } else {
      return 1;
    }
  };
  handleClick = (e) => {
    e.preventDefault();

    let result = this.validEmail();

    if (result) {
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      };

      fetch("http://localhost:1414/abc/register", options)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data == "1") {
            this.setState({ useralready: "User Already Exist" });
          } else {
            this.props.history.push("/Login");
          }
        })

        .catch((err) => {
          console.log(err);
        });
    }
  };
  updateState = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {});
    this.setState({ useralready: "" });
  };

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Create An Account</title>

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
                <h1>Create An Account</h1>
                <form ref="myform" enctype="multipart/form-data">
                  <ul>
                    <li>
                      <span>Username</span>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        name="username"
                        ref="username"
                        placeholder="Enter your username"
                        onChange={this.updateState}
                        required
                      />
                    </li>
                    <li>
                      <span>Password</span>
                      <input
                        style={{ color: "black" }}
                        type="password"
                        name="password"
                        ref="password"
                        placeholder="Enter your password"
                        onChange={this.updateState}
                        required
                      />
                    </li>
                    <li>
                      <span>Email</span>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        name="email"
                        ref="email"
                        placeholder="Enter your email"
                        onChange={this.updateState}
                        required
                      />
                    </li>
                    <li>
                      <span>First Name</span>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        name="firstname"
                        ref="firstname"
                        placeholder="Enter your first name"
                        onChange={this.updateState}
                        required
                      />
                    </li>
                    <li>
                      <span>Last Name</span>

                      <input
                        style={{ color: "black" }}
                        type="text"
                        name="lastname"
                        ref="lastname"
                        placeholder="Enter your last name"
                        onChange={this.updateState}
                        required
                      />
                    </li>

                    <li>
                      <input type="checkbox" />I agree to Term &amp; Conditions
                    </li>
                    <li>
                      <h4 style={{ color: "red" }}>{this.state.useralready}</h4>
                    </li>
                    <li>
                      <input
                        type="submit"
                        defaultValue="Register"
                        onClick={this.handleClick}
                      />
                    </li>
                  </ul>
                </form>
                <div className="addtnal_acnt">
                  I already have an account.
                  <li>
                    <Link to="/Login">Login My Account !</Link>
                  </li>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.{" "}
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

export default App;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isWait, setIsWait] = useState(true);
  const [messageCode, setMessageCode] = useState("");

  const sendEmail = () => {
    setIsWait(false);
    fetch("http://localhost:8000/accounts/api/reset_password/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        setIsWait(true);
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          document.getElementById("email-alert").style.display = "block";
        }
      })
      .then((data) => {
        if (data !== undefined) {
          document.getElementById("email-form").style.display = "none";
          document.getElementById("code-virif").style.display = "block";
          document.getElementById("password-form").style.display = "none";
          setIsWait(true);
        }
      });
  };

  const sendVerificationCode = () => {
    setIsWait(false);
    fetch("http://localhost:8000/accounts/api/check_code/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    })
      .then((response) => {
        setIsWait(true);
        if (response.status === 200) {
          return true;
        } else if (response.status === 400) {
          return response.json();
        }
      })
      .then((data) => {
        if (data === true) {
          document.getElementById("email-form").style.display = "none";
          document.getElementById("code-virif").style.display = "none";
          document.getElementById("password-form").style.display = "block";
          setIsWait(true);
        } else {
          document.getElementById("code-alert").style.display = "block";
          setMessageCode(data);
        }
      });
  };

  const sendPassword = () => {
    setIsWait(false);
    fetch("http://localhost:8000/accounts/api/set_password/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
        password: password,
      }),
    })
      .then((response) => {
        setIsWait(true);
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          return response.json();
        } else {
          return "server error 500";
        }
      })
      .then((data) => {
        if (
          data === "invalid new password" ||
          data === "invalid code time" ||
          data === "False code" ||
          data === "code not sent to your email" ||
          data === "user not found" ||
          data === "server error 500"
        ) {
          // Handle error messages here
        } else {
          localStorage.setItem("token", JSON.stringify(data));
          setIsWait(true);
          window.location.href = "/";
        }
      });
  };

  const displayNone = { display: "none" };

  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "/";
  } else {
    return (
      <div>
        <div
          id="email-form"
          className="container py-5"
          style={{ display: "block" }}
        >
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6">
              <div className="card shadow-2-strong">
                <div className="card-body p-4 text-center">
                  <h3 className="mb-4">Enter Your Email</h3>
                  <h5
                    className="alert alert-danger"
                    id="email-alert"
                    style={displayNone}
                  >
                    Email not found
                  </h5>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control bg-light"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label">Email</label>
                  </div>
                  <Link to="/login" className="text-decoration-none">
                    Login with my password
                  </Link>
                  <br />
                  {isWait ? (
                    <button
                      className="btn btn-primary mt-2 btn-lg btn-block"
                      onClick={sendEmail}
                    >
                      Send Code
                    </button>
                  ) : (
                    <button className="btn btn-primary mt-2 btn-lg btn-block" disabled>
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </button>
                  )}
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="code-virif"
          className="container py-5"
          style={{ display: "none" }}
        >
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6">
              <div className="card shadow-2-strong">
                <div className="card-body p-4 text-center">
                  <h3 className="mb-4">Please Confirm Your Email Address</h3>
                  <h5
                    className="alert alert-danger"
                    id="code-alert"
                    style={displayNone}
                  >
                    {messageCode}
                  </h5>
                  <label className="form-label">Code Verification</label>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control bg-light"
                      maxLength="8"
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  {isWait ? (
                    <button
                      className="btn btn-primary mt-2 btn-lg btn-block"
                      onClick={sendVerificationCode}
                    >
                      Verify Code
                    </button>
                  ) : (
                    <button className="btn btn-primary mt-2 btn-lg btn-block" disabled>
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="password-form"
          className="container py-5"
          style={{ display: "none" }}
        >
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6">
              <div className="card shadow-2-strong">
                <div className="card-body p-4 text-center">
                  <h3 className="mb-4">Set New Password</h3>
                  <h5
                    className="alert alert-danger"
                    id="code-alert"
                    style={displayNone}
                  >
                    Password not valid. Password should contain at least 2 special characters, 3 letters, and 3 numbers.
                  </h5>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control bg-light"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label">Password</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control bg-light"
                    />
                    <label className="form-label">Confirm Password</label>
                  </div>
                  {isWait ? (
                    <button
                      className="btn btn-primary mt-2 btn-lg btn-block"
                      onClick={sendPassword}
                    >
                      Set Password
                    </button>
                  ) : (
                    <button className="btn btn-primary mt-2 btn-lg btn-block" disabled>
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;

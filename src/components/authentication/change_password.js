import React, { useState } from "react";
import { Link } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [isWait, setIsWait] = useState(true);
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");

  function sendData() {
    setIsWait(false);
    fetch("http://localhost:8000/accounts/api/change_password/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
      },
      body: JSON.stringify({
        password1: newPassword1,
        password2: newPassword2,
        old_password: oldPassword,
      }),
    })
      .then((response) => {
        setIsWait(true);
        if (response.status === 200) {
          return true;
        } else if (response.status === 400) {
          return response.json();
        } else {
          return "server error 500";
        }
      })
      .then((data) => {
        if (data === true) {
          window.location.href = "/";
        } else {
          document.getElementById('message').style.display = 'block'
          setMessage(data);
        }
      });
  }

  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6">
            <div className="card shadow-2-strong">
              <div className="card-body p-4 text-center">
                <h3 className="mb-4">Change Password</h3>
                <div id="message" className="alert alert-danger" style={{'display':"none"}}>
                  {message}
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control bg-light"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <label className="form-label">Old Password</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control bg-light"
                    onChange={(e) => setNewPassword1(e.target.value)}
                  />
                  <label className="form-label">New Password</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control bg-light"
                    onChange={(e) => setNewPassword2(e.target.value)}
                  />
                  <label className="form-label">Confirm Password</label>
                </div>
                <Link to="/" className="text-decoration-none">
                  Cancel
                </Link>
                <br />
                {isWait ? (
                  <button
                    className="btn btn-primary mt-2 btn-lg btn-block"
                    onClick={sendData}
                  >
                    Send
                  </button>
                ) : (
                  <button
                    className="btn btn-primary mt-2 btn-lg btn-block"
                    disabled
                  >
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

export default ChangePassword;

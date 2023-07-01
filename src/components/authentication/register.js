import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");
  const [code, setCode] = useState("");
  const [isWait, setIsWait] = useState(true);
  const [message, setMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistration = () => {
    setIsWait(false);
    fetch("http://localhost:8000/accounts/api/register/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password1: password1,
        password2: password2,
      }),
    })
      .then((response) => {
        setIsWait(true);
        if (response.status === 200) {
          setPassword1("");
          setPassword2("");
          setIsRegistered(true);
        } else if (response.status === 400) {
          return response.json();
        } else if (response.status === 500) {
          return "server error 500";
        }
      })
      .then((data) => {
        if (!isRegistered && data) {
          setMessage(data);
        }
      });
  };

  const handleVerification = () => {
    setIsWait(false);
    fetch("http://localhost:8000/accounts/api/activate/", {
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
          return response.json();
        } else if (response.status === 400) {
          return response.json();
        } else if (response.status === 500) {
          return "server error 500";
        }
      })
      .then((data) => {
        if (
          data === "code not sent for your email" ||
          data === "user not registered" ||
          data === "invalid code time" ||
          data === "False code" ||
          data === "server error 500"
        ) {
          setCodeMessage(data);
        } else {
          localStorage.setItem("token", JSON.stringify(data));
          window.location.href = "/";
        }
      });
  };

  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = "/";
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-4 text-center">
              {!isRegistered ? (
                <>
                  <h3 className="mb-4 text-primary">Sign Up</h3>
                  {message && <div className="alert alert-danger">{message}</div>}
                  <div className="mb-3">
                    <input type="text" className="form-control bg-light" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control bg-light" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control bg-light" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control bg-light" placeholder="Password" onChange={(e) => setPassword1(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control bg-light" placeholder="Confirm Password" onChange={(e) => setPassword2(e.target.value)} />
                  </div>
                  <div className="d-grid gap-2">
                    {isWait ? (
                      <button className="btn btn-primary" onClick={handleRegistration}>
                        Sign Up
                      </button>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only"></span>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="mt-3">
                    <Link to="/login" className="text-decoration-none">Login</Link>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="mb-4">Please confirm your email address to complete the registration</h3>
                  <div className="alert alert-success">Registration Successful!</div>
                  <div className="form-group mb-3">
                    <input type="text" className="form-control bg-light" placeholder="Code Verification" maxLength="8" onChange={(e) => setCode(e.target.value)} />
                  </div>
                  <div className="d-grid">
                    {isWait ? (
                      <button className="btn btn-primary" onClick={handleVerification}>
                        Verify Code
                      </button>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only"></span>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="mt-3">
                    <Link to="/login" className="text-decoration-none">Login</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;



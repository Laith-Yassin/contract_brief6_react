import React, { useState, useEffect } from "react";
import "../styles/user.css";
import Auth from "../images/Auth.jpg";

const UserEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("No user ID found in session storage");
        return;
      }

      try {
        const response = await fetch(`http://localhost/brief6/sign/user.php?id=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text(); // Get the raw response
        console.log(text); // print the raw response to the console

        // then attempt to parse it as JSON:
        try {
          const data = JSON.parse(text);
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } catch (error) {
        console.error("There was a problem fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      console.error("No user ID found in session storage");
      return;
    }

    try {
      const response = await fetch("http://localhost/project6/user.php", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, id: userId }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text(); // Get the raw response
      console.log(text); // print the raw response to the console

      // then attempt to parse it as JSON:
      try {
        const data = JSON.parse(text);
        console.log(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  return (
    <div className="container">
      <div className="topbar">
        <div className="logo">
          <h2>Brand.</h2>
        </div>
        <div className="search">
          <input type="text" name="search" placeholder="search here" />
          <label htmlFor="search">
            <i className="fas fa-search"></i>
          </label>
        </div>
        <i className="fas fa-bell"></i>
        <div className="user">
          <img src={Auth} alt="" />
        </div>
      </div>
      <div className="sidebar">
        <ul>
          <li>
            <a href="#" onClick={() => handleNavigation("http://localhost:3000/Useredit")}>
              <i className="fas fa-th-large"></i>
              <div>contract</div>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleNavigation("User")}>
              <i className="fas fa-user-graduate"></i>
              <div>profile</div>
            </a>
          </li>
        </ul>
      </div>
      <div className="main">
        <div className="charts">
          <div className="chart">
            <div className="formbold-main-wrapper">
              <div className="formbold-form-wrapper">
                <form action="https://formbold.com/s/FORM_ID" method="POST">
                  <div className="formbold-input-wrapp formbold-mb-3">
                    <label htmlFor="firstname" className="formbold-form-label">
                      Name
                    </label>
                  </div>
                  <div className="formbold-mb-3">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      className="formbold-form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="formbold-input-wrapp formbold-mb-3">
                    <label htmlFor="email" className="formbold-form-label">
                      Email
                    </label>
                  </div>
                  <div className="formbold-mb-3">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="formbold-form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="formbold-input-wrapp formbold-mb-3">
                    <label htmlFor="phone" className="formbold-form-label">
                      Phone
                    </label>
                  </div>
                  <div className="formbold-mb-3">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      className="formbold-form-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="formbold-btn" onClick={handleSubmit}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;

import React from "react";
import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function CreateJoin(props) {
  
  const host = "http://localhost:5000";
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    userName: "",
    userRoom: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const { userName, userRoom } = credentials;
  const handleSubmit = async () => {
    if (!userName || !userRoom) {
      // notify("Both name and Room required");
      return;
    }
    setLoading(true);
    const response = await fetch(`${host}/token`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ room: userRoom }),
    });
    const data = await response.json();
    setLoading(false);

    localStorage.setItem("sessionId", data.sessionId);
    localStorage.setItem("token", data.token);
    //can use context api but for now localstorage or directly to app.js

    navigate(`/room?name=${userName}&room=${userRoom}`);
  };
  return (
    <div>
      <Navbar />
      <div className="conatiner bg-gray-800 h-[80vh] flex justify-center items-center space-x-6 h-[80vh]">
        <div className="text-center">
          <div className="text-gradient text-3xl font-bold p-4">
            {" "}
            {props.tittle}
          </div>
          <div className="px-10 py-6  flex flex-col space-y-5 justify-center items-center border rounded-lg ">
            <div>
              <div className="text-white text-xl font-bold font-mono py-2">
                UserName:
              </div>
              <div>
                <input
                  className="rounded-lg p-1"
                  type="text"
                  id="name"
                  name="userName"
                  value={userName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
            </div>
            <div>
              <div className="text-white text-xl font-bold font-mono py-2">
                Room:
              </div>

              <div>
                <input
                  className="rounded-lg p-1"
                  type="text"
                  id="room"
                  name="userRoom"
                  value={userRoom}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
              <div className="text-center py-4">
                <button
                  className={`btn-primary ${
                    !userName || !userRoom
                      ? "opacity-50  cursor-not-allowed"
                      : ""
                  }`}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateJoin;

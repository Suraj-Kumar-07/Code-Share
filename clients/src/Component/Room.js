import React from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import axios from "axios";
import AceEditor from "react-ace";
import Spinner from "./Spinner";
import '@opentok/client'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import {BsFillChatLeftDotsFill,BsHeadset,BsShareFill,BsFileEarmarkArrowDown ,BsPlayFill,BsSaveFill} from 'react-icons/bs'
import Message from "./Message";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-typescript";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Contibutor from "./Contibutor";

let socket;

function Room() {
  // hooks of react-router-dom
  let navigate = useNavigate(); // to navigate
  let location = useLocation(); // to get the location of page

  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [mode, setMode] = useState("javascript");
  const [users, setUsers] = useState("");
  const [theme, setTheme] = useState("solarized_dark");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [source, setSource] = useState("");
  const [inp, setInp] = useState("");
  const [langid, setLangid] = useState(63);
  const [stdoutt, setStdo] = useState("");

  const handle = () => {
    setChat(!chat);
  };

  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    if (!room) {
      navigate("/join");
      // notify('Room is not created ');
    }
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", { name,room}, (error) => {
      if (error) {
        navigate("/join");
        // notify("Username is taken")
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [ENDPOINT, location.search, navigate]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("code", ({ source, inp, out }) => {
      setSource(source);
      setInp(inp);
      setStdo(out);
    });
  }, [source, inp, stdoutt]);

  const handlesendcode = () => {
    socket.emit("sendCode", {
      source: source,
      inp: inp,
      out: stdoutt,
    });
  };

  function onChange1(newValue) {
    setInp(newValue);
  }

  const handlelang = (mode, name) => {
    setMode(mode);
    if (mode === "javascript") {
      setLangid(63);
    } else if (mode === "c_cpp" && name === "c") {
      setLangid(50);
    } else if (mode === "c_cpp") {
      setLangid(54);
    } else if (mode === "java") {
      setLangid(62);
    } else if (mode === "csharp") {
      setLangid(51);
    } else if (mode === "python") {
      setLangid(71);
    } else if (mode === "php") {
      setLangid(68);
    } else if (mode === "ruby") {
      setLangid(72);
    } else if (mode === "typescript") {
      setLangid(74);
    } else if (mode === "golang") {
      setLangid(60);
    }
  };

  function onChange(newValue) {
    setSource(newValue);
  }

  const download = () => {
    if (source.length === 0){
      console.log('Likh Le Kuch ')
      return;
    }
    const url = window.URL.createObjectURL(
      new Blob([source], { type: "text/plain" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sessioncode.txt");
    document.body.appendChild(link);
    link.click();
  };

  const handlesend = () => {
    if (message) {
      socket.emit("sendMessage", { message }, () => setMessage(""));
    }
  };

  const compile = () => {
    setLoading(true);
    axios
      .get(
        `https://judge0-ce.p.rapidapi.com/submissions/${localStorage.getItem(
          "tokencode"
        )}`,
        {
          headers: {
            "X-RapidAPI-Key":'5832d7e590mshb461fbab7ab2cd4p19c51fjsnbdf3c8cacb62',
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      )
      .then(function (response) {
        if (response.data.stdout) {
          setStdo(response.data.stdout);
          setLoading(false);
        } else {
          setStdo("Compilation Error");
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
      });
  };
  const compiler = async () => {
    setLoading(true);
    console.log(langid, source);
    let pro = await axios.post(
      `https://judge0-ce.p.rapidapi.com/submissions`,
      { language_id: langid, source_code: `${source}`, stdin: `${inp}` },
      {
        headers: {
          "Content-Type": "application/json", //not neccesary but its ok
          "X-RapidAPI-Key":'5832d7e590mshb461fbab7ab2cd4p19c51fjsnbdf3c8cacb62',
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );
    try {
      const json = pro.data;
      const token = json.token;
      localStorage.setItem("tokencode", token);
      console.log(token)
      setLoading(false);
    } catch (error) {
      setStdo("Compilation Error");
      setLoading(false);
      console.log(error);
    }
    setLoading(false);

    compile();
  };

  // sidebar
  const handlevisibile=()=>{
    var ele=document.getElementById('voicee');
   
    ele.classList.toggle('voicev')
    if(ele.classList.contains('voicev')){
      ele.classList.remove("voice1")
    }
    else{
      ele.classList.add("voice1");
    }
  }

  return (
    <>
      <div>
        <Navbar />
        {loading && <Spinner />}
        <div className="bg-gray-800">
          {chat && (
            <div className="absolute w-[302px] border-2 h-[60vh] z-10 right-1">
              <div className="h-[60vh] bg-orange-300 rounded-lg overflow-y-scroll">
                {messages.map((message, i) => {
                    return (
                      <div key={i}>
                        <Message name={name} message={message} />
                      </div>
                    );
                  })}
              </div>
              <div className="flex">
                <input
                  placeholder="Type message..."
                  value={message}
                  className="p-2 rounded-lg bg-orange-400"
                  type="text"
                  name="input"
                  id="input"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <button className="btn-primary" onClick={handlesend}>Send</button>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-[5%_80%_15%]">
          <div className="bg-gray-800 grid grid-rows-8">
            <div></div>
            <div></div>
            <div>
              <button
                onClick={() => {
                  compiler();
                }}
                className="text-white text-xl sm:px-3"
              >
                <BsPlayFill />
              </button>
            </div>
            <div onClick={handlesendcode}>Save</div>
            <div onClick={download}>Download</div>
            <div>
            <div id='voicee' className='voice1 absolute z-20'>
                <OTSession apiKey="47601141" sessionId={localStorage.getItem('sessionId')} token={localStorage.getItem('token')}>
                <div className="sm:grid sm:grid-cols-2">
                <OTPublisher properties={{ width: 50, height: 50 ,publishVideo:true}}/>
                <OTStreams>
                <OTSubscriber properties={{ width: 50, height: 50 ,subscribeToVideo:true}}/>
                </OTStreams>
                </div>
               </OTSession>                  
              </div>
              Speaker
            </div>
            <div onClick={handle}>
              Chat
            </div>
            <div></div>
            <div></div>
          </div>
          <div className="px-4 bg-orange-300">
            <AceEditor
              mode={mode}
              theme={theme}
              name="example"
              width="auto"
              value={source}
              fontSize={14}
              onChange={onChange}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </div>
          <div>
            <Contibutor users={users}/>
          </div>
        </div>
        <div className="grid grid-cols-[5%_40%_40%_15%]">
          <div className="bg-gray-800">

          </div>
          <div>
            <AceEditor
              placeholder="input"
              mode={mode}
              theme={theme}
              value={inp}
              width="auto"
              height="150px"
              fontSize={18}
              name="input"
              editorProps={{ $blockScrolling: true }}
              onChange={onChange1}
            />
          </div>
          <div >
            <AceEditor
              placeholder="Output"
              mode={mode}
              theme={theme}
              value={stdoutt}
              width="auto"
              height="150px"
            
              fontSize={18}
              name="input"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Room;

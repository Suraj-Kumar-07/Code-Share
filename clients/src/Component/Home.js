import React from "react";
import Navbar from "../Component/Navbar";
import chat from '../Image/chat.png';
import code from '../Image/code.png';
import mainp from '../Image/mainp.png';
import Footer from "./Footer";
import { Link } from "react-router-dom"; 

export default function Home() {
  return (
    <>
      {/* <div className='h-[4vh] mygradient '> </div> */}
      <div className="bg-gray-800">
        <Navbar />
        <section>
          <div className="container m-auto">
            <div className="pt-10 md:py-16 grid md:grid-cols-[40%_60%] md:grid-rows-none grid-rows-[40%_60%]">
              <div className="md:py-9">
                <img className="h-[100%] m-[auto]" src={mainp} alt="" />
              </div>
              <div className="p-6 md:py-14">
                <h1 className="text-[2rem] font-bold text-gradient">
                  Code Share
                </h1>
                <p className="pt-3 font-semibold text-white">
                  {" "}
                  CodeShare is a realtime coding platform enables you to
                  connect to your peers and work on coding problems
                </p>
                <p className="pt-3 font-semibold text-white">
                  Explanation of the problem and its solution become easy with
                  features provides in this platform.
                </p>
                <div className="text-center">
                  <Link to="/enter">
                    {" "}
                    <button className=" my-5 btn-primary">Get Started</button>
                  </Link>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </section>
        <section>
          <div className="py-3">
            <div className="text-center font-bold text-[2rem] text-gradient">
              Features
            </div>
          </div>
          <div className="container m-[auto] pb-10">
            <div className="grid md:grid-cols-2 md:gap-3 md:grid-rows-none grid-rows-3 gap-4 ">
              <div className="rounded-md border-2 p-5">
                <div className="h-[163px]">
                  <img className="h-[100%] m-[auto]" src={code} alt="" />
                </div>
                <div>
                  <div className="text-[#ff9100] text-center py-4 text-[1.5rem] font-bold">
                    Versatile Code Editor
                  </div>
                  <div className="text-center text-white ">
                    <p className="font-semibold text-lg">{`-> Supports multiple Languages`}</p>
                    <p className="font-semibold text-lg">{`-> Various themes available for editor`}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-md border-2 p-5">
                <div className="h-[163px] ">
                  <img className="h-[100%] m-[auto]" src={chat} alt="" />
                </div>
                <div>
                  <div className="text-[#ff9100] text-center py-4 text-[1.5rem] font-bold">
                    Audio and text chat
                  </div>
                  <div className="text-center font-bold text-white">
                    <p className="font-semibold text-lg">
                      {`-> Seamless audio connectivity`}{" "}
                    </p>
                    <p className="font-semibold text-lg">{`-> Text chat Enabled`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    </>
  );
}

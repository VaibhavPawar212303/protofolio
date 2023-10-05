import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import Navbar from "../Navbar/Navbar";

const Joditeditor = () => {
  //pass data to db
  const passDataToDb = () => {
    setIntro(intro);
    setTitle(title);
    fetch("http://localhost:5000/api/createBlog", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        introduction: intro,
        blogData: content,
      }),
    }).then(function (res) {
      console.log(res);
    });
  };

  const setTitleText = (e) => {
    setTitle(e.target.value);
  };
  const setIntroText = (e) => {
    setIntro(e.target.value);
  };

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [intro, setIntro] = useState("");
  const [title, setTitle] = useState("");

  return (
    <>
      <Navbar />
      <div>
        <h1 className="display-5 mt-5">Add Your Blog</h1>
        <div className="input-group input-group-lg mt-5 ml-5 w-75">
          <span className="input-group-text" id="inputGroup-sizing-lg">
            Title
          </span>
          <div className="input-group-prepend"></div>
          <input
            type="text"
            className="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            value={title}
            onChange={setTitleText}
          />
        </div>
        <div className="input-group mt-5 ml-5 w-75">
          <div className="input-group-prepend">
            <span className="input-group-text">Introduction</span>
          </div>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={intro}
            onChange={setIntroText}
          ></textarea>
        </div>
      </div>
      <div className="ml-5 mr-5 mt-5 w-75">
        <JoditEditor
          ref={editor}
          value={content}
          onBlur={(newContent) => setContent(newContent)}
        />
        <div className="mt-5 mb-5">
          <button type="button" class="btn btn-primary" onClick={passDataToDb}>
            Submit Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default Joditeditor;

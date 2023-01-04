import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
//import draftToHtml from 'draftjs-to-html';
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App() {
  const [convertedContent, setConvertedContent] = useState(null);
  const [userInfo, setuserInfo] = useState({
    blogTitle: null,
    blogImage: null,
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const uploadPicture = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.files[0],
    });
  };

  let editorState = EditorState.createEmpty();
  const [Description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const [isError, setError] = useState(null);
  const addDetails = async (event) => {
    event.preventDefault();
    try {
      event.persist();
      if (convertedContent.length < 50) {
        setError("Required, Add description minimum length 50 characters");
        return;
      }
      console.log("0000", convertedContent);

      let formData = new FormData();
      formData.append("blogTitle", userInfo.blogTitle);
      formData.append("blogImage", userInfo.blogImage);
      formData.append("Description", convertedContent);

      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^", formData);

      console.log("....................", formData);
      // axios.post(`https://curly-elephant-46.loca.lt/api/postblog/postblog`, {
      //   blogTitle:userInfo.blogTitle,
      //   blogImage: blogImage,
      //   Description: userInfo.Description.value
      // })
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="row">
            <form onSubmit={addDetails} className="update__forms">
              <h3 className="myaccount-content"> Add </h3>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label className="font-weight-bold">
                    {" "}
                    Title <span className="required"> * </span>{" "}
                  </label>
                  <input
                    type="text"
                    name="blogTitle"
                    value={userInfo.blogTitle}
                    onChange={onChangeValue}
                    className="form-control"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="font-weight-bold">
                    {" "}
                    Image <span className="required"> * </span>{" "}
                  </label>
                  <input
                    type="file"
                    name="blogImage"
                    onChange={uploadPicture}
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="form-group col-md-12 editor">
                  <label className="font-weight-bold">
                    {" "}
                    Description <span className="required"> * </span>{" "}
                  </label>
                  <Editor
                    editorState={Description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "history",
                      ],
                      blockType: {
                        inDropdown: true,
                        options: ["H1", "H2", "H3", "H4", "H5", "H6"],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                  />
                  {/* <textarea style={{ display: 'none' }} disabled ref={(val) => userInfo.Description = val} value={draftToHtml(convertToRaw(Description.getCurrentContent()))} /> */}
                </div>
                {isError !== null && <div className="errors"> {isError} </div>}
                <div className="form-group col-sm-12 text-right">
                  <button type="submit" className="btn btn__theme">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;

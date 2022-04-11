import "../App.css"
import axios from "axios";
import React, { useState } from 'react';

function Upload() {

  // For file upload
  const[file, setFile] = useState();
  function handleChange(event){
    setFile(event.target.files[0])
    let imgurl = URL.createObjectURL(event.target.files[0])
    document.getElementById("imgpreview").setAttribute("src",imgurl)
    console.log(event.target.files[0].name)
    document.getElementById("imgname").innerHTML = event.target.files[0].name
    document.getElementById("uploadedtext").style.display = "none";
  }

  // For checkbox
  const [tags, setTags] = React.useState({
    Child: false,
    Teenager: false,
    Adult: false,
    Elderly: false,
    Male: false,
    Female: false,
    Happy: false,
    Sad : false,
    Eyeglasses:false,
    Sunglasses:false,
    'Facial Hair': false,
    Smile: false
  });

  const handleToggle = ({ target }) =>
    setTags(s => ({ ...s, [target.name]: !s[target.name] }));

  

  function handleSubmit(event){
    event.preventDefault();
    
    // Creation of form data
    const data = new FormData();
    data.append('tags', Object.values(tags))
    data.append('file', file);
    data.append('fileName', file.name);

    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data; boundary=$form._boundary'}
    };

    //  Posting to flask
     axios.post('/upload',data, config).then((response) => {
      console.log(response.data);
      document.getElementById("uploadedtext").style.display = "block";
    });
  }

  return (
    <div className="App">
          <title>CCIoT GUI</title>
          <form method="POST" onSubmit={handleSubmit} id="help">
            <div id='maindiv'>
              <div id="leftdiv">
                {/* Image upload */}
                <h1>Upload Advertisement</h1>
                <div id="inputdiv">
                  <div id='imagewrapper'>
                    <img id="imgpreview" alt='upload preview' src='emptystate.png'></img>
                    </div>
                  <p id="imgname"></p>
                  <label class="buttons">
                    <input id="imguploader" name="image" type="file" onChange={handleChange}/>
                    Choose File
                  </label>
                </div>
              </div>
              <div id ="tagsdiv">
                {/* Tags */}
                <h2>Select Tags</h2>
                <div className='container'>
                  {Object.keys(tags).map(key => (
                    <label className='checkboxeslabel' htmlFor='tags'>
                    <input
                      type="checkbox"
                      onChange={handleToggle}
                      key={key}
                      name= {key}
                      checked={tags[key]}
                      id="tags"
                    />
                      {key}
                      <br />
                      <br />
                    </label>
                  ))}
                </div>
                <button className='buttons' id='uploadbutton' type='submit'>Upload</button>
                <p id="uploadedtext">Your File Has Been Uploaded!</p>
              </div>
            </div>
          </form>
    </div>
  );
}

export default Upload;

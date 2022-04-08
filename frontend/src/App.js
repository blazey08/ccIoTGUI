import './App.css';
import axios from "axios";
import React, { useState } from 'react';

function App() {

  // For file upload
  const[file, setFile] = useState();
  function handleChange(event){
    setFile(event.target.files[0])
  }

  // For checkbox
  const [tags, setTags] = React.useState({
    Male: false,
    Female: false,
    Beard: false,
    Happy: false,
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
    });
  }

  return (
    <div className="App">
          <title>CCIoT GUI</title>
          <form method="POST" onSubmit={handleSubmit} id="help">
              {/* Image upload */}
              <h1>File Upload</h1>
              <input name="image" type="file" onChange={handleChange}/>

              {/* Tags */}
              <h2>Select the appropriate tags</h2>
              <div className='container'>
                {Object.keys(tags).map(key => (
                  <label htmlFor='tags'>
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
              <button type='submit'>Upload</button>
          </form>
    </div>
  );
}

export default App;

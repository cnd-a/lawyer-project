import React, { useState } from 'react';
import './CreateLawyer.css'; 

const CreateLawyer= () => {
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      date_of_birth: '',
      location: '',
      biography: '',
      experience: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await fetch('http://localhost:3000/lawyers', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok){
          alert("Posted");
          // setFormData({
          //   first_name: '',
          //   last_name: '',
          //   location: '',
          //   biography: '',
          //   experience: ''
          // });
        } else{
          alert(data.message || "Failed to post!");
        }
      } 
      catch (err){
        console.error("Error: ", err);
        alert("Failed to send data!")
      }
    }
  
    return(
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Upload your photo</label>
          <img src="https://a.pinatafarm.com/354x640/37342d2d2e/cristiano-ronaldo-smile.jpg" alt="User Photo"/>
          <button>Upload</button>

          <label>First Name</label>
          <input
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value})}
            type="text" maxLength="20" placeholder="First Name" required/>

          <label>Last Name</label>
          <input
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value})}
            type="text" maxLength="20" placeholder="Last Name" required/>

          <label>Date of Birth:</label>
          <input 
            value={formData.date_of_birth}
            onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value})} 
            type="date" required/>
          <label>Location</label>
          <input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value})}
            type="text" height="50" placeholder="Where are you located?" />

          <label>Biography</label>
          <input
            value={formData.biography}
            onChange={(e) => setFormData({ ...formData, biography: e.target.value})}
            type="text" placeholder="Tell us a bit about yourself" />

          <label>Experience</label>
          <input
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value})}
            type="text" placeholder="Tell us relevant experience" />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
};

export default CreateLawyer;

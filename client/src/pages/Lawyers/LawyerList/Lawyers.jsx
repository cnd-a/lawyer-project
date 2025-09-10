import { useState, useEffect } from 'react';
import LawyerPopup from '../LawyerPopup/LawyerPopup.jsx';
import './Lawyers.css'; 

const Lawyers= () => {
  const [lawyer, setLawyer] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch('http://localhost:3000/lawyers');
        const data = await res.json();
        setLawyer(data);
      } catch (err) {
        console.error("Error fetching lawyers: ", err);
      }
    };
    fetchLawyers();
  }, [])

/* 
Kasih filter buat sort gitu di search container
*/
  return (
    <>
      <div className="search-container">
        <h1>Find your lawyer here:</h1>
        <form>
          <input name="query" placeholder="Name" /> 
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="lawyer-page-container">        
        {lawyer.map((lawyer) => {
          return (  
          <div className='placeholder'>
            <div className="lawyer-container" key={lawyer.lawyer_id} draggable="true">
                <img src="https://a.pinatafarm.com/354x640/37342d2d2e/cristiano-ronaldo-smile.jpg" alt={lawyer.first_name}/>
                <div className="lawyer-details">
                  <h2 className="lawyer-name">{lawyer.first_name} {lawyer.last_name}</h2>
                  <p>{lawyer.location}</p>
                  <p>{lawyer.biography}</p>
                  {<LawyerPopup lawyer={lawyer}/>}
              </div>
            </div>
          </div> 
          );
        })}
        <h2> Prev 1 2 3 Next </h2>
      </div>
    </>
  );
};
export default Lawyers;

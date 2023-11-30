import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setusername] = useState("");
  const [Userdetails, setUserdetails] = useState("");

  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setUserdetails(data);
      navigate(`/user/${data.login}`)
      console.log("user", Userdetails);
    } catch (error) {
      alert(`No user found with username: ${username}. Please enter a valid username.`);
      console.error('An error occurred while fetching user details:', error.message);
      // You can handle the error in a way that makes sense for your application
    }
  };

  return (
    <div className='container' style={styles.container}>
      <div className="box" style={styles.box}>
        <h1 style={styles.heading}>Welcome To Github User Details Finder</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder='Enter GitHub username'
          style={styles.input}
        />
        <button className='btn' onClick={() => handleClick()} style={styles.button}>
          Search Details
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:"#2c3e50",
  },
  box: {
    textAlign: 'center',
    padding: '50px 50px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '10vw',
    color:"#fff"
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    background: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop:"10px"
  },
};

export default Home;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 8;

  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('An error occurred while fetching user details:', error.message);
      }
    };

    fetchUserData();
  }, [username]);

  // Calculate the index range for the current page
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = userData.slice(indexOfFirstRepo, indexOfLastRepo);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {userData.length > 0 && (
        <div style={styles.userContainer}>
          <img
            src={userData[0].owner.avatar_url}
            alt={`${userData[0].owner.login}'s avatar`}
            style={styles.avatar}
          />
          <div>
            {/* <h2>{userData[0].owner.name}</h2> */}
            <p><span style={{fontWeight:"bold"}}>Username :</span> {userData[0].owner.login}</p>
          </div>
          <h3>Repositories:</h3>
          <table style={styles.table}>
            <thead>
              <tr style={{backgroundColor:"#95a5a6"}}>
                <th style={styles.cell}>Repo Id</th>
                <th style={styles.cell}>Name</th>
                <th style={styles.cell}>Description</th>
              </tr>
            </thead>
            <tbody>
              {currentRepos.map((repo, index) => (
                <tr key={repo.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                  <td style={styles.cell}>{repo.id}</td>
                  <td style={styles.cell}>{repo.name}</td>
                  <td style={styles.cell}>{repo.description?repo.description:"No Description Found"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.pagination}>
            {Array.from({ length: Math.ceil(userData.length / reposPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                style={currentPage === index + 1 ? styles.activePage : styles.btn}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  userContainer: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: 'auto',
    marginTop: '50px',
  
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    border: '1px solid #ddd', 
  },
  evenRow: {
    backgroundColor: '#f2f2f2',
  },
  oddRow: {
    backgroundColor: '#fff', 
  },
  cell: {
    border: '1px solid #ddd', 
    padding: '8px', 
  },
  pagination: {
    marginTop: '20px',
},
btn:{
    cursor:"pointer",
    marginLeft:"10px",
    border:"1px solid #333"
  },
  activePage: {
    backgroundColor: '#4CAF50', 
    color: 'white', 
    marginLeft:"10px",
    cursor:"pointer",
  },
};

export default UserDetails;

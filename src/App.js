import "./App.css";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function App() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetch(
      `https://reqres.in/api/users?page=${pageNumber}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data)
        setUsers(json.data);
      })
  }, [])


  const changePage = ({ selected }) => {
    fetch(
      `https://reqres.in/api/users?page=${selected+1}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.data.length > 0){
          setPageNumber(selected+1);
          setUsers(json.data);
        }
      })
  };

  return (
    <div className="App">
      {users
    .map((user) => {
      return (
        <div className="card-container">
			<header>
				<img src={user.avatar} alt={user.first_name} />
			</header>
			<h1 className="bold-text">
				{user.first_name} + {" "} + {user.last_name}
			</h1>
			<h2 className="normal-text">{user.email}</h2>
		</div>
      );
    })}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageNumber+1}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default App;

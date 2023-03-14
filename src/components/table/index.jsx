import React, { useState, useEffect } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(true);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetch(`https://fakerapi.it/api/v1/persons?_quantity=${pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [pageSize]);
  const calculateAge = (birthDate) =>{
    const birthday = new Date(birthDate);
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  const sortData = (sortBy, sortOrder) => {
    const sorted = data.sort((a, b) => {
      if (sortBy === "id") {
        return sortOrder ? a.id - b.id : b.id - a.id;
      } else if (sortBy === "firstname") {
        return sortOrder
          ? data
          : b.firstname.localeCompare(a.firstname);
      } else if (sortBy === "lastname") {
        return sortOrder
          ? a.lastname.localeCompare(b.lastname)
          : b.lastname.localeCompare(a.lastname);
      } else if (sortBy === "gender") {
        return sortOrder
          ? a.gender.localeCompare(b.gender)
          : b.gender.localeCompare(a.gender);
      } else if (sortBy === "age") {
        return sortOrder
          ? calculateAge(a.birthday) - calculateAge(b.birthday)
          : calculateAge(b.birthday) - calculateAge(a.birthday);
      } else {
        return 0;
      }
    });
    setSortedData(sorted);
  };
  useEffect(() => {
    sortData(sortBy, sortOrder);
  }, [data, sortBy, sortOrder]);
  const handleSort = (sortBy) => {
    if (sortBy === sortBy) {
      setSortOrder(!sortOrder);
    } else {
      setSortBy(sortBy);
      setSortOrder(true);
    }
    sortData(sortBy, !sortOrder);
  };

  return (
    <div style={{paddingTop:"5rem", paddingLeft:"2rem", paddingRight:"2rem", textAlign:"center"}}>
        <table  style={{border:"1px solid", borderCollapse:"collapse"}} width="100%">
        <tbody>
        <tr style={{width:"100%"}}>
            <td style={{ width: "90%" }}>Number Of Rows</td>
            <td style={{ width: "10%" }}>
            <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
            </td>
          </tr>
        </tbody>
        </table>
      <table width="100%">
        <thead>
          <tr >
          <th onClick={() => handleSort("id")}>
              Id {sortOrder && <span>▲</span>}
              {!sortOrder && <span>▼</span>}
            </th>
          <th>Avatar</th>
            <th onClick={() => handleSort("firstname")}>
              First Name {sortOrder && <span>▲</span>}
              {!sortOrder && <span>▼</span>}
            </th>
            <th onClick={() => handleSort("lastname")}>
              Last Name {sortOrder && <span>▲</span>}
              {!sortOrder && <span>▼</span>}
            </th>
            <th onClick={() => handleSort("gender")}>
            Gender {sortOrder && <span>▲</span>}
              {!sortOrder && <span>▼</span>}
            </th>
            <th onClick={() => handleSort("age")}>
              Age {sortOrder && <span>▲</span>}
              {!sortOrder && <span>▼</span>}
            </th>
            <th style={{ width: "10%" }}>Contact</th>
          </tr>
        </thead>
        <tbody>
          {(sortedData.length > 0 ? sortedData : data).map((person) => {
            return (
              <tr key={person.id} >
                <td>{person.id}</td>
                <td>
                  <img
                    src={person.image}
                    alt={person.firstname}
                    style={{ width: "50px", borderRadius: "25px" }}
                  />
                </td>
                <td>{person.firstname}</td>
                <td>{person.lastname}</td>
                <td>{person.gender}</td>
                <td>{calculateAge(person.birthday)}</td>
                <td>{person.address.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

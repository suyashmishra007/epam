import React from "react";
import "./main.css";
import { Posts } from "../../dummydata";

import { useState } from "react";

function Main() {
  const [searchData, setSearchData] = useState(Posts);
  const [sortOrder, setSortOrder] = useState("asc");
  const [show, setShow] = useState(false);
  const [finalGradeSortOrder, setFinalGradeSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const students = Posts;

  const showDetails = (students) => {
    // for(let i = 0; i< students.length; i++)
    const details = `<h3>Details</h3>ID: ${students.no}<br> Name: ${
      students.name
    }<br>Ticket Number: ${students.ticket_number}<br>Rating Grade: ${
      students.rating_grade
    }<br>Exam Grade: ${students.exam_grade}<br>Final Grade: ${(
      0.6 * students.exam_grade +
      0.4 * students.rating_grade
    ).toFixed(2)}<br>Status: ${
      0.6 * students.exam_grade + 0.4 * students.rating_grade > 4
        ? "passed"
        : "failed"
    }<br>Comments: ${students.Details}<br>`;
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "Close";
    closeButton.classList.add("close-button");

    modalContent.innerHTML = details;
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    closeButton.addEventListener("click", () => {
      document.body.removeChild(modal);
    });
  };

  //sorting by name
  const handleSort = () => {
    const sortedData = [...searchData].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : -1
        : a.name.toLowerCase() < b.name.toLowerCase()
        ? 1
        : -1
    );
    setSearchData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  //sorting by finalGrade
  const handleSort1 = () => {
    const sortedData = [...searchData].sort((a, b) =>
      finalGradeSortOrder === "asc"
        ? a.rating_grade + a.exam_grade - (b.rating_grade + b.exam_grade)
        : b.rating_grade + b.exam_grade - (a.rating_grade + a.exam_grade)
    );
    setSearchData(sortedData);
    setFinalGradeSortOrder(finalGradeSortOrder === "asc" ? "desc" : "asc");
  };
  //SearchBar
  const handleSearch = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord + "input word");
    const newFilter = Posts.filter((value) => {
      return value.name.toLowerCase().includes(searchWord);
    });

    setSearchData(newFilter);
  };
  //for passed and falied
  const handleFilter = (status) => {
    setFilterStatus(status);
    if (status === "passed") {
      const newFilter = Posts.filter(
        (value) => value.rating_grade + value.exam_grade > 5
      );
      setSearchData(newFilter);
    } else if (status === "failed") {
      const newFilter = Posts.filter(
        (value) => value.rating_grade + value.exam_grade <= 5
      );
      setSearchData(newFilter);
    } else {
      setSearchData(Posts);
    }
  };

  let numStudents = students.length;
  let sum = 0;
  students.map((row) => {
    sum = sum + (0.4 * row.rating_grade + 0.6 * row.exam_grade);
    return 0.4 * row.rating_grade + 0.6 * row.exam_grade; // return value
  });
  const avg = Math.round(sum / numStudents);

  let maxi = 0;
  students.map((row) => {
    const curr_max = 0.4 * row.rating_grade + 0.6 * row.exam_grade;
    maxi = Math.max(maxi, curr_max);
    return curr_max; // return value
  });

  let mini = Number.MAX_SAFE_INTEGER;
  students.map((row) => {
    const curr_min = 0.4 * row.rating_grade + 0.6 * row.exam_grade;
    mini = Math.min(mini, curr_min);
    return curr_min;
  });

  return (
    <div className="main">
      <div className="btn">
        <button onClick={() => handleFilter("All")} className="btns">
          All
        </button>
        <button onClick={() => handleFilter("passed")} className="btns">
          Passed
        </button>
        <button onClick={() => handleFilter("failed")} className="btns">
          Failed
        </button>
        <button onClick={handleSort} className="btns">
          A-Z
        </button>
        <button onClick={handleSort1} className="btns">
          1-10
        </button>

        <input
          placeholder="search by name"
          className="search"
          type="text"
          onChange={handleSearch}
        />
      </div>

      <table>
        <thead>
          <tr className="tr1">
            <th>No</th>
            <th>Name</th>
            <th>Ticket’s number</th>
            <th>Rating grade</th>
            <th>Exam grade</th>
            <th>Final grade</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {searchData.map((row, index) => (
            <tr className="tr2 " key={index}>
              <td>{row.no}</td>
              <td>{row.name}</td>
              <td>{row.ticket_number}</td>
              <td>{row.rating_grade}</td>
              <td>{row.exam_grade}</td>
              <td>{0.4 * row.rating_grade + 0.6 * row.exam_grade}</td>
              <td>
                {row.rating_grade + row.exam_grade > 5 ? "passed" : "failed"}
              </td>
              <td>
                <button
                  id="btn1"
                  onClick={(event) => {
                    event.stopPropagation();
                    showDetails(students);
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setShow(!show)} className="Static">
        Show Statistics
      </button>
      {show && (
        <div className="staticBlock">
          <table className="tb2">
            <thead>
              <tr className="tr1">
                <th>Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tr>
              <td>All Student</td>
              <td>{sum}</td>
            </tr>
            <tr>
              <td>Average of All</td>
              <td>{sum / students.length}</td>
            </tr>
            <tr>
              <td>Max Of All</td>
              <td>{maxi}</td>
            </tr>
            <tr>
              <td>Min Of All</td>
              <td>{mini}</td>
            </tr>

            <tr>
              <td>Final-Grade 0-5</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Final-Grade 5-6</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Final-Grade 6-7</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Final-Grade 7-8</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Final-Grade more than 8</td>
              <td>5</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
}

export default Main;

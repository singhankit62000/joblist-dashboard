import React from 'react'
import JobItem from './JobItem';

import "./JobList.css";

const JobList = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let joblist = [];

    const body = JSON.stringify({
    "limit": 10,
    "offset": 0
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
    };

    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
    .then((response) => response.text())
    .then((result) => joblist = result)
    .catch((error) => console.error(error));   

  return (
    <div className='list-container'>
      <JobItem />
      <JobItem />
      <JobItem />
      <JobItem />
    </div>
  )
}

export default JobList
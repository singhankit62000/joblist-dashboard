import React, { useState, useEffect } from 'react'
import JobItem from './JobItem';
import InfiniteScroll from "react-infinite-scroll-component";

import "./JobList.css";
import JobFilter from './JobFilter';
import { CircularProgress } from '@mui/material';

const JobList = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    let totalCount = 0;

    // Modal's open state is used inside the JobItem component for the View more option
    const [open, setOpen] = useState(false);
    const [modalJob, setModalJob] = useState({});

    const handleOpenModal = (jobItem) => {
      setModalJob(jobItem);
      setOpen(!open);
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Helper function for Infinite scroll for fetching more data on page end.
    const fetchMoreData = async () => {
      try {
        setIsLoading(true);
        const body = JSON.stringify({
          "limit": 10,
          "offset": offset,
        });
    
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body
        };

        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const parsedData = await response.json();

        console.log("Response data:", parsedData);

        if (Array.isArray(parsedData.jdList)) {
          setData(data.concat(parsedData.jdList));
          console.log(data);
          setIsLoading(false);
          setOffset(offset + 10);
        } else {
          console.log("Unexpected data format received:", parsedData);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // useEffect for fetching the 1st batch of data
    useEffect(() => {
      async function fetchData() {
        const body = JSON.stringify({
          "limit": 10,
          "offset": offset
        });
    
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body
        };

        try {
          const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
          const parsedData = await response.json();
  
          console.log("Response data:", parsedData);

          if (Array.isArray(parsedData.jdList)) {
            setData(parsedData.jdList);
            totalCount = parsedData.totalCount;
          } else {
            console.log("Unexpected data format received:", parsedData);
          }

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
      fetchData();
    }, []);

  return (
    <div>
      {/* Infinite Scroll component */}
      <InfiniteScroll
          className='list-container'
          dataLength={filteredData.length}
          next={fetchMoreData}
          hasMore={filteredData.length !== totalCount}
          loader={(isLoading) ? <h4><CircularProgress /></h4> : ""}
      >
      <JobFilter className='filter-bar' data={data} setFilteredData={setFilteredData} />
      <div className='joblist-cards'>
        {filteredData && filteredData.map((jobItem) => (
          <JobItem key={jobItem.jdUid} jobItem={jobItem} modalJob={modalJob} open={open} handleOpenModal={handleOpenModal}/>
        ))}
      </div>
      </InfiniteScroll>
    </div>
  )
}

export default JobList
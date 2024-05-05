import React, { useState, useEffect } from 'react'
import JobItem from './JobItem';
import InfiniteScroll from "react-infinite-scroll-component";

import "./JobList.css";

const JobList = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    let totalCount = 0;

    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
      setOpen(!open);
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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
    }, [offset]);

  return (
    <div>
      <InfiniteScroll
          className='list-container'
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={data.length !== totalCount}
          loader={(isLoading) ? <h4>Loading...</h4> : ""}
      >
      {data && data.map((jobItem) => (
        <JobItem key={jobItem.jdUid} jobItem={jobItem} open={open} handleOpenModal={handleOpenModal}/>
      ))}
      </InfiniteScroll>
    </div>
  )
}

export default JobList
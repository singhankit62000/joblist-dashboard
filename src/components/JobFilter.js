import { Suspense, lazy, useState, useEffect } from "react";
import { CircularProgress, Grid } from "@mui/material";
import hardData from "../data.json";

const MultiSelect = lazy(() => import("./MultiSelect"));
const SingleSelect = lazy(() => import("./SingleSelect"));

const JobFilter = ({ data, setFilteredData }) => {
  const roles = [...new Set(data.map((job) => job.jobRole))];
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedMode, setSelectedMode] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState("");

  useEffect(() => {
    // Call the filter function whenever any filter value changes
    filterData();
  }, [selectedRoles, selectedMode, selectedExperience]);

  // Filter function to filter job data based on selected filters
  const filterData = () => {
    let filteredData = data.filter((job) => {
      // Filter by roles
      if (selectedRoles.length > 0 && !selectedRoles.includes(job.jobRole)) {
        return false;
      }
      // Filter by mode
      if (selectedMode.length > 0 && ((selectedMode.includes("Hybrid/In-Office") && job.location === "Remote") || (selectedMode.includes("Remote") && job.location !== "Remote") )) {
        return false;
      }
      // Filter by experience
      if ((selectedExperience !== "" && job.minExp > parseInt(selectedExperience))) {
        return false;
      }

      return true;
    });
    console.log(filteredData);
    // Update the filtered data in parent component
    setFilteredData(filteredData.length > 0 ? filteredData : data);
  };

  useEffect(() => {
    // Ensure that initially, filteredData matches jobDataList
    setFilteredData(data);
  }, [data]);

  const handleRoleChange = (event, value) => {
    setSelectedRoles(event);
  };

  const handleModeChange = (event, value) => {
    setSelectedMode(event);
  };

  const handleExperienceChange = (event, inputs) => {
    setSelectedExperience(event);
  };

  return (
    <>
      {/* Grid container to hold all the filters */}
      <Grid lg={12} item container spacing={2} style={{ marginLeft: '20%', marginRight: '20%' }}>
        <Suspense fallback={<CircularProgress />}>
          <Grid item lg={2} xs={6} sm={6}>
            <MultiSelect
              options={roles}
              name="Roles"
              onChange={handleRoleChange}
            />
          </Grid>
          <Grid item lg={2} xs={6} sm={6}>
            <MultiSelect
              options={hardData.mode}
              name="Mode"
              onChange={handleModeChange}
            />
          </Grid>
          <Grid item lg={2} xs={12} sm={4}>
            <SingleSelect
              options={hardData.experience}
              name="Experience"
              width={150}
              onChange={handleExperienceChange}
            />
          </Grid>
        </Suspense>
      </Grid>
    </>
  );
};

export default JobFilter;

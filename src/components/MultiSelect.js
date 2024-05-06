import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const MultiSelect = ({ options, name, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event, value) => {
    console.log(event.target.value);
    setSelectedOptions(value);
    onChange(value);
  };

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={options}
      size="small"
      value={selectedOptions}
      onChange={handleSelectChange}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={name} placeholder={name} />
      )}
    />
  );
};

export default MultiSelect;

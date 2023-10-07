import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from 'prop-types';

SelectedCity.propTypes = {
      cityApiName: PropTypes.string.isRequired,
      availableCities: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired
}

export default function SelectedCity({cityApiName , availableCities , onChange}) {
  
  return (
    <FormControl style={{ width: "200px" ,marginBottom:"10px"}}>
      <InputLabel id="demo-simple-select-city" style={{ color: "grey" }}>
        <span
          style={{
            color: "white",
          }}
        >
          City
        </span>
      </InputLabel>
      <Select
        style={{ color: "white" }}
        labelId="demo-simple-select-city"
        id="demo-select-city"
        value={cityApiName}
        label="المدينة"
        onChange={onChange}
      >
        {availableCities.map((city, index) => {
          return (
            <MenuItem value={city.apiName} key={index}>
              {city.displayName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

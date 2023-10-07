import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

SelectedCountry.propTypes = {
  countryApiName: PropTypes.string.isRequired,
  availableCountry: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function SelectedCountry({
  countryApiName,
  availableCountry,
  onChange,
}) {
  return (
    <FormControl style={{ width: "200px"  }}>
      <InputLabel id="demo-simple-select-country" style={{ color: "grey" }}>
        <span
          style={{
            color: "white",
          }}
        >
          country
        </span>
      </InputLabel>
      <Select
        style={{ color: "white" }}
        labelId="demo-simple-select-country"
        id="demo-select-country"
        value={countryApiName}
        label="الدولة"
        onChange={onChange}
      >
        {availableCountry.map((country, index) => {
          return (
            <MenuItem value={country.apiName} key={index}>
              {country.displayName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

import { Grid } from "@mui/material";
import PropTypes from "prop-types";

TopRowComponent.propTypes = {
  today: PropTypes.string,
  cityDisplayName: PropTypes.string,
  remainingTime: PropTypes.number,
  prayerName: PropTypes.string,
};

export default function TopRowComponent({
  today,
  cityDisplayName,
  remainingTime,
  prayerName,
}) {
  return (
    <Grid container columns={{sm: 12}} justifyContent="center">
      <Grid xs={6}>
        <p style={{fontSize:"2rem"}}> {today}</p>
        <h1>{cityDisplayName}</h1>
      </Grid>
      <Grid xs={6}>
        <p style={{fontSize:"2rem"}}>متبقى حتى صلاة {prayerName}</p>
        <h1>{remainingTime}</h1>
      </Grid>
    </Grid>
  );
}

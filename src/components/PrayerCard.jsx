import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

PrayerCard.propTypes = {
  prayerImage: PropTypes.string,
  prayerName: PropTypes.string,
  prayerTime: PropTypes.number,
};

export default function PrayerCard({ prayerImage, prayerName, prayerTime }) {
  return (
    <Card sx={{ maxWidth: 300 }} style={{ marginTop: "10px" }}>
      <CardMedia
        sx={{ height: 140, width: 220 }}
        image={prayerImage}
        alt="my-image"
        title="prayer image"
      />
      <CardContent>
        <Typography gutterBottom variant="p" component="div" style={{fontSize:"2rem"}}>
          {prayerName}
        </Typography>
        <Typography variant="p" color="text.secondary" style={{fontSize:"4rem"}}>
          {prayerTime}
        </Typography>
      </CardContent>
    </Card>
  );
}

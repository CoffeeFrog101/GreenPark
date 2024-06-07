import Button from "@mui/material/Button";


const MapButton = (props) => {
  return (
    <Button variant="contained" className="home-buttons">
        {props.text}
    </Button>
  );
};

export default MapButton;
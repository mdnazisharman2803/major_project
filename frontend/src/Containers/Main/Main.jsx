import Img from "../../assests/ai.jpg";
import Form from "../Form/Form";
import { makeStyles, useTheme } from "@mui/styles";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "70%",
    display: "block",
    margin: "auto",
  },
  main: {
    minHeight: 500,
  },
}));
const Main = (props) => {
  const classes = useStyles();
  return (
    <>
      <Grid container alignItems="center" className={classes.main}>
        <Grid item sm={6}>
          <Typography variant="h2" color="initial">
            Image Sentiment Analysis Based on text
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1" color="initial">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              iste totam non vero repudiandae provident inventore omnis iusto
              minus odio, facere, eligendi in, deleniti dicta asperiores fuga
              maiores dolore deserunt!
            </Typography>
            <a className="check-btn" href="">
              Check now
            </a>
          </Box>
        </Grid>
        <Grid item sm={6}>
          <img src={Img} className={classes.img} alt="" />
        </Grid>
      </Grid>
      <Form />
    </>
  );
};

export default Main;

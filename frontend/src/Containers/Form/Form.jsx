import { useEffect, useState } from "react";
import UploadImg from "../../assests/upload.png";
import { makeStyles, useTheme } from "@mui/styles";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "70%",
    display: "block",
    margin: "auto",
  },
  main: {
    minHeight: 600,
  },
  uploadedImg: {
    width: "100%",
    maxHeight: 360,
  },
}));
const Form = (props) => {
  const [state, setState] = useState({
    loading: false,
    curImg: null,
    imgFile: null,
    curRes: null,
    oldRes: [],
  });
  const classes = useStyles();

  const selectImgHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setState({
        ...state,
        curImg: URL.createObjectURL(img),
        imgFile: img,
      });
    }
  };
  const getResults = (event) => {
    setState({
      ...state,
      loading: true,
    });
    const formData = new FormData();
    formData.append("image", state.imgFile);
    axios({
      url: "http://127.0.0.1:8000/api/sentiment/v1/upload/",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        setState({
          ...state,
          curRes: res.data.result,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const newImage = () => {
    setState({
      loading: false,
      curImg: null,
      imgFile: null,
      curRes: null,
      oldRes: [...state.oldRes, { img: state.curImg, res: state.curRes }],
    });
  };
  const change = () => {
    setState({
      ...state,
      curImg: null,
      imgFile: null,
      curRes: null,
    });
  };
  return (
    <>
      <Grid container alignItems="center" className={classes.main}>
        <Grid item sm={6}>
          {state.curImg ? (
            <>
              <img src={state.curImg} className={classes.uploadedImg} alt="" />
              <Box mt={2}>
                {state.loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <button onClick={getResults} className="analyse-btn">
                      Analyse
                    </button>
                    {state.curRes ? (
                      <button onClick={newImage} className="analyse-btn">
                        Test new Image
                      </button>
                    ) : null}
                    <button onClick={change} className="analyse-btn change">
                      Change
                    </button>
                  </>
                )}
              </Box>
            </>
          ) : (
            <div className="upload">
              <div>
                <input
                  type="file"
                  name="img"
                  onChange={selectImgHandler}
                  className="upload-input"
                />
                <img src={UploadImg} alt="" />
                <span className="upload-btn">upload Image</span>
              </div>
            </div>
          )}
        </Grid>
        <Grid item sm={6}>
          {state.loading ? (
            <>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                className={classes.loader}
              >
                <Box>
                  <Grid container alignItems="center" justifyContent="center">
                    <CircularProgress />
                  </Grid>
                  <Typography variant="h6" color="initial">
                    Waiting for results
                  </Typography>
                </Box>
              </Grid>
            </>
          ) : (
            <div className="result">
              <h3>Ananlysis Result</h3>
              <div
                className={`tab ${state.curRes == "positive" ? "active" : ""}`}
              >
                Positive
              </div>
              <div
                className={`tab ${state.curRes == "negative" ? "active" : ""}`}
              >
                Negative
              </div>
              <div
                className={`tab ${state.curRes == "random" ? "active" : ""}`}
              >
                Random
              </div>
            </div>
          )}
        </Grid>
      </Grid>

      {state.oldRes.map((res, index) => {
        return (
          <Grid
            key={index}
            container
            alignItems="center"
            className={classes.main}
          >
            <Grid item sm={6}>
              <img src={res.img} className={classes.uploadedImg} alt="" />
            </Grid>
            <Grid item sm={6}>
              <div className="result">
                <div className={`tab ${res.res == "positive" ? "active" : ""}`}>
                  Positive
                </div>
                <div className={`tab ${res.res == "negative" ? "active" : ""}`}>
                  Negative
                </div>
                <div className={`tab ${res.res == "random" ? "active" : ""}`}>
                  Random
                </div>
              </div>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default Form;

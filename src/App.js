import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import {
  Grid,
  Container,
  TextField,
  Typography,
  IconButton,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import LinkIcon from "@material-ui/icons/Link";
import { makeStyles } from "@material-ui/styles";

import cipher_enc, { isNumeric, removePolishChars } from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    maxWidth: "100vw",
    //width: "100vw",
    //background: "#afd9ff",\
    justifyContent: "flex-start",
  },
  title: {
    marginRight: "auto",
    marginLeft: "auto",
    paddingTop: theme.spacing(3),
  },
  tekst: {
    paddingRight: "auto",
    paddingLeft: "auto",
  },
  centerVertical: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  cp: {
    textAlign: "center",
  },
  result: {
    textAlign: "center",
  },
  resultText: {
    wordBreak: "break-word",
  },
  textField: {},
  keyArrows: {
    position: "absolute",
    transform: "translateY(-100%)",
    right: 0,
  },
}));

function App() {
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [key, setKey] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    const textFromSearch = searchParams.get("text");
    const keyFromSearch = isNumeric(searchParams.get("key"))
      ? searchParams.get("key")
      : 0;
    setText(textFromSearch || "");
    setKey(parseInt(keyFromSearch));

    setLoaded(true);
  }, []);

  function changeKeyValue(step) {
    let value = isNumeric(key) ? parseInt(key) : 0;
    setKey(value + step);
  }

  useEffect(() => {
    if (!loaded) return;

    // Set result
    setResult(cipher_enc(key | 0, text));

    // Set query params
    setSearchParams({ key, text });
  }, [key, text]);

  const onChange = (e) => {
    const value = e.target.value;
    setText(removePolishChars(value.toUpperCase()));
  };

  const onKeyChange = (e) => {
    var value = e.target.value;

    if (isNumeric(value) || ["-", ""].includes(value)) {
      setKey(value);
    }
  };

  return (
    <Grid className={classes.root}>
      <Grid item className={classes.title}>
        <Typography variant="h4">Szyfr Cezara</Typography>
      </Grid>
      <Grid item className={classes.centerVertical}>
        <Typography className={classes.cp} variant="caption">
          {"Michal Kulbacki © 2022"}
        </Typography>
      </Grid>
      <Grid item>
        <Container className={classes.tekst}>
          <Grid container direction="column" spacing={2}>
            <Grid item className={classes.centerVertical}>
              <Typography variant="subtitle2">Tekst</Typography>
              <TextField
                placeholder="XEDKW HJEFWF"
                variant="outlined"
                rows={5}
                multiline
                value={text}
                onChange={onChange}
              />
            </Grid>
            <Grid item className={classes.centerVertical}>
              <div>
                <Typography variant="subtitle2">Klucz</Typography>
                <TextField
                  value={key}
                  onChange={onKeyChange}
                  id="standard-number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div style={{ position: "relative" }}>
                <ButtonGroup
                  className={classes.keyArrows}
                  aria-label="Key buttons"
                  variant="outlined"
                  orientation="vertical"
                  size="small"
                >
                  <IconButton onClick={() => changeKeyValue(1)}>
                    <ArrowDropUpIcon />
                  </IconButton>
                  <IconButton onClick={() => changeKeyValue(-1)}>
                    <ArrowDropDownIcon />
                  </IconButton>
                </ButtonGroup>
              </div>
            </Grid>
            <Grid item className={clsx(classes.centerVertical, classes.result)}>
              <Typography>Wynik:</Typography>
              <Typography className={classes.resultText}>{result}</Typography>
            </Grid>
            <Grid item className={classes.centerVertical}>
              {result.length ? (
                <Button
                variant="outlined"
                  startIcon={<LinkIcon />}
                  onClick={() => navigator.clipboard.writeText(result)}
                >
                  KOPIUJ SZYFR
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

export default App;

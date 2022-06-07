import React, { useEffect, useState } from 'react'
import { Box, TextField, Grid, Alert, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import ListOfNonEnglishWords from './NonEnglishWords';

const baseURL = '/api/v1/words_requests'

const TextChecker = () => {
  const [textValue, setTextValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ifError, setIfError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [nonEnglishWords, setNonEnglishWords] = useState([]);

  const handleChange = (event) => {
    const inputVal = event.target.value;
    if (inputVal === "") {
      setNonEnglishWords([]);
    }
    setTextValue(inputVal);
  }

  const handleClick = async () => {
    if (textValue.replace(/\s/g, "") === "") {
      showAlert("Checking text can not be blank!");
      return;
    }
    setIsLoading(true);
    axios
    .post(baseURL, {
      text: { value: textValue }
    })
    .then((response) => {
        setNonEnglishWords(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        showAlert("Something is broken on server. Try later.");
      });
  }

  const showAlert = (msg) => {
    setAlertMessage(msg)
    setIfError(true);
    setTimeout(() => {
      setIfError(false);
    }, 2500);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <h1>Check your text for non English words.</h1>
            <TextField
              fullWidth
              label="Input your text here"
              multiline
              maxRows={10}
              variant="standard"
              value={textValue}
              onChange={handleChange}
            />
            <LoadingButton
              onClick={handleClick}
              endIcon={<SendIcon />}
              loading={isLoading}
              loadingPosition="end"
              variant="contained"
            >
              {isLoading ? "Checking..." : "Check"}
            </LoadingButton>
            {ifError && <Alert variant="filled" severity="error">
              {alertMessage}
            </Alert>}
            <ListOfNonEnglishWords nonEnglishWords={nonEnglishWords} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TextChecker;

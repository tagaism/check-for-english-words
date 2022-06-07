import React from 'react'
import { Paper, FormHelperText } from '@mui/material';

const ListOfNonEnglishWords = ({ nonEnglishWords }) => {
  return (
    nonEnglishWords.length > 0 ? <>
      <Paper elevation={0}>
        {nonEnglishWords.map(word => `${word} `)}
      </Paper>
      <FormHelperText>
        Non English Words
      </FormHelperText>
    </>
      :
    <></>
  )
}

export default ListOfNonEnglishWords;

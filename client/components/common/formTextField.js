import React from 'react'
import {FormControl, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  formElm: {
    paddingBottom: '2%'
  }
}))

const FormTextField = (error, label, value, onChange, helperText) => {
  const classes = useStyles()

  return (
    <FormControl required>
      <TextField
        error={error}
        label={label}
        id={label}
        value={value}
        onChange={onChange}
        helperText={helperText}
        className={classes.formElm}
        variant="outlined"
        required
      />
    </FormControl>
  )
}

export default FormTextField

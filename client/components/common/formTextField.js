import React from 'react'
import {FormControl, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  formElm: {
    paddingBottom: '2%'
  }
}))

const FormTextField = props => {
  const {labelName, error, helperText, id, value, onChange} = props

  console.log('@@@ props', props)
  const classes = useStyles()

  return (
    <FormControl required>
      <TextField
        error={error}
        label={labelName}
        id={id}
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

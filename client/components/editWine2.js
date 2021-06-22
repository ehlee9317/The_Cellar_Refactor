/* eslint-disable max-statements */
import React, {useEffect, useState} from 'react'
import {fetchSingleWines, updateWine} from '../store/product'
import FormTextField from './common/formTextField'

//Material UI
import {
  FormControl,
  Container,
  Button,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch, useSelector} from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {
    width: '100vh',
    alignContent: 'center',
    marginTop: '5%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'Lobster Two, cursive',
    color: '#5b0e2d'
  },
  title: {
    marginBottom: '5%'
  },
  form: {
    backgroundColor: 'white',
    padding: '5%',
    borderRadius: '5%',
    margin: '5%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  selectElm: {
    paddingBottom: '2%',
    marginLeft: '4%'
  },
  button: {
    backgroundColor: '#5b0e2d',
    color: '#ffa781',
    marginBottom: '5%'
  }
}))

const EditWine = props => {
  // set wine states
  const [wineId, setWineId] = useState(props.match.params.wineId)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [year, setYear] = useState('')
  const [origin, setOrigin] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  //set Errors
  const [errorName, setErrorName] = useState(false)
  const [errorPrice, setErrorPrice] = useState(false)
  const [errorYear, setErrorYear] = useState(false)
  const [errorOrigin, setErrorOrigin] = useState(false)
  const [errorDescription, setErrorDescription] = useState(false)

  // set Helper Text
  const [nameHelperText, setNameHelperText] = useState('Name field is required')
  const [priceHelperText, setPriceHelperText] = useState(
    'Price field is required'
  )
  const [yearHelperText, setYearHelperText] = useState('Year field is required')
  const [originHelperText, setOriginHelperText] = useState(
    'Origin field is required'
  )
  const [descriptionHelperText, setDescriptionHelperText] = useState(
    'Description field is required'
  )

  //Prep the tools
  const classes = useStyles()
  const dispatch = useDispatch()
  const {product} = useSelector(store => store)
  const wineInfo = product.singleWine
  console.log('##### wineinfo =>', wineInfo)
  //Fetch data for single wine
  useEffect(
    () => {
      async function getWine() {
        if (wineId) await dispatch(fetchSingleWines(wineId))
      }
      getWine()
    },
    [dispatch]
  )

  useEffect(
    () => {
      function setWine(wines) {
        console.log('#@ useEffect wines => ', wines)
        if (wines) {
          setName({...name, name: wines.name})
          setPrice({...price, price: wines.price})
          setType({...type, type: wines.type})
          setYear({...year, year: wines.year})
          setOrigin({...origin, origin: wines.origin})
          setDescription({...description, description: wines.description})
          setImageUrl({...imageUrl, imageUrl: wines.imageUrl})
        }
      }
      setWine(wineInfo)
    },
    [wineInfo]
  )

  console.log('@#@#@# name =>', name)
  console.log('@#@#@# price =>', price)
  console.log('@#@#@# year =>', year)
  console.log('@#@#@# origin =>', origin)

  //handle change function - Updating textfield
  const handleChange = event => {
    // setState({...state, [event.target.id]: event.target.value})
    setName({...name, name: event.target.value})
    setPrice({...price, price: event.target.value})
    setYear({...year, year: event.target.value})
    setOrigin({...origin, origin: event.target.value})
    setDescription({...description, description: event.target.value})
    setImageUrl({...imageUrl, imageUrl: event.target.value})
  }

  //handle change function - Updating drop down
  const handleDropdownChange = event => {
    setType({type: event.target.value})
  }

  // eslint-disable-next-line complexity
  const handleSubmit = () => {
    setErrorName({errorName: name === ''})
    setErrorPrice({errorName: price === ''})
    setErrorYear({errorName: year === ''})
    setErrorOrigin({errorName: origin === ''})
    setErrorDescription({errorName: description === ''})

    if (
      errorName === false &&
      errorPrice === false &&
      errorYear === false &&
      errorOrigin === false &&
      errorDescription === false
    ) {
      dispatch(updateWine(name, price, year, origin, description))
    }

    console.log('@@@@ errorName => ', errorName)
    console.log('@@@@ errorPrice => ', errorPrice)
    console.log('@@@@ errorYear => ', errorYear)
    console.log('@@@@ errorOrigin => ', errorOrigin)
    console.log('@@@@ errorDescription => ', errorDescription)
  }

  //Form template
  const form = () => {
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <h1 className={classes.title}>Edit {wineInfo.name}</h1>;;;;
        <FormTextField
          error={errorName}
          labelName="Wine Name"
          id="name"
          value={name}
          onChange={handleChange}
          helperText={nameHelperText}
        />
        <FormTextField
          error={errorPrice}
          labelName="Price"
          id="price"
          value={price}
          onChange={handleChange}
          helperText={priceHelperText}
        />
        <FormControl required>
          <Select
            // error={errorType}
            id="type"
            label="Type"
            value={type}
            onChange={handleDropdownChange}
            variant="outlined"
            required
          >
            <MenuItem value="Reds">Red</MenuItem>
            <MenuItem value="Whites">White</MenuItem>
            <MenuItem value="Sparkling">Sparkling</MenuItem>
            <MenuItem value="Rose">Rose</MenuItem>
            <MenuItem value="Fruit">Fruit</MenuItem>
          </Select>
          <FormHelperText className={classes.selectElm}>
            Type field is required
          </FormHelperText>
        </FormControl>
        <FormTextField
          error={errorYear}
          labelName="Year"
          id="year"
          value={year}
          onChange={handleChange}
          helperText={yearHelperText}
        />
        <FormTextField
          error={errorOrigin}
          labelName="Origin"
          id="origin"
          value={origin}
          onChange={handleChange}
          helperText={originHelperText}
        />
        <FormTextField
          error={errorDescription}
          labelName="Description"
          id="description"
          value={description}
          onChange={handleChange}
          helperText={descriptionHelperText}
        />
        <FormTextField
          // error={errorName}
          labelName="Image URL"
          id="imageUrl"
          value={imageUrl === '/images/defaultwine.png' ? '' : imageUrl}
          onChange={handleChange}
          helperText="ImageURL field is optional"
        />
        <Button
          className={classes.button}
          onClick={handleSubmit}
          variant="contained"
        >
          Update
        </Button>
        <Button className={classes.button} href="/admin" variant="contained">
          Cancel
        </Button>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
      </form>
    )
  }

  return <Container maxWidth="sm">{wineInfo ? form() : null}</Container>
}

export default EditWine

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
  // const [wineId, setWineId] = useState(props.match.params.wineId);
  // const [name, setName] = useState('');

  const [state, setState] = useState({
    wineId: props.match.params.wineId,
    name: '',
    price: '',
    type: '',
    year: '',
    origin: '',
    description: '',
    imageUrl: ''
  })

  //set Errors
  const [errorMessage, setErrorMessage] = useState({
    errorName: false,
    errorPrice: false,
    // errorType: false,
    errorYear: false,
    errorOrigin: false,
    errorDescription: false
  })

  const [nameHelperText, setNameHelperText] = useState('Name field is required')

  const [priceHelperText, setPriceHelperText] = useState(
    'Price field is required'
  )

  //Prep the tools
  const classes = useStyles()
  const dispatch = useDispatch()
  const {product} = useSelector(store => store)
  const wineInfo = product.singleWine

  //Fetch data for single wine
  useEffect(
    () => {
      async function getWine() {
        if (state.wineId) await dispatch(fetchSingleWines(state.wineId))
      }
      getWine()
    },
    [dispatch]
  )

  useEffect(
    () => {
      function setWine(wines) {
        if (wines) {
          setState({
            ...state,
            name: wines.name,
            price: wines.price,
            type: wines.type,
            year: wines.year,
            origin: wines.origin,
            description: wines.description,
            imageUrl: wines.imageUrl
          })
        }
      }
      setWine(wineInfo)
    },
    [wineInfo]
  )

  //handle change function - Updating textfield
  const handleChange = event => {
    setState({...state, [event.target.id]: event.target.value})
  }

  //handle change function - Updating drop down
  const handleDropdownChange = event => {
    setState({...state, type: event.target.value})
  }

  const handleSubmit = () => {
    const {name, price, year, origin, description} = state

    const {
      errorName,
      errorPrice,
      errorYear,
      errorOrigin,
      errorDescription
    } = errorMessage

    // Check to make sure below input fields are NOT EMPTY
    setErrorMessage({
      errorName: name === '',
      errorPrice: price === '',
      errorYear: year === '',
      errorOrigin: origin === '',
      errorDescription: description === ''
    })

    // // Check to make sure Name doesn't have any special characters
    // if(name !== name.replace(/[^A-Za-z0-9 ]/g, "")) {
    //   setErrorMessage({ errorName: true });
    //   setNameHelperText('Please remove any special characters.');
    // } else {
    //   setErrorMessage({ errorName: false });
    //   setNameHelperText("Name field is required");
    // }

    // Check to make sure price is NUMBER
    if (isNaN(price)) {
      setErrorMessage({errorPrice: true})
      setPriceHelperText('Please only input numbers for price.')
    } else if (price === '') {
      setErrorMessage({errorPrice: true})
      setPriceHelperText('Price field is required')
    } else {
      setErrorMessage({errorPrice: false})
      setPriceHelperText(' ')
    }

    // if( errorName === false && errorPrice === false && errorYear === false && errorOrigin === false && errorDescription === false) {
    //   dispatch(updateWine(state));
    // }

    if (name && price && year && origin && description) {
      dispatch(updateWine(state))
    }

    console.log('@@@@ errorMessage', errorMessage)
  }

  const {
    errorName,
    errorPrice,
    errorYear,
    errorOrigin,
    errorDescription
  } = errorMessage

  //Form template
  const form = () => {
    return (
      <form className={classes.form} onSubmit={handleSubmit} name={name}>
        ;
        <h1 className={classes.title}>Edit {wineInfo.name}</h1>;
        <FormTextField
          error={errorName}
          labelName="Wine Name"
          id="name"
          value={state.name}
          onChange={handleChange}
          // helperText="Wine Name field is required"
          helperText={nameHelperText}
        />
        <FormTextField
          error={errorPrice}
          labelName="Price"
          id="price"
          value={state.price}
          onChange={handleChange}
          // helperText="Price field is required"
          helperText={priceHelperText}
        />
        <FormControl required>
          <Select
            // error={errorType}
            id="type"
            label="Type"
            value={state.type}
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
          value={state.year}
          onChange={handleChange}
          helperText="Year field is required"
        />
        <FormTextField
          error={errorOrigin}
          labelName="Origin"
          id="origin"
          value={state.origin}
          onChange={handleChange}
          helperText="Origin field is required"
        />
        <FormTextField
          error={errorDescription}
          labelName="Description"
          id="description"
          value={state.description}
          onChange={handleChange}
          helperText="Description field is required"
        />
        <FormTextField
          // error={state.errorName}
          labelName="Image URL"
          id="imageUrl"
          value={
            state.imageUrl == '/images/defaultwine.png' ? '' : state.imageUrl
          }
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

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
  // set States
  const [wineId, setWineId] = useState(props.match.params.wineId)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [year, setYear] = useState('')
  const [origin, setOrigin] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  // const [state, setState] = useState({
  //   wineId: props.match.params.wineId,
  //   name: '',
  //   price: '',
  //   type: '',
  //   year: '',
  //   origin: '',
  //   description: '',
  //   imageUrl: ''
  // })

  //set Errors
  const [errorName, setErrorName] = useState(false)
  const [errorPrice, setErrorPrice] = useState(false)
  const [errorYear, setErrorYear] = useState(false)
  const [errorOrigin, setErrorOrigin] = useState(false)
  const [errorDescription, setErrorDescription] = useState(false)

  // const [errorMessage, setErrorMessage] = useState({
  //   errorName: false,
  //   errorPrice: false,
  //   errorYear: false,
  //   errorOrigin: false,
  //   errorDescription: false
  // })

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
        if (wines) {
          // setState({
          //   ...state,
          //   name: wines.name,
          //   price: wines.price,
          //   type: wines.type,
          //   year: wines.year,
          //   origin: wines.origin,
          //   description: wines.description,
          //   imageUrl: wines.imageUrl
          // })
          setName({name: wines.name})
          setPrice({price: wines.price})
          setType({type: wines.type})
          setYear({year: wines.year})
          setOrigin({origin: wines.origin})
          setDescription({description: wines.description})
          setImageUrl({imageUrl: wines.imageUrl})
        }
      }
      setWine(wineInfo)
    },
    [wineInfo]
  )

  //handle change function - Updating textfield
  const handleChange = event => {
    // setState({...state, [event.target.id]: event.target.value})
    setName({name: event.target.value})
    setPrice({price: event.target.value})
    setYear({year: event.target.value})
    setOrigin({origin: event.target.value})
    setDescription({description: event.target.value})
    setImageUrl({imageUrl: event.target.value})
  }

  //handle change function - Updating drop down
  const handleDropdownChange = event => {
    setType({type: event.target.value})
  }

  // eslint-disable-next-line complexity
  const handleSubmit = () => {
    // const {name, price, year, origin, description} = state

    // const {
    //   errorName,
    //   errorPrice,
    //   errorYear,
    //   errorOrigin,
    //   errorDescription
    // } = errorMessage

    // Check to make sure below input fields are NOT EMPTY
    // setErrorMessage({
    //   errorName: name === '',
    //   errorPrice: price === '',
    //   errorYear: year === '',
    //   errorOrigin: origin === '',
    //   errorDescription: description === ''
    // })
    setErrorName({errorName: name === ''})
    setErrorPrice({errorName: price === ''})
    setErrorYear({errorName: year === ''})
    setErrorOrigin({errorName: origin === ''})
    setErrorDescription({errorName: description === ''})

    // // Check to make sure Name doesn't have any special characters
    // if(name !== name.replace(/[^A-Za-z0-9 ]/g, "")) {
    //   setErrorMessage({ errorName: true });
    //   setNameHelperText('Please remove any special characters.');
    // } else if(name === '') {
    //   setErrorMessage({ errorName: true });
    //   setNameHelperText('Name field is required');
    // } else {
    //   setErrorMessage({ errorName: false });
    //   setNameHelperText(" ");
    // }

    // if(name !== name.replace(/[^A-Za-z0-9 ]/g, "") || name === "") {
    //   setErrorMessage({
    //     ...errorMessage,
    //     errorName: true
    //   });
    //   setNameHelperText('Name field is required (no special characters)');
    // }
    // else {
    //   setErrorMessage({
    //     ...errorMessage,
    //     errorName: false
    //   });
    //   setNameHelperText(" ");
    // }

    // Check to make sure price is NUMBER
    // if (isNaN(price)) {
    //   console.log("1111");
    //   setErrorMessage({
    //     ...errorMessage,
    //     errorPrice: true
    //   })
    //   setPriceHelperText('Please only input numbers for price.')
    // } else if (price === '') {
    //   console.log("22222");
    //   setErrorMessage({
    //     ...errorMessage,
    //     errorPrice: true
    //   })
    //   setPriceHelperText('Price field is required')
    // }

    // if(isNaN(price) || price === '' ) {
    //   setErrorMessage({
    //     ...errorMessage,
    //     errorPrice: true
    //   })
    //   setPriceHelperText("Price field is required (numbers only)")
    // }

    // if(isNaN(price) !== false && price !== '') {
    //   console.log("~~~~ got here");
    //   setErrorMessage({
    //     ...errorMessage,
    //     errorPrice: false
    //   })
    //   setPriceHelperText('')
    // }

    // Check to make sure year is Number and not past current year
    // if(isNaN(year) || year > new Date().getFullYear() || year === '') {
    //   console.log("year1111")
    //   setErrorMessage({
    //     ...errorMessage,
    //     errorYear: true
    //   });
    //   // setYearHelperText(`Please only input numbers less than or equal to ${new Date().getFullYear()}`);
    //   setYearHelperText('Please only input numbers less than or equal to 2020');
    // }

    // if(isNaN(year) !== false && year <= new Date().getFullYear() && year !== ''){
    //   console.log("year2222")
    //   setErrorMessage({
    //     ...errorMessage,
    //     errorYear: false
    //   });
    //   setYearHelperText('');
    // }

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

  // const {
  //   errorName,
  //   errorPrice,
  //   errorYear,
  //   errorOrigin,
  //   errorDescription
  // } = errorMessage

  //Form template
  const form = () => {
    return (
      <form className={classes.form} onSubmit={handleSubmit} name={name}>
        <h1 className={classes.title}>Edit {wineInfo.name}</h1>;;;
        <FormTextField
          error={errorName}
          labelName="Wine Name"
          id="name"
          value={state.name}
          onChange={handleChange}
          helperText={nameHelperText}
        />
        <FormTextField
          error={errorPrice}
          labelName="Price"
          id="price"
          value={state.price}
          onChange={handleChange}
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
          helperText={yearHelperText}
        />
        <FormTextField
          error={errorOrigin}
          labelName="Origin"
          id="origin"
          value={state.origin}
          onChange={handleChange}
          helperText={originHelperText}
        />
        <FormTextField
          error={errorDescription}
          labelName="Description"
          id="description"
          value={state.description}
          onChange={handleChange}
          helperText={descriptionHelperText}
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

import {React,useEffect,dispatch, useState } from "react";
import {Grid,Paper,Box,Card,CardContent,Typography,CardMedia} from '@mui/material';
import {ManageSearch } from '@mui/icons-material';
import {useSelector, useDispatch} from "react-redux";
import {appSelector,appActions } from "../../redux/appRedux";
import api,{IMG_URL,POKE_IMG} from '../../services/api'

const FetchList = () => {
  const dispatch = useDispatch()
  const [pokemons, setPokemons] = useState(null)
  const [next, setNext] = useState(null)
  useEffect(()=>{
    dispatch(appActions.setPageTitle('LISTAS'))
    getPokemons()
   },[])

const getPokemons = async () => {
  try {
    //esto renderiza spiner el dispatch
    //dispatch(appActions.loading(true))
    const result = await api.GET(api.pokemons)
    if(result){
        console.log('poke: ', result)
        setPokemons(result.results) //es un array, use console.log
        setNext(result.next)  //ruta a la siguiente pagina
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(appActions.loading(false))
    }
}

const getPokemonImgId = (id) => {
  console.log('long. '+id.length)
    switch (id.length) {
    case 1:
    return `00${id}`
    case 2:
    return `0${id}`
    default:
    return id
    }
}
const renderItem = (item) => {
  const path = item.url.split('/')
  const imgID = getPokemonImgId(path[6])
  return(
    <Card p={2} sx={{ display: 'flex', height:100, cursor:'pointer',
      '&:hover': {backgroundColor: '#5acdbd', color:'white'}}}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5">
          N° {path[6]} 
        </Typography>
        <Typography component="div" variant="h5">
          {item.name}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        src={`${IMG_URL}${imgID}.png`}
        alt="Live from space album cover"
      />
    </Card>
  )
}


const loadMore = async () => {
  try {
    //dispatch(appActions.loading(true))
    const result = await api.GET(next)
    if(result){
      console.log('poke: ', result.results)
      //al array devuelto con ... se le suma el nuevo array con result
      setPokemons(prev=>[...prev, ...result.results])
      //aqui guardo la direccion de los 20 siguientes
      setNext(result.next)
    }
  } catch (error) {
    console.log(error)
  } finally {
    dispatch(appActions.loading(false))
  }
}


  return (
   <Grid container spacing={3}>
    <Grid item md={12} xs={12}>
     <Paper sx={{p: 2}}>
       <Box>
          <ManageSearch/>
          FetchList
        </Box>
     </Paper>
     <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="div" variant="h5">
            Mi Pokedex
          </Typography>
        </Grid>
        {
          pokemons && pokemons.map((p, index)=>{
            return(
              <Grid item xs={4} key={index}>
                {renderItem(p)}
              </Grid>
            )
          })
        }
        {<Grid item xs={4} >
          <Card p={2} sx={{ display: 'flex', height:100, cursor:'pointer',
              backgroundColor:'#317b52', '&:hover': {backgroundColor: '#5acdbd'}}}
              onClick={()=>loadMore()}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" sx={{color:'white'}}>
                  Cargar Más
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 100, p:2 }}
                image={POKE_IMG}
                alt="Live from space album cover"
              />
          </Card>
        </Grid>}
      </Grid>
    </Grid>
   </Grid>
  );
};


export default FetchList;
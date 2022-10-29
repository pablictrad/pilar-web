import { React,useEffect,dispatch,useState } from "react";
import { v4 as uuid } from 'uuid';
import {Grid,
    Paper,
    Box,
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Stack,
    Checkbox,
    Typography,
    FormControl,
    FormHelperText
  } from '@mui/material';

import { ManageSearch } from '@mui/icons-material';
import {useSelector, useDispatch} from "react-redux";
import { appSelector,appActions } from "../../redux/appRedux";
const Formularios = () => {

    const dispatch = useDispatch()
    
    const initialData = {
        tarea: '',
        detalle: '',
    }
    const initialErrors = {
        tarea: '',
        detalle: '',
    }
    const [name, setName] = useState(null)
    const [data, setData] = useState(initialData)
    const [errors, setError] = useState(initialErrors)
    const todo = useSelector(appSelector.todo)
    useEffect(()=>{
        dispatch(appActions.setPageTitle('FORMULARIOS'))
    },[])
    const handleChange= (e) =>{
         setData(prev=>{
             return({
                ...prev,
                 [e.target.name]: e.target.value
             })
         })
        //dispatch(appActions.addTodo({text:e.target.value, id:uuid()}))
        //await setText(prev=>'')
    }
    const handleSubmit = async () =>{
        if(!data.tarea){
            setError(err=>{
                return({
                    ...errors,
                    tarea: 'La Tarea no puede estar vacio'
                })
            })
        }else if(!data.detalle){
            setError(err=>{
                return({
                    ...errors,
                    detalle: 'El detalle no puede estar vacio'
                })
            })
        }else{
            dispatch(appActions.addTodo({text:data.tarea+": "+data.detalle, id:uuid()}))
        }
        
    }
    const handleChecked = (e, id) => {
        dispatch(appActions.setCompletedTodo({id, completed:e.target.checked}))
      }
      const delTask = async (id) => {
        dispatch(appActions.deleteTodo(id))
      } 
  return (
   <Grid container spacing={3}>
    <Grid item md={12} xs={12}>
    <Card>
        <CardHeader title="Formulario" />
        <CardContent>
            
          <Stack sx={{justifyContent:'space-around'}} direction='row'>
            <Grid item md={6}>
                <FormControl required={true} error={true}>
                    <TextField initialValue={data.tarea} name={'tarea'} label="Tarea" variant="outlined"
                    onBlur={handleChange} />
                    {
                        errors.tarea && (<FormHelperText id="my-helper-text">{errors.tarea}</FormHelperText>)
                    }
                    
                </FormControl>
            </Grid>
            <Grid item md={6}>
                <FormControl required={true} error={true}>
                    <TextField initialValue={data.detalle} name={'detalle'} label="detalle" variant="outlined"
                    onBlur={handleChange} />
                    {
                        errors.detalle && (<FormHelperText id="my-helper-text">{errors.detalle}</FormHelperText>)
                    }
                    
                </FormControl>
            </Grid>
            <Grid item md={6}>
              <Button  variant="contained"
                onClick={()=>handleSubmit()}>Enviar</Button>
            </Grid>
          </Stack>
        </CardContent>
    </Card>
    </Grid>
    <Grid item md={12} xs={12}>
    <Card>
      <CardHeader title="Tareas" />
      <CardContent>
      {todo.map((t, index)=>
        (
        <Stack key={t.id} sx={{justifyContent:'space-between'}}
          direction='row'>
          <Grid item md={1}>
            <Checkbox onChange={e=>handleChecked(e,t.id)} />
          </Grid>
          <Grid item md={9} sx={{pt: 1}}>
            <Typography sx={{fontSize:18,
            fontWeight:700}}>{t.text}</Typography>
          </Grid>
          <Grid item md={2}>
            <Button variant="contained"
              onClick={()=>delTask(t.id)}>Eliminar</Button>
          </Grid>
        </Stack>
        )
      )}
      </CardContent>
    </Card>
    </Grid>
   </Grid>

   
  );
};


export default Formularios;
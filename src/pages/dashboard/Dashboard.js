import { React,useEffect } from "react";
import {Grid,Paper,Box} from '@mui/material';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { ListAlt, ManageSearch } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { appSelector, appActions } from '../../redux/appRedux';





const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(appActions.setPageTitle('TABLERO'))
  
   },[])
  return (
   <Grid container spacing={3}>
    <Grid item md={6} xs={12}>
     <Paper sx={{p: 2}}>
       <Box>
         <Button component={Link} to="/todo">
         <ListAlt/>
            Todo
          </Button>
        </Box>
     </Paper>
    </Grid>
    <Grid item md={6} xs={12}>
     <Paper sx={{p: 2}}>
       <Box>
        <Button component={Link} to="/fetch-list">
          <ManageSearch/>
          FetchList
        </Button>
       </Box>
     </Paper>
    </Grid>
   </Grid>
  );
};


export default Dashboard;
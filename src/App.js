import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText,ListItemSecondaryAction,
IconButton, Grid, Paper, Box, CssBaseline, createTheme, ThemeProvider, useMediaQuery,} 
from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const [tasks, setTasks] = useState([]); //arr hold the list of todo tasks
  const [taskText, setTaskText] = useState(''); //input text
  const [darkMode, setDarkMode] = useState(false); //boolean

  const theme = createTheme({ //fun
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
   
  });

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  React.useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addTask = () => {
    //trim for remove white spaces
    if (taskText.trim() === '') return; //check not empty 
    //copying & merging arr
    setTasks([...tasks, taskText]); //new arr with existing task & add the new task
    setTaskText(''); //clear the input field
  };

  const removeTask = (index) => { //specify the position
    const updatedTasks = [...tasks]; //copy of the tasks using spread ope
    //copied arr store in updaTas variable
    //remove ele for splice modify the contents 
    updatedTasks.splice(index, 1); //1-no of ele you want to remove
    setTasks(updatedTasks); 
  };

  return (
    <ThemeProvider theme={theme}> 
      <CssBaseline /> {/* baseline set of CSS normalize style diff browser */}
      <Container maxWidth="sm" style={{backgroundColor: 'grey' }}>
        <Box mt={4} p={3} component={Paper}> {/* margin top padd */}
          <Grid container spacing={2}>
          <Grid item xs={12}> 
              <IconButton onClick={toggleDarkMode}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <Typography variant="h4" align="center" gutterBottom>
                To-Do App
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="New Task"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                // onKeyPress={(e) => e.key === 'Enter' && addTask()}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    addTask();
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={addTask} //direct call without any additional parameters
              >
                Add Task
              </Button>
            </Grid>
            <Grid item xs={12}>
              <List>
                {tasks.map((task, index) => ( //display
                //special attribute in React used to uniquely identify each element
                //assign unique key based on the element's position in the list
                  <ListItem key={index}>
                    <ListItemText primary={task} />
                    <ListItemSecondaryAction>
                      <IconButton
                        color='error'
                        edge="end"
                        aria-label="delete"
                        //when you need to pass additional parameters to the function 
                        onClick={() => removeTask(index)}
                      >
                        <DeleteIcon /> 
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
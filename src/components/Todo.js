import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppBar, Box, Button, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { Modal, Toolbar } from '@mui/material';
import TableData from './TableData';

let localStoredData = JSON.parse(localStorage.getItem('data')) || []

const Todo = () => {

    // const navigate = useNavigate()
    // Styles
    const styles = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
    const tableStyle = { align: 'center', width: '100%' }
    const paperStyles = { padding: 20, width: 500, margin: "40px auto" }
    const paperStyle = { padding: 20, width: 300,  margin: "10px auto" };
    const textStyle = { margin: '30px auto' };
    const selectStyle = { width: '300px', textalign: 'center' }

    // States
    const [inputData, setInputData] = useState({
        editId: '',
        editTitle: '',
        editDescription: '',
        editStatus: ''
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [open, setOpen] = useState(false);

    // to store array of object
    const [data, setData] = useState(localStoredData)

    const handleChange = (event) => {
        setStatus(event.target.value);
    };


    const handleEditedStatusChange = (event) => {
        setInputData((prevValue) => {
            return {
                ...prevValue,
                editStatus: event.target.value
            }
        })
    }

    const handleEditedTitleChange = (event) => {
        setInputData((prevValue) => {
            return {
                ...prevValue,
                editTitle: event.target.value
            }
        })
    }

    const handleEditedDescriptionChange = (event) => {
        setInputData((prevValue) => {
            return {
                ...prevValue,
                editDescription: event.target.value
            }
        })
    }

    const handleEditSubmit = () => {
        let allTodos = JSON.parse(localStorage.getItem('data'))
        let index = allTodos.findIndex(todo => todo.id === inputData.editId)
        console.log('After Editing ', inputData)
        allTodos[index].title = inputData.editTitle
        allTodos[index].description = inputData.editDescription
        allTodos[index].status = inputData.editStatus
        setData(allTodos)
        localStorage.setItem('data', JSON.stringify(allTodos))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // create object
        let todoData = {
            id: uuidv4(),
            title: title,
            description: description,
            status: status,
        }
        setShowTable(true)
        setData([...data, todoData]);
        setTitle('');
        setDescription('');
        setStatus('')
    }

    console.log('all Todos', data)

    const handleShowData = () => {
        setShowTable(!showTable);
    }

    const backToTodo = () => {
        setShowTable(!showTable);
    }

    // Deleting the data from table
    const deleteData = (id) => {
        const updatedTodo = data.filter((elem) => elem.id !== id)
        setData(updatedTodo)
        console.log('Non deleted data', updatedTodo)
    }

    // To Edit the stored data
    const handleOpen = (editedTodo) => {
        setOpen(true);
        setInputData({
            editId: editedTodo.id,
            editTitle: editedTodo.title,
            editDescription: editedTodo.description,
            editStatus: editedTodo.status
        })

    }

    const handleModalClose = () => {
        setOpen(false)
    }


    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data])

    return (
        <>
        {!showTable ?
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Todo App
                        </Typography>

                        <Button variant='contained' style={{ marginLeft: '350px' }} onClick={handleShowData} >View Data</Button>
                    </Toolbar>
                </AppBar>

                <Paper elevation={10} style={paperStyle}>
                    <form onSubmit={handleOnSubmit}>
                        <TextField placeholder='Title' fullWidth name="fullName" style={textStyle}
                            onChange={(e) => setTitle(e.target.value)} value={title} />

                        <TextField placeholder='Add Description' fullWidth name="fullName" style={textStyle}
                            onChange={(e) => setDescription(e.target.value)} value={description} />

                        <Select
                            value={status}
                            label="status"
                            onChange={handleChange}
                            style={selectStyle}
                        >
                            <MenuItem value='todo'>Todo</MenuItem>
                            <MenuItem value='inprogress'>In Progress</MenuItem>
                            <MenuItem value='completed'>Completed</MenuItem>
                        </Select>
                        <Button variant="contained" type='submit' style={textStyle}
                        >Create Todo</Button>
                    </form>
                </Paper>
            </Box> :
            <Box>
                <Paper elevation={10} style={paperStyles}>
                    <Button variant='contained' style={{ marginLeft: '350px' }} onClick={backToTodo} >Back</Button>
                    <Table style={tableStyle}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableData data={data} deleteData={deleteData} handleOpen={handleOpen} />
                        </TableBody>
                    </Table>
                </Paper>
            </Box>}

            <div>
                <Modal
                    open={open}
                    onClose={() => handleModalClose()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles}>
                        <AppBar>Edit Data</AppBar>

                        <TextField placeholder='Title' fullWidth name="fullName" style={textStyle}
                            onChange={handleEditedTitleChange} defaultValue={inputData.editTitle} />

                        <TextField placeholder='Add Description' fullWidth name="fullName" style={textStyle}
                            onChange={handleEditedDescriptionChange} defaultValue={inputData.editDescription} />

                        <Select
                            defaultValue={inputData.editStatus}
                            label="status"
                            onChange={handleEditedStatusChange}
                            style={selectStyle}
                        >
                            <MenuItem value='todo'>Todo</MenuItem>
                            <MenuItem value='inprogress'>In Progress</MenuItem>
                            <MenuItem value='completed'>Completed</MenuItem>
                        </Select>
                        <Button variant="contained" style={textStyle}
                            onClick={handleEditSubmit}>Save Changes</Button>
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default Todo
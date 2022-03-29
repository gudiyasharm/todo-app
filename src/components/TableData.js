import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableCell, TableRow } from '@material-ui/core';

const TableData = ({ data, handleOpen, deleteData }) => {
    return data.map(tdata => (
        <TableRow key={tdata?.id}>
            <TableCell align="center">{tdata?.title}</TableCell>
            <TableCell align="center">{tdata?.description}</TableCell>
            <TableCell align="center">{tdata?.status}</TableCell>
            <TableCell onClick={() => handleOpen(tdata)}><EditIcon /></TableCell>
            <TableCell onClick={() => deleteData(tdata?.id)}><DeleteIcon /></TableCell>
        </TableRow>
    ))
}

export default TableData
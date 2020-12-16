import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    table: {
        minWidth:700
    },
});

const columns = [
    {id: 'component', label: 'Component', minWidth: 300},
    {id: 'outcomes', label: 'Learning Outcome(s)', minWidth: 300},
    {id: 'weight', label: 'Weight', minWidth: 170, format: (value) => percFormat(value)},
];

function GradeTitle() {
    return (
        <Typography variant="h4" color='textprimary'>
            Final Grades
        </Typography>
    )
}

function percFormat(num) {
    return Intl.NumberFormat(num, {style: 'percent', maximumFractionDigits: 2})
}

//var totalWeight = subtotal(weights);

function GradeTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="grade table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2} align="right">Total</TableCell>
                        <TableCell align="right">{//percFormat(totalWeight)
                        }</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export {GradeTable, GradeTitle}



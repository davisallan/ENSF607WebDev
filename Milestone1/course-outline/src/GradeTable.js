import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'

function createData() {
    return { name, outcomes, weight };
}

const columns = [
    {id: 'component', label: 'Component', minWidth: 300},
    {id: 'outcomes', label: 'Learning Outcome(s)', minWidth: 300},
    {id: 'weight', label: 'Weight', minWidth: 100, format: (value) => percFormat(value)},
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth:700,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0,0,0,0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));



function GradeTitle() {
    return (
        <Typography variant="h4" color='textprimary'>
            Final Grades
        </Typography>
    )
}

function TitleText() {
    return (
        <Typography variant="subtitle1" align="left">
            The final grade in this course will be based on the following components:
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

export default function CombinedGrades() {
    return (
        <Container fixed>
            <GradeTitle></GradeTitle>
            <TitleText></TitleText>
            <GradeTable></GradeTable>
        </Container>
    )
}



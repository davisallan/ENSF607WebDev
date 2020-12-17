import React, {useState} from "react";
import {Table} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import {
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    makeStyles,
    Tooltip,
    TextField
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import GradeWeight from "./GradeWeight"
import {v4 as uuidv4} from "uuid";


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        justify: 'center'
    },
    paper: {
        marginTop: theme.spacing(2),
        width: "100%",
        marginBottom: theme.spacing(1)
    },
    table: {
        minWidth: 650
    }
}));

export default function GradeTable() {

    const [gradeComp, setComponent] = useState([{
            addNewRow
        }]);

    const columns = [
        {
            id: 'gradeComponent',
            label: 'Component',
            minWidth: 300
        }, {
            id: 'outcomes',
            label: 'Learning Outcome(s)',
            minWidth: 300
        }, {
            id: 'weight',
            label: 'Weight',
            minWidth: 20,
            align: 'center'
        },
    ];

    function addNewRow() {
        let newRow = [{
                id: uuidv4(),
                gradeComponent: "",
                outcomes: "",
                weight: "",
                errorText: ''
            }];
        const Rows = gradeComp;
        setComponent([
            ...Rows,
            newRow
        ])

    };

    function subtotal(items) {
        return items.map(({weight}) => Number.parseFloat(weight)).reduce((sum, i) => sum + i, 0);
    }

    const gradeSubtotal = subtotal(gradeComp);

    function inputChangeHandler(e, i) {
        let result = gradeComp.map((gradeComp) => {
            return gradeComp.id === i ? {
                ...gradeComp,
                [e.target.name]: e.target.value
            } : {
                ...gradeComp
            }
        })
        setComponent(result)
    }

    function deleteRowHandler(id) {
        const temp = [...gradeComp];
        const filteredRow = temp.filter(gradeComp => gradeComp.id !== id);
        setComponent([
            ...filteredRow,
        ]);
    };

    const classes = useStyles();

    return (
        <div className={
            classes.root
        }>
            <Paper className={
                classes.paper
            }>
                <Table className={
                        classes.table
                    }
                    size="small">
                    <TableHead>
                        <TableRow> {
                            columns.map((column) => (
                                <TableCell key={
                                        column.id
                                    }
                                    align={
                                        column.align
                                    }
                                    style={
                                        {
                                            minWidth: column.minWidth,
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: 'white',
                                            backgroundColor: "#b71c1c"
                                        }
                                }>
                                    {
                                    column.label
                                } </TableCell>
                            ))
                        }
                            <TableCell align="right">
                                <Tooltip title="Insert Row" aria-label="insert">
                                    <Fab color="primary"
                                        className={
                                            classes.fab
                                        }
                                        onClick={addNewRow}>
                                        <AddIcon/>
                                    </Fab>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody> {
                        gradeComp.map((gradeComp, id) => (
                            <TableRow key={id}>
                                <TableCell>
                                    <TextField id="component-input" name="gradeComponent"
                                        value={
                                            gradeComp.gradeComponent
                                        }
                                        placeholder="Component Description"
                                        style={
                                            {width: "30rem"}
                                        }
                                        onChange={
                                            (e) => inputChangeHandler(e, gradeComp.id)
                                        }/>
                                </TableCell>
                                <TableCell>
                                    <TextField id='outcome-input' name="outcomes" placeholder="Applicable Learning Outcomes"
                                        value={
                                            gradeComp.outcomes
                                        }
                                        style={
                                            {width: "29rem"}
                                        }
                                        onChange={
                                            (e) => inputChangeHandler(e, gradeComp.id)
                                        }/>
                                </TableCell>
                                <TableCell>
                                    <GradeWeight/>
                                </TableCell>
                                <TableCell> {
                                    < DeleteIcon
                                    onClick = {
                                        () => deleteRowHandler(gradeComp.id)
                                    }
                                    style = {
                                        {
                                            cursor: "pointer"
                                        }
                                    } />
                                } </TableCell>
                            </TableRow>
                        ))
                    }
                        <TableRow>
                            <TableCell colSpan={2}
                                align="right"
                                style={
                                    {
                                        fontSize: 16,
                                        fontWeight: 600,
                                        color: 'white',
                                        backgroundColor: "#b71c1c"
                                    }
                            }>
                                Total</TableCell>
                            <TableCell align="center"
                                style={
                                    {
                                        fontSize: 16,
                                        fontWeight: 600,
                                        color: 'white',
                                        backgroundColor: "#b71c1c"
                                    }
                            }>
                                {gradeSubtotal}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

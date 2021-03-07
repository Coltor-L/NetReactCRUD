import React, {useEffect, useState} from "react";
import {connect} from "react-redux"
import * as actions from "../actions/donationCandidate"
import DonationCandidateForm from "./DonationCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {useToasts} from "react-toast-notifications";
import {
    Grid,
    Paper,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    TableCell,
    TableBody,
    withStyles,
    ButtonGroup, Button
} from "@material-ui/core";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize:"1.25rem"
        }
    },
    paper : {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }

})

const DonationCandidates = ({classes, ...props}) => {
    const {addToast} = useToasts();
    const [currentId, setCurrentId] = useState(0)


    useEffect(() => {
        props.fetchAllDonationCandidates()
    }, [])

    const onDelete = record => {

        if(!window.confirm(`Are you sure you want to delete ${record.fullName} from the database?`)){
            return;
        }

        props.deleteDonationCandidate(record.id, () => {
            addToast(`Deleted ${record.fullName} from the database.`, {appearance:'info'})
        })

    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DonationCandidateForm {...({currentId, setCurrentId})}/>

                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.donationCandidateList.map((record, index) => {
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell>{record.fullName}</TableCell>
                                                <TableCell>{record.mobile}</TableCell>
                                                <TableCell>{record.bloodGroup}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="text">
                                                        <Button><EditIcon color="primary"
                                                            onClick={() => {
                                                                setCurrentId(record.id)
                                                            }}
                                                        /></Button>
                                                        <Button><DeleteIcon color="secondary"
                                                                            onClick={()=> onDelete(record)}
                                                        /></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        donationCandidateList: state.donationCandidate.list
    }
}

const mapActionToProps = {
    fetchAllDonationCandidates: actions.fetchAll,
    deleteDonationCandidate: actions.deleteCandidate
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DonationCandidates));

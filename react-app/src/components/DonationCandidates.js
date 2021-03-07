import React, {useEffect} from "react";
import {connect} from "react-redux"
import * as actions from "../actions/donationCandidate"
import DonationCandidateForm from "./DonationCandidateForm";
import {Grid, Paper, TableContainer, TableHead, TableRow, Table, TableCell, TableBody, withStyles} from "@material-ui/core";

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
    useEffect(() => {
        props.fetchAllDonationCandidates()
    }, [])

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DonationCandidateForm/>

                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
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
    fetchAllDonationCandidates: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DonationCandidates));

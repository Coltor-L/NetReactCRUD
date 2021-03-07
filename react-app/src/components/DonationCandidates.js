import React, {useEffect, useState} from "react";
import {connect} from "react-redux"
import * as actions from "../actions/donationCandidate"
import DonationCandidateForm from "./DonationCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
    const [currentId, setCurrentId] = useState(0)


    useEffect(() => {
        props.fetchAllDonationCandidates()
    }, [])

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
                                                        <Button><DeleteIcon color="secondary"/></Button>
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
    fetchAllDonationCandidates: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DonationCandidates));

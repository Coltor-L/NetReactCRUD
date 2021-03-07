import React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField, withStyles} from "@material-ui/core";
import useForm from "./useForm";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "90%"
        }
    },
    formControl: {
        margin: theme.spacing(1),
        width: "90%"
    }
})

const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
}


const DonationCandidateForm = ({classes, ...props}) => {
    const {
        values,
        handleInputChange
    } = useForm(initialFieldValues)

    return (
        <form autoComplete={"off"} noValidate className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A +ve</MenuItem>
                            <MenuItem value="A-">A -ve</MenuItem>
                            <MenuItem value="B+">B +ve</MenuItem>
                            <MenuItem value="B-">B -ve</MenuItem>
                            <MenuItem value="AB+">AB +ve</MenuItem>
                            <MenuItem value="AB-">AB -ve</MenuItem>
                            <MenuItem value="O+">O +ve</MenuItem>
                            <MenuItem value="O-">O -ve</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>

        </form>

    );
}

export default withStyles(styles)(DonationCandidateForm);
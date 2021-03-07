import React from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, withStyles} from "@material-ui/core";
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
    },
    smallMargin: {
        margin: theme.spacing(1),
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
        errors,
        setErrors,
        handleInputChange,
    } = useForm(initialFieldValues)

    const validate = () => {
        let temp = {}
        temp.fullName = values.fullName ? "" : "This field is required."
        temp.mobile = values.mobile ? "" : "This field is required."
        temp.bloodGroup = values.bloodGroup ? "" : "This field is required."
        temp.email = (/^$|.*@.+..+/).test(values.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    // material ui select
    const inputLabel = React.useRef(null)
    const [labelWidth, setLabelWidth] = React.useState(0)
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if (validate()){
            window.alert("validation succeeded.")
        }
    }

    return (
        <form autoComplete={"off"} noValidate className={classes.root} onSubmit={handleSubmit}>
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
                        <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
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
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smallMargin}
                        >
                            Submit
                        </Button>

                        <Button
                            variant="contained"
                            className={classes.smallMargin}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>

        </form>

    );
}

export default withStyles(styles)(DonationCandidateForm);
import React from "react";
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    withStyles
} from "@material-ui/core";
import useForm from "./useForm";
import {connect} from "react-redux"
import * as actions from "../actions/donationCandidate";
import {create} from "../actions/donationCandidate";
import {donationCandidate} from "../reducers/donationCandidate";
import {useToasts} from "react-toast-notifications";

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
    const {addToast} = useToasts();

    const validate = (fieldValues = values) => {
        let temp = {...errors}

        if ('fullName' in fieldValues){
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        }

        if ('mobile' in fieldValues) {
            temp.mobile = fieldValues.mobile ? "" : "This field is required."
        }

        if ('bloodGroup' in fieldValues) {
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required."
        }

        if ('email' in fieldValues){
            temp.email = (/^$|.*@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        }

        if ('age' in fieldValues){
            temp.age = Number(fieldValues.age) > 0 ? "" : "Age is not valid."
        }

        if ('address' in fieldValues){
            temp.address = fieldValues.address ? "" : "This field is required."
        }

        setErrors({
            ...temp
        })

        if (fieldValues === values){
            return Object.values(temp).every(x => x === "");
        }

    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    // material ui select
    const inputLabel = React.useRef(null)
    const [labelWidth, setLabelWidth] = React.useState(0)
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if (validate()) {

            if (props.currentId === 0){
                props.createDonationCandidate(values, () => {
                    resetForm()
                    addToast("Successfully inserted record.", {appearance : 'success'})
                })
            } else {
                props.updateDonationCandidate(props.currentId, values, ()=>{
                    resetForm()
                    addToast("Successfully updated record.", {appearance : 'success'})
                })
            }

        }
    }

    React.useEffect(() => {
        if(props.currendId === 0){
            return;
        }

        setValues({
            ...props.donationCandidateList.find(x => x.id === props.currentId)
        })

    }, [props.currentId])

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
                        {...(errors.fullName && {error: true, helperText: errors.fullName})}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && {error: true, helperText: errors.email})}
                    />
                    <FormControl variant="outlined" className={classes.formControl}
                                 {...(errors.bloodGroup && {error: true, helperText: errors.bloodGroup})}
                    >
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
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && {error: true, helperText: errors.mobile})}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                        {...(errors.age && {error: true, helperText: errors.age})}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        {...(errors.address && {error: true, helperText: errors.address})}
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
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>

        </form>

    );
}


const mapStateToProps = state => {
    return {
        donationCandidateList: state.donationCandidate.list
    }
}

const mapActionToProps = {
    createDonationCandidate: actions.create,
    updateDonationCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DonationCandidateForm));
import React, {useState} from "react";

const useForm = (initialFieldValues, validator) => {
    const [values, setValues] = React.useState(initialFieldValues)
    const [errors, setErrors] = React.useState({})

    const handleInputChange = e => {
        const {name, value} = e.target
        const fieldValue = {[name]: value}

        setValues({
            ...values,
            ...fieldValue
        })

        validator(fieldValue)
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }

}

export default useForm;
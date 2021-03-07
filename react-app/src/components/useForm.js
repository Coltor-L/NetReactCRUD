import React, {useState} from "react";

const useForm = (initialFieldValues, validator, setCurrentId) => {
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

    const resetForm = () => {
        setValues({...initialFieldValues})
        setErrors({})
        setCurrentId(0)
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }

}

export default useForm;
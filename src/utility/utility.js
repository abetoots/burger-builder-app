export const updateObject = (oldState, newProperties) => {
    return {
        ...oldState,
        ...newProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    // console.log(isValid);
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}
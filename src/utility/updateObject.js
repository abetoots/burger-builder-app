export const updateObject = (oldState, newProperties) => {
    return {
        ...oldState,
        ...newProperties
    }
}
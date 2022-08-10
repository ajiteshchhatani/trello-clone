export const initialState = {
    workspace: [],
    bucket: [],
    tasks: [],
    user: []
}

export const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_USERS': {
            //console.log(action.payload)
            return {
                ...state,
                user: action.payload
            }
        }
        case 'ADD_WORKSPACE': {
            return {
                ...state,
                workspace: [
                    ...state.workspace,
                    action.payload
                ]
            }
        }
        case 'ADD_BUCKET': {
            return {
                ...state,
                bucket: [
                    ...state.bucket,
                    action.payload
                ]
            }
        }
        case 'ADD_TASK': {
            console.log("add task payload", action.payload)
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.payload
                ]
            }
        }
        default:
            return state
    }
}
export const initialState = {
    workspace: [],
    sampleArr: [],
    bucket: []
}

export const reducer = (state, action) => {
    //console.log("reducer")
    switch(action.type) {
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
            console.log("payload", action.payload)
            console.log("state", state);
            console.log("state.bucket", state.bucket)
            return {
                ...state,
                bucket: [
                    ...state.bucket,
                    action.payload
                ]
            }
        }
        default:
            return state
    }
}
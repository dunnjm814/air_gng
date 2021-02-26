const initialState = {};
const LOAD_BIZ = "aircraft/loadBiz";

export const loadBiz = (biz) => {
    return {
        type: LOAD_BIZ,
        payload: biz,
    }
}

export const getAllBiz = () => async (dispatch) => {
    const response = await fetch("/api/services", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const biz = await response.json()
    dispatch(loadBiz(biz))
    return biz

}

const bizReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_BIZ:
            return action.payload;
        default:
            return state
    }
}

export default bizReducer;

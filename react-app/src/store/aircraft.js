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
    console.log("bizzzzzz", biz);
    dispatch(loadBiz(biz))
    return biz
    
}

const bizReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_BIZ:
            // newState = action.payload.map(biz => {
            //     newState[biz.id] = biz
            // })
            return action.payload;
        default:
            return state
    }
}

export default bizReducer;
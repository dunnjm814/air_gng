const initialState = {};
const LOAD_BIZ = "aircraft/loadBiz";
const LOAD_ONE_BIZ = "aircrafts/loadOneBiz"
export const loadBiz = (biz) => {
    return {
        type: LOAD_BIZ,
        payload: biz,
    }
}

export const loadOneBiz = (biz) => {
    return {
        type: LOAD_ONE_BIZ,
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

export const getOneBiz = (craft_id) => async (dispatch) => {
    console.log('hit our thunk')
    const response = await fetch(`/api/services/${craft_id}`, {
        headers: {
            "Content-Type": "application/json",
          },
    });
    const one_biz = await response.json()
    dispatch(loadOneBiz(one_biz))
    return one_biz
}

const bizReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_BIZ:
            // newState = action.payload.map(biz => {
            //     newState[biz.id] = biz
            // })
            return action.payload;
        case LOAD_ONE_BIZ:
            newState.current = action.payload
            return newState
        default:
            return state
    }
}

export default bizReducer;

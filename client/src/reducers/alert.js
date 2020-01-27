cons

const inititalState = [];

export default function(state = inititalState, action){
    const { type, payoad } = action
    switch(type) {
        case SET_ALERT:
                return [...state, action];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}

import moment from 'moment'
const initialValue={
    travelDate: moment(),
    startCity: 'Welayita Sodo',
    destinationCity: 'NYC'
}

export const travelInfo=(state=initialValue, action)=>{
    switch(action.type){
        case 'SET_TRAVEL_DATE':
            return {...state, travelDate: action.payload}
        case 'SET_START_CITY':
            return {...state, startCity : action.payload}
        case 'SET_DESTINATION_CITY':
            return {...state, destinationCity: action.payload}
        default: 
            return state
    }
}


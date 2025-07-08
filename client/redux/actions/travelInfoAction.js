export const setTravelDate=(payload)=>{
    return{
        type: 'SET_TRAVEL_DATE',
        payload: payload
    }
}
export const setStartCity=(payload)=>{  
    return{
        type: 'SET_START_CITY',
        payload: payload
    }
}
export const setDestinationCity=(payload)=>{    
    return{
        type: 'SET_DESTINATION_CITY',
        payload: payload
    }
}   
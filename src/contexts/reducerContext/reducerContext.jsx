import { createContext, useReducer } from "react";

import { types } from "./types";
import { reducer } from "./reducer";

export const ReducerContext = createContext();

export const ReducerContextHandler = ({children}) => {
    const initialState = {
        isLoggedIn : false
    } 

    const {
        TEST_LOGIN
    } = types

    const [state, dispatch] = useReducer(reducer, initialState);

    const testLogin = () => {
        dispatch({
            type: TEST_LOGIN
        })
    }


    return (
        <ReducerContext.Provider value={{
            testLogin,
            isLoggedIn: state?.isLoggedIn
        }}>
            {children}
        </ReducerContext.Provider>
    )
}

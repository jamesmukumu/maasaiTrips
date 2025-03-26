import { createReducer,on } from "@ngrx/store";
import { saveSuperUser } from "../actions/userStatus.action";
var initialState:boolean = false

export var userStatusReducer = createReducer(initialState,on(saveSuperUser,(state,action)=>{
return action.status
}))

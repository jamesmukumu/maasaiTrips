import { createReducer,on } from "@ngrx/store";
import { addEnquiry } from "../actions/enquiry.action";

var initialState = ''
export var enquiry = createReducer(initialState,on(addEnquiry,(state,action)=>{
return action.enquiryTitle
}))


















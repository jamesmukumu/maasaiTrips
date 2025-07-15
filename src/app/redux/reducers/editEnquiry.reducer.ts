import { createReducer,on } from "@ngrx/store";
import { editEnquiryAction } from "../actions/editIInquiry.action";

export var enquiryReducer = createReducer("",
on(editEnquiryAction,(state,action)=>{
return action.editValue

}
)

)

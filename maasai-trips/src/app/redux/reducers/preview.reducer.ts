import { createReducer,on } from "@ngrx/store";
import { settoPreviews } from "../actions/preview.action";

var initialPreviewState:any
export var previewReducer = createReducer("",
on(settoPreviews,(state,action)=>{
return action.previewData
})
)





import {createAction,props} from "@ngrx/store"
export var editEnquiryAction = createAction("editEnquiry",props<{"editValue":string}>())

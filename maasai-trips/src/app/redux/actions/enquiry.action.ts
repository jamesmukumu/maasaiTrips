import { createAction,props } from "@ngrx/store";
export var addEnquiry = createAction("addEnquiry",props<{"enquiryTitle":string}>())




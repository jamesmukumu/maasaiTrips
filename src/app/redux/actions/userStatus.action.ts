import { createAction,props } from "@ngrx/store";

export var saveSuperUser = createAction("saveSuperUser",props<{"status":boolean}>())


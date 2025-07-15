import {createReducer,on} from "@ngrx/store"
import {SaveToUpdateBulk} from '../actions/editBulk.action'

export var bulkReducer = createReducer("",on(
SaveToUpdateBulk,(state,action)=>{
return action.bulkMail
}
))



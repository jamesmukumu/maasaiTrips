import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {

  constructor() { }


  async fetchHotel(hotelId:string){
try{
  var resp = await axios.get("http://localhost:4500/filter/hotel",{
  params:{
    "hotelID":hotelId
  }
  })
  return resp.data
}catch(err){
console.log(err)
}

  }
}

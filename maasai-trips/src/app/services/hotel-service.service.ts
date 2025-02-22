import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {

  constructor() { }


  async fetchHotel(hotelId:string){
try{
  var resp = await axios.get("https://maasaitrips-1.onrender.com/filter/hotel",{
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

import { Injectable } from '@angular/core';
import axios from "axios"
@Injectable({
  providedIn: 'root'
})
export class GalleryService {
baseUrl = 'https://maasai-trips.laravel.cloud/api'
  constructor() { }



async fetchGalleria(){
try{
let response = await axios.get(`${this.baseUrl}/fetch/gallery/content`)
return response.data
}catch(err){
return err
}
}


}

import { Component } from '@angular/core';


interface Overview {
ImagePath:string
Title:string
Description:string
}
interface Destination {
ImagePath:string
Destination_Title:string
Destination_Description:string,
Amenities:string
}



@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
  
})
export class OverviewComponent  {
destinations:Destination[] = [
{
Amenities:"Luxirious Cottages and Villa`s,Private decks with stunning views,Spa and wellness treatments,Swimming pool,open air dining,Guided nature walks and game drives",
Destination_Title:'Saruni Mara',
Destination_Description:"Saruni Mara is a botique lodge offering an exclusive and luxirious safari Experience.Situated in a remote valley in theMara North Conservancy.It provides tranquils retreat with a strong focus on conservation and community ",
ImagePath:"https://www.masaimaratrips.com/assets/images/system/Saruni-Mara.jpg?v1.1.1"
},
{
  Amenities:"Ensuite Tents with private verandas,Swimming pool,open air dining,Guided nature walks and game drives",
  Destination_Title:'Kichwa Tembo Tented Camp',
  Destination_Description:"Nestled in a forest along the Saripango River,Kichwa Tembo Tented Camp offers a blend of classic safari Elegance and Modern Comfort,The camp provides and intimate and immersive wildlife experience in the heart of the Masaai Mara",
  ImagePath:"https://www.masaimaratrips.com/assets/images/system/kichwa-tembo-tented-camp-masai-mara.jpg?v1.1.1"
  },
  {
    Amenities:"Private Decks,Infinity Pool,Wellness Center and spa",
    Destination_Title:'Angama Mara',
    Destination_Description:"Nestled in a forest along the Saripango River,Kichwa Tembo Tented Camp offers a blend of classic safari Elegance and Modern Comfort,The camp provides and intimate and immersive wildlife experience in the heart of the Masaai Mara",
    ImagePath:"https://www.masaimaratrips.com/assets/images/system/angama-mara.png?v41.1.1"
    },
   

]





ReviewOverviews:Overview[] = [
  {
    ImagePath:"../../../assets/migration.jpg",
    Title:"The Great Migration",
    Description:"Witness the awe-inspiring Great Migration, where over 1.5 million wildebeest, zebras, and gazelles traverse the Mara River in a spectacular display of nature's raw power and determination. This natural wonder is a must-see and occurs between July and October."
  },
  {
    ImagePath:"../../../assets/bigfive.jpg",
    Title:"The Big Five",
    Description:"Get up close and personal with Africa's most iconic animals – lions, elephants, buffalo, leopards, and rhinos. Our expert guides ensure you have the best chance of spotting these magnificent wildlife in their natural habitat."
  },
  {
    ImagePath:"../../../assets/balooon.webp",
    Title:"Hot Air Balloon Safaris",
    Description:"This is one of the best experience at the Masai Mara. With the hot air ballon, you float above the savannah, watching the sunrise over the horizon and wildlife grazing below, followed by a champagne breakfast in the bush."
  },
  {
    ImagePath:"../../../assets/encounters.jpg",
    Title:"Cultural Encounters",
    Description:"Connect with the rich culture of the Maasai people. You visit local villages, learn about their traditions, and witness traditional dances and ceremonies, gaining insight into their way of life."
  },



]




}

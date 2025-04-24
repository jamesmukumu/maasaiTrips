import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';



class HomeWidget extends StatelessWidget {
   HomeWidget({super.key});
 final List<Widget> packagesOffer = [
   Card(
     elevation: 3.0,
     shape: RoundedRectangleBorder(
         borderRadius: BorderRadius.circular(8.5)
     ),

     child: Container(
       decoration: BoxDecoration(
           image: DecorationImage(fit: BoxFit.cover,image: NetworkImage('https://www.maasaimaratrips.online/assets/front_offers/maasai-village-culture.jpg'))
       ),
       child: Padding(padding: EdgeInsets.all(8.5),child: Align(
         alignment: Alignment.center,

         child: Column(
           children: [
             Text("Beautiful Maasai`s",style: TextStyle(
               color: Colors.white,
               fontSize: 20,
               shadows: [
                 Shadow(
                   blurRadius: 4,
                   color: Colors.black45,
                   offset: Offset(2, 2),
                 ),
               ],
             ),),
             Padding(
               padding: const EdgeInsets.all(8.0),
               child: FilledButton(
                 style: ButtonStyle(
                     backgroundColor: MaterialStateProperty.all(Color(0xFFE88B22))
                 ),
                 onPressed: (){},
                 child: Text('Book Now',style: TextStyle(
                     color: Colors.white
                 ),),
               ),
             ),
           ],
         ),
       ),),
     ),
   ),

   Card(
     elevation: 3.0,
     shape: RoundedRectangleBorder(
         borderRadius: BorderRadius.circular(8.5)
     ),

     child: Container(
       decoration: BoxDecoration(
           image: DecorationImage(fit: BoxFit.cover,image: NetworkImage('https://www.maasaimaratrips.online/assets/front_offers/masai-mara-governors-camp-game-drives.jpg'))
       ),
       child: Padding(padding: EdgeInsets.all(8.5),child: Align(
         alignment: Alignment.center,

         child: Column(
           children: [
             Text("Olikinyei 4 day package",style: TextStyle(
               color: Colors.white,
               fontSize: 20,
               shadows: [
                 Shadow(
                   blurRadius: 4,
                   color: Colors.black45,
                   offset: Offset(2, 2),
                 ),
               ],
             ),),
             Padding(
               padding: const EdgeInsets.all(8.0),
               child: FilledButton(
                 style: ButtonStyle(
                     backgroundColor: MaterialStateProperty.all(Color(0xFFE88B22))
                 ),
                 onPressed: (){},
                 child: Text('Book Now',style: TextStyle(
                     color: Colors.white
                 ),),
               ),
             ),
           ],
         ),
       ),),
     ),
   ),

   Card(
     elevation: 3.0,
     shape: RoundedRectangleBorder(
         borderRadius: BorderRadius.circular(8.5)
     ),

     child: Container(
       decoration: BoxDecoration(
           image: DecorationImage(fit: BoxFit.cover,image: NetworkImage('https://www.maasaimaratrips.online/assets/front_offers/sundowner-little-governors-camp.jpg'))
       ),
       child: Padding(padding: EdgeInsets.all(8.5),child: Align(
         alignment: Alignment.center,

         child: Column(
           children: [
             Text("Easter Holiday Packages",style: TextStyle(
               color: Colors.white,
               fontSize: 20,
               shadows: [
                 Shadow(
                   blurRadius: 4,
                   color: Colors.black45,
                   offset: Offset(2, 2),
                 ),
               ],
             ),),
             Padding(
               padding: const EdgeInsets.all(8.0),
               child: FilledButton(
                 style: ButtonStyle(
                     backgroundColor: MaterialStateProperty.all(Color(0xFFE88B22))
                 ),
                 onPressed: (){},
                 child: Text('Book Now',style: TextStyle(
                     color: Colors.white
                 ),),
               ),
             ),
           ],
         ),
       ),),
     ),
   ),

   Card(
     elevation: 3.0,
     shape: RoundedRectangleBorder(
         borderRadius: BorderRadius.circular(8.5)
     ),

     child: Container(
       decoration: BoxDecoration(
           image: DecorationImage(fit: BoxFit.cover,image: NetworkImage('https://www.maasaimaratrips.online/assets/front_offers/male-lion-entim-main-camp.jpeg'))
       ),
       child: Padding(padding: EdgeInsets.all(8.5),child: Align(
         alignment: Alignment.center,

         child: Column(
           children: [
             Text("Karen Blixen",style: TextStyle(
               color: Colors.white,
               fontSize: 20,
               shadows: [
                 Shadow(
                   blurRadius: 4,
                   color: Colors.black45,
                   offset: Offset(2, 2),
                 ),
               ],
             ),),
             Padding(
               padding: const EdgeInsets.all(8.0),
               child: FilledButton(
                 style: ButtonStyle(
                     backgroundColor: MaterialStateProperty.all(Color(0xFFE88B22))
                 ),
                 onPressed: (){},
                 child: Text('Book Now',style: TextStyle(
                     color: Colors.white
                 ),),
               ),
             ),
           ],
         ),
       ),),
     ),
   ),

   Card(
     elevation: 3.0,
     shape: RoundedRectangleBorder(
         borderRadius: BorderRadius.circular(8.5)
     ),

     child: Container(
       decoration: BoxDecoration(
           image: DecorationImage(fit: BoxFit.cover,image: NetworkImage('https://www.maasaimaratrips.online/assets/front_offers/flying-safari-masaimara.jpg'))
       ),
       child: Padding(padding: EdgeInsets.all(8.5),child: Align(
         alignment: Alignment.center,

         child: Column(
           children: [
             Text("Enjoy a fly in 4 night 3 day package",style: TextStyle(
               color: Colors.white,
               fontSize: 20,
               shadows: [
                 Shadow(
                   blurRadius: 4,
                   color: Colors.black45,
                   offset: Offset(2, 2),
                 ),
               ],
             ),),
             Padding(
               padding: const EdgeInsets.all(8.0),
               child: FilledButton(
                 style: ButtonStyle(
                     backgroundColor: MaterialStateProperty.all(Color(0xFFE88B22))
                 ),
                 onPressed: (){},
                 child: Text('Book Now',style: TextStyle(
                     color: Colors.white
                 ),),
               ),
             ),
           ],
         ),
       ),),
     ),
   ),
 ];



  @override
  Widget build(BuildContext context) {
    return Container(
      child: CarouselSlider(items: packagesOffer, options: CarouselOptions(
        viewportFraction: 1,
        autoPlay: true
      )),
    );
  }
}

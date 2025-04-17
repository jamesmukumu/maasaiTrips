import 'package:flutter/cupertino.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class OverViewsMara extends StatelessWidget {
  final bool expandOverview = false;
  OverViewsMara({super.key});




  @override
  Widget build(BuildContext context) {

    final List<Widget> overViews = [
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: Card(
          elevation: 3.0,
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(5))
          ),

          child: Column(
            children: [
              Container(
                height: 200,

                child: Image(
                  image: NetworkImage('https://www.maasaimaratrips.online/assets/migration.jpg'),
                  fit: BoxFit.cover,
                  width: double.infinity,
                ),
              ),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: ListTile(
                    title: Text('The Great Migration'),
                    subtitle: Column(
                      children: [

                        Text("Witness the awe-inspiring Great Migration, where over 1.5 million wildebeest, zebras, and gazelles traverse the Mara River in a spectacular display of nature's raw power and determination. This natural wonder is a must-see and occurs between July and October."),

                      ],
                    ),
                  ),
                ),
              ),




            ],
          ),
        ),
      ),

      Padding(
        padding: const EdgeInsets.all(8.0),
        child: Card(
          elevation: 3.0,
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(5))
          ),

          child: Column(
            children: [
              Container(
                height: 200,

                child: Image(
                  image: NetworkImage('https://www.maasaimaratrips.online/assets/bigfive.jpg'),
                  fit: BoxFit.cover,
                  width: double.infinity,
                ),
              ),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: ListTile(
                    title: Text('The Big Five'),
                    subtitle: Column(
                      children: [

                        Text("Get up close and personal with Africa's most iconic animals – lions, elephants, buffalo, leopards, and rhinos. Our expert guides ensure you have the best chance of spotting these magnificent wildlife in their natural habitat."),

                      ],
                    ),
                  ),
                ),
              ),




            ],
          ),
        ),
      ),
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: Card(
          elevation: 3.0,
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(5))
          ),

          child: Column(
            children: [
              Container(
                height: 200,

                child: Image(
                  image: NetworkImage('https://www.maasaimaratrips.online/assets/balooon.webp'),
                  fit: BoxFit.cover,
                  width: double.infinity,
                ),
              ),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: ListTile(
                    title: Text('Hot Air Balooon Safaris'),
                    subtitle: Column(
                      children: [

                        Text("This is one of the best experience at the Masai Mara. With the hot air ballon, you float above the savannah, watching the sunrise over the horizon and wildlife grazing below, followed by a champagne breakfast in the bush."),

                      ],
                    ),
                  ),
                ),
              ),




            ],
          ),
        ),
      )
    ];

    return Container(
      child: Column(
        children: [
         ListTile(
           leading: Icon(Icons.location_on,color: Color(0xFFE88B22),),
           title: Text('OverViews of the Maasai Mara'),
         ),
          CarouselSlider(
            items: overViews,
            options: CarouselOptions(
              height: 400,
              autoPlay: true

            ),
          )
        ],
      ),
    );
  }
}
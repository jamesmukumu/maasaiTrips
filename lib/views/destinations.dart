import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:masaitrips/services/destinations/destinations_service.dart';
import 'dart:convert';
class Destinations extends StatefulWidget {
  const Destinations({super.key});

  @override
  State<Destinations> createState() => _DestinationsState();
}




class _DestinationsState extends State<Destinations> {
  final dest = new Destinations_Service();
  Future<void> ?fetchingDestinations;
 late List<dynamic> destinations;
  @override
  void didChangeDependencies() {
fetchingDestinations = dest.fetchDestinations().then((dataBody){
var actualData = json.decode(dataBody.body);
setState(() {
  destinations = actualData['destinations'];
});
}).catchError((err){
  print(err);
});
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: FutureBuilder(future: fetchingDestinations, builder: (ctx,snap){
        if(snap.connectionState == ConnectionState.done){
          return  Padding(
            padding: const EdgeInsets.all(8.0),
            child: GridView.builder(gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2),itemCount: destinations.length, itemBuilder: (ctx,count){
              return  InkWell(

                onTap: (){
                  Navigator.pushNamed(context, '/singular/destination',arguments: {
                    'destinationSlug':destinations[count]['destinationSlug']
                  });
                },
                child: Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Stack(
                    fit: StackFit.expand,
                    children: [
                     Image(image: NetworkImage(destinations[count]['destinationThumbnail']),fit: BoxFit.cover,),
                      Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          gradient: LinearGradient(
                            begin: Alignment.bottomCenter,
                            end: Alignment.topCenter,
                            colors: [
                              Colors.black.withOpacity(0.7),
                              Colors.transparent,
                            ],
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 16,
                        left: 16,
                        child: Text(
                          destinations[count]['destinationTitle'],
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              );;

            }),
          );
        }else{
          return Center(child: CircularProgressIndicator(color: Color(0xFFE88B22),));
        }

      }),
    );
  }
}

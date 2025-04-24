import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:masaitrips/services/package/package_service.dart';
import 'dart:convert';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:masaitrips/services/destinations/destinations_service.dart';
import 'dart:convert';

class Singular_Destination extends StatefulWidget {
  const Singular_Destination({super.key});

  @override
  State<Singular_Destination> createState() => _Singular_DestinationState();
}

class _Singular_DestinationState extends State<Singular_Destination> {
  var dest = new Destinations_Service();
  Future<void> ?fetchingDestination;
   dynamic destinationData;



  @override
  void didChangeDependencies() {
   var destMap = ModalRoute.of(context)!.settings.arguments as Map;
   String destinationSlug = destMap['destinationSlug'];


    fetchingDestination = dest.fetchParticularDestination(destinationSlug).then((data){
    setState(() {
      var dataBody = json.decode(data);
      destinationData = dataBody['data'];
      print(destinationData);
    });
   }).catchError((err){
  print(err);
   });
    super.didChangeDependencies();
  }
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(future: fetchingDestination, builder: (_,snap){
      if(snap.connectionState == ConnectionState.done){
return Pck(packageData: destinationData);
      }else{
        return Center(child: CircularProgressIndicator(color: Color(0xFFE88B22),));
      }


    });
  }
}





















class Pck extends StatefulWidget {
  const Pck({super.key, required this.packageData});
  final packageData;

  @override
  State<Pck> createState() => _PckState();
}

class _PckState extends State<Pck> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Container(
            margin: EdgeInsets.all(5.5),
            width: double.infinity,
            height: 250,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.vertical(bottom: Radius.circular(10)),
            ),
            child: Image.network(
              widget.packageData['destinationThumbnail'],
              fit: BoxFit.cover,
            ),
          ),
          Text('${widget.packageData['destinationTitle']}',style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 17.5
          ),),
          SizedBox(height: 16),
          CarouselSlider(
            items: (json.decode(widget.packageData['destinationPhotos']) as List<dynamic>)
                .map((imageUrl) => Container(
              margin: EdgeInsets.all(5.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8.0),
                child: Image.network(
                  imageUrl.toString(),
                  fit: BoxFit.cover,
                  width: double.infinity,
                ),
              ),
            ))
                .toList(),
            options: CarouselOptions(
              height: 200,
              autoPlay: true,
              enlargeCenterPage: true,
              aspectRatio: 16 / 9,
            ),
          ),
          Text("Destination Overview:",style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 17.5
          ),),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Html(
              data: widget.packageData['destinationDescription'],
              style: {
                "*": Style(
                  backgroundColor: Colors.transparent,
                ),
                "p": Style(
                  lineHeight: LineHeight(1.5),
                  margin: Margins(),
                ),
                "body": Style(
                  margin: Margins(),
                  padding: HtmlPaddings(),
                ),
              },
            ),
          ),

        ],
      ),
    );
  }
}
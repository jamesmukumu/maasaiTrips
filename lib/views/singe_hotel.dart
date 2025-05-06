import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:masaitrips/services/hotels/hotels_service.dart';
import 'package:masaitrips/services/package/package_service.dart';
import 'dart:convert';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:masaitrips/services/destinations/destinations_service.dart';
import 'dart:convert';
import 'dart:math';


class Hotel extends StatefulWidget {
  const Hotel({super.key});

  @override
  State<Hotel> createState() => _HotelState();
}

class _HotelState extends State<Hotel> {
  var dest = new hotels();
  Future<void> ?fetchingDestination;
  dynamic destinationData;



  @override
  void didChangeDependencies() {
    var destMap = ModalRoute.of(context)!.settings.arguments as Map;
    String destinationSlug = destMap['hotelSlug'];
    print(destinationSlug);

    fetchingDestination = dest.fetchSingularHotel(destinationSlug).then((data){
      setState(() {
        var dataBody = json.decode(data.body);
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
  final Map<String, dynamic> packageData;



  @override
  State<Pck> createState() => _PckState();
}

class _PckState extends State<Pck> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late final double randomNumber;
  final Random random = Random();
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    randomNumber = (random.nextInt(51) / 10).toDouble();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Colors.black,
        title: Text("${widget.packageData['hotelName']}",style: TextStyle(
            color: Colors.white
        ),),
        leading: Padding(padding: EdgeInsets.all(8.5),child: Image(image: AssetImage('lib/assets/maasai-trips-logo.png')),),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Stack(
              children: [
                Image.network(
                  widget.packageData['hotelThumbnail'],
                  fit: BoxFit.cover,
                  height: 220,
                  width: double.infinity,
                ),

              ],
            ),


            Padding(
              padding: const EdgeInsets.all(16),
              child: Text(
                widget.packageData['hotelName'],
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),


            CarouselSlider(
              items: (json.decode(widget.packageData['imagesHotel']) as List<dynamic>)
                  .map((imageUrl) => Container(
                margin: const EdgeInsets.all(6),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(12),
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
                viewportFraction: 0.8,
              ),
            ),


            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: TabBar(
                controller: _tabController,
                labelColor: Color(0xFFE88B22),
                unselectedLabelColor: Color(0xFFE88B22),
                indicatorColor: Color(0xFFE88B22),
                tabs: const [
                  Tab(text: "About Hotel",),
                  Tab(text: 'Location'),
                  Tab(text: 'Description'),
                  Tab(text: 'Cancellation Policy',)
                ],
              ),
            ),


            SizedBox(
              height: 300,
              child: TabBarView(
                controller: _tabController,
                children: [
                  // About Tab
                  SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Html(
                      data: widget.packageData['hotelMetaDescription'],
                      style: {
                        "*": Style(
                          backgroundColor: Colors.transparent,
                          fontSize: FontSize(16),
                          lineHeight: LineHeight(1.6),
                        ),

                      },
                    ),
                  ),

                  SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Html(
                      data: widget.packageData['locationDescription'],
                      style: {
                        "*": Style(
                            fontSize: FontSize(16),
                            lineHeight: LineHeight(1.6),
                            backgroundColor: Colors.transparent
                        ),
                        "h2": Style(
                          fontSize: FontSize(20),
                          fontWeight: FontWeight.bold,
                          margin: Margins.only(top: 16, bottom: 8),
                        ),
                        "h3": Style(
                          fontSize: FontSize(18),
                          fontWeight: FontWeight.bold,
                          margin: Margins.only(top: 12, bottom: 6),
                        ),
                      },
                    ),
                  ),

                  SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Html(
                      data: widget.packageData['hotelDescription'],
                      style: {
                        "*": Style(
                            fontSize: FontSize(16),
                            lineHeight: LineHeight(1.6),
                            backgroundColor: Colors.transparent
                        ),
                        "h2": Style(
                          fontSize: FontSize(20),
                          fontWeight: FontWeight.bold,
                          margin: Margins.only(top: 16, bottom: 8),
                        ),
                        "h3": Style(
                          fontSize: FontSize(18),
                          fontWeight: FontWeight.bold,
                          margin: Margins.only(top: 12, bottom: 6),
                        ),
                      },
                    ),
                  ),

                  SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Html(
                      data: widget.packageData['hotelCancellationPolicy'],
                      style: {
                        "*": Style(
                            fontSize: FontSize(16),
                            lineHeight: LineHeight(1.6),
                            backgroundColor: Colors.transparent
                        ),
                        "h2": Style(
                          fontSize: FontSize(20),
                          fontWeight: FontWeight.bold,
                          margin: Margins.only(top: 16, bottom: 8),
                        ),
                        "h3": Style(
                          fontSize: FontSize(18),
                          fontWeight: FontWeight.bold,
                          margin: Margins.only(top: 12, bottom: 6),
                        ),
                      },
                    ),
                  ),
                ],
              ),
            ),


            if (widget.packageData['rooms'] != null &&
                (widget.packageData['rooms'] as List).isNotEmpty)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                   Padding(
                    padding: EdgeInsets.fromLTRB(16, 24, 16, 8),
                    child: Text(
                      "Rooms Available in ${widget.packageData['hotelName']}",
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 220,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      itemCount: (widget.packageData['rooms'] as List).length,
                      itemBuilder: (context, index) {
                        final room = widget.packageData['rooms'][index];
                        return Container(
                          width: 180,
                          margin: const EdgeInsets.only(right: 16),
                          child: Card(
                            elevation: 4,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [

                                ClipRRect(
                                  borderRadius: const BorderRadius.vertical(
                                    top: Radius.circular(12),
                                  ),
                                  child: Image.network(
                                    json.decode(room['roomImages'])[0],
                                    height: 120,
                                    width: double.infinity,
                                    fit: BoxFit.cover,
                                  ),
                                ),


                                Padding(
                                  padding: const EdgeInsets.all(12),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        room['roomType'],
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 16,
                                        ),
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                      const SizedBox(height: 4),
                                      Row(
                                        children: [
                                          Icon(Icons.star,
                                              color: Colors.amber.shade600,
                                              size: 16),
                                          const SizedBox(width: 4),
                                          Text(
                                            '${randomNumber}',
                                            style: TextStyle(fontSize: 14),
                                          ),
                                        ],
                                      ),

                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),

         
              
        
          ],
        ),
      ),
    );
  }
}
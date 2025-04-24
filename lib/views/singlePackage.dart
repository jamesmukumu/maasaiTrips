import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:masaitrips/services/package/package_service.dart';
import 'dart:convert';
import 'package:carousel_slider/carousel_slider.dart';



class Singular_Package extends StatefulWidget {
  const Singular_Package({super.key});

  @override
  State<Singular_Package> createState() => _Singular_PackageState();
}

class _Singular_PackageState extends State<Singular_Package> {
  final package = new PackageService();
Future<void>? fetchingPackage;
dynamic pckData;

String packageSlug ='';
dynamic packageData;
  @override
  void didChangeDependencies() {
    final route = ModalRoute.of(context)?.settings.arguments as Map;
   setState(() {
     packageSlug = route['packageSlug'];
   });
   fetchingPackage = package.fetchSingularPackage(packageSlug).then((Databody){
    var data =  json.decode(Databody.body);
  setState(() {
    pckData = data['data'];
  });
   });
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder(future: fetchingPackage, builder: (ctx,snap){
        if(snap.connectionState == ConnectionState.done){
          return Pck(packageData: pckData);
        }else{
          return Center(
            child: CircularProgressIndicator(
              color: Color(0xFFE88B22),
            ),
          );
        }


      }),




      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Colors.black,
        title: Text("$packageSlug",style: TextStyle(
          color: Colors.white
        ),),
        leading: Padding(padding: EdgeInsets.all(8.5),child: Image(image: AssetImage('lib/assets/maasai-trips-logo.png')),),
        automaticallyImplyLeading: false,
      ),
    );
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
              widget.packageData['packageImage'],
              fit: BoxFit.cover,
            ),
          ),
          Text('${widget.packageData['packageTitle']}',style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 17.5
          ),),
          SizedBox(height: 16),
          CarouselSlider(
            items: (json.decode(widget.packageData['packageImages']) as List<dynamic>)
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
          Text("Package Overview:",style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 17.5
          ),),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Html(
              data: widget.packageData['packageOverview'],
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
          Container(
            child: Column(
              children: [
                TabBar(
                  labelColor: Color(0xFFE88B22),
                  indicatorColor: Color(0xFFE88B22),
                  controller: _tabController,
                  tabs: [
                    Tab(text: 'Itinerary'),
                    Tab(text: 'Inclusions'),
                    Tab(text: 'Special Notes'),
                  ],
                )
              ],
            ),
          ),
          SizedBox(
            height: 250,
            child: TabBarView(
              controller: _tabController,
              children: [
                SingleChildScrollView(child: Html(data: '${widget.packageData['packageAbout']}', style: {
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
                },)),
                SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text('Inclusions',style: TextStyle(
                          fontSize: 17.5,
                          fontWeight: FontWeight.bold
                      ),),
                      Column(
                        children: (json.decode(widget.packageData['packageInclusives']) as List<dynamic>)
                            .map((incl) => Row(
                          children: [
                            Icon(Icons.check,color: Colors.green,),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text(incl.toString()),
                            ),
                          ],
                        ))
                            .toList(),
                      ),
                      Text('Exclusions',style: TextStyle(
                          fontSize: 17.5,
                          fontWeight: FontWeight.bold
                      ),),
                      Column(
                        children: (json.decode(widget.packageData['packageExclusives']) as List<dynamic>)
                            .map((incl) => Row(
                          children: [
                            Icon(Icons.check,color: Colors.red,),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text(incl.toString()),
                            ),
                          ],
                        ))
                            .toList(),
                      ),
                    ],
                  ),
                ),
                Html(data: widget.packageData['packageSpecialNotes'] ?? 'No special notes available', style: {
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
                },),
              ],
            ),
          )
        ],
      ),
    );
  }
}



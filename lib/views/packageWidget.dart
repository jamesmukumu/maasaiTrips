import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:masaitrips/services/package/package_service.dart';
import 'dart:convert';




class Package extends StatefulWidget {
  const Package({super.key});

  @override
  State<Package> createState() => _PackageState();
}

class _PackageState extends State<Package> {
  List<dynamic> landCruiserPackages = [];
  List<dynamic> airSafariPackages = [];
  List<dynamic> jeepSafaris = [];
void visitPackage(String packageSlug){
  Navigator.of(context).pushNamed("/singular/package",arguments: {
    "packageSlug":packageSlug
  });
}
  Widget PackageCard(packageInfo) {
    return InkWell(
      onTap: (){
        visitPackage("${packageInfo['packageSlug']}");
      },
      child: Padding(
        padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
        child: Container(
          width: 200,
          height: 200,
          margin: EdgeInsets.symmetric(horizontal: 8),
          child: Card(

            clipBehavior: Clip.antiAlias,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [

                Container(
                  height: 120,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: NetworkImage(packageInfo['packageImage']),
                      fit: BoxFit.cover,
                    ),
                  ),
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.bottomCenter,
                        end: Alignment.topCenter,
                        colors: [
                          Colors.black.withOpacity(0.7),
                          Colors.transparent,
                        ],
                      ),
                    ),
                    alignment: Alignment.topRight,
                    padding: EdgeInsets.all(8),
                    child: Text(
                      packageInfo['packageTitle'] ?? 'Package',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ),
                ),

                Padding(
                  padding: EdgeInsets.all(8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("${packageInfo['packageTitle']}",style: TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 14
                      ),),
                      SizedBox(height: 4),
                      Text(
                        'Package Charge:${packageInfo['packageCharge'].toString().replaceAll(RegExp(r'\B(?=(\d{3})+(?!\d))'),",") ?? 'N/A'} ${packageInfo['packageChargeCurrency']}',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Color(0xFFE88B22),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  final package = new PackageService();
  bool fetchingPackages = false;

  @override
  void initState() {
    fetchingPackages = true;
    super.initState();
    package.fetchOfferPackages().then((data) {
      dynamic dataBody = json.decode(data.body);

      if (dataBody['message'] == 'Packages Fetched') {
        setState(() {
          fetchingPackages = false;
          landCruiserPackages = dataBody['landCruiserPackages'];
          airSafariPackages = dataBody['airPackages'];
          jeepSafaris = dataBody['jeepPackages'];
        });
        print(landCruiserPackages);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: fetchingPackages
          ? SizedBox(
        width: 40,
        height: 40,
        child: CircularProgressIndicator(
          color: Color(0xFFE88B22),
          strokeWidth: 4.0,
        ),
      )
          : Container(

        child:  Column(
          children: [
            Center(child: Text("Feature LandCruiser Packages",style: TextStyle(
                fontWeight: FontWeight.bold
            ),)),
            SizedBox(
              height: 220,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: landCruiserPackages.length,
                itemBuilder: (context, index) {
                  return PackageCard(landCruiserPackages[index]);
                },
              ),
            ),
            Center(child: Text("Feature AirSafari Packages",style: TextStyle(
                fontWeight: FontWeight.bold
            ),)),
            SizedBox(
              height: 220,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: airSafariPackages.length,
                itemBuilder: (context, index) {
                  return PackageCard(airSafariPackages[index]);
                },
              ),
            ),

            Center(child: Text("Feature Jeep Packages",style: TextStyle(
                fontWeight: FontWeight.bold
            ),)),
            SizedBox(
              height: 220,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: jeepSafaris.length,
                itemBuilder: (context, index) {
                  return PackageCard(jeepSafaris[index]);
                },
              ),
            ),
          ],
        )
      ),
    );
  }
}
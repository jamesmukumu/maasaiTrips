import 'package:flutter/material.dart';
import 'package:masaitrips/views/home.dart';
import 'package:masaitrips/views/landingPage.dart';
import 'package:masaitrips/views/singlePackage.dart';
import 'package:masaitrips/views/singular_destination.dart';

void main() {
  runApp(MaterialApp(
    initialRoute: "/",
    routes: {
      "/":(context)=>Landing(),
      "/home":(context)=>Home(),
      "/singular/package":(context)=>Singular_Package(),
      '/singular/destination':(context)=>Singular_Destination()

    },

  ));
}


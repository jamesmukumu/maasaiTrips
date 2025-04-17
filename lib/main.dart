import 'package:flutter/material.dart';
import 'package:masaitrips/views/home.dart';
import 'package:masaitrips/views/landingPage.dart';

void main() {
  runApp(MaterialApp(
    initialRoute: "/",
    routes: {
      "/":(context)=>Landing(),
      "/home":(context)=>Home()

    },

  ));
}


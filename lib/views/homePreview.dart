import 'package:flutter/cupertino.dart';
import 'package:masaitrips/views/packageWidget.dart';
import 'package:masaitrips/widgets/Overviews.dart';
import 'package:masaitrips/widgets/homeBody.dart';


class HomeBody extends StatelessWidget {
  const HomeBody({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: ListView(

        children: [
          HomeWidget(),
          OverViewsMara(),

          Package()

        ],

      ),
    );
  }
}

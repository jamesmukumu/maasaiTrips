import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:internet_connection_checker_plus/internet_connection_checker_plus.dart';


class Landing extends StatefulWidget {
  const Landing({super.key});

  @override
  State<Landing> createState() => _LandingState();
}

class _LandingState extends State<Landing> {
  final connectionState = InternetConnection();
  
  Future<void> internetVerifyer()async{
    try{
      bool connectionPresent = await connectionState.hasInternetAccess;
      if(connectionPresent) {
  Navigator.pushNamed(context, "/home");
}else{
        showDialog(
          context: context,
          builder: (ctx) {
            return AlertDialog(
              elevation: 3.0,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              title: Text(
                'No Internet',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              content: Text(
                'Internet connection should be provided to proceed.',
                style: TextStyle(fontSize: 16),
              ),
              actions: [
                FilledButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Color(0xFFE88B22))
                  ),
                  onPressed: (){},
                  child: Text('Check Internet',style: TextStyle(
                    color: Colors.white
                  ),),
                ),
              ],
            );
          },
        );

      }
}catch(err){
    print(err);
    }
    
    
  }
  @override
  void initState() {
    internetVerifyer();
    super.initState();
  }
  
  @override
  Widget build(BuildContext context) {
    return  Container(

      child:  Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image(image: AssetImage("lib/assets/maasai-trips-logo.png")),

        ],
      ),

    );
  }
}

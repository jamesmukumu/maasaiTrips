import 'package:flutter/material.dart';
import 'package:masaitrips/views/destinations.dart';
import 'package:masaitrips/views/homePreview.dart';
import 'package:masaitrips/views/hotel.dart';




class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}
 
class _HomeState extends State<Home> {
  @override
  List<Widget> menuItems = [];
  final List  featureDestinations = [
    {
      'destinationName':'Nakuru County',
      'destinationSlug':'NakuruCounty'
    },
    {
      'destinationName':'Nairobi County',
      'destinationSlug':'Nairobi County'
    },
    {
      'destinationName':'Kisumu County',
      'destinationSlug':'Kisumu County'
    },
    {
      'destinationName':'Samburu County',
      'destinationSlug':'Samburu County'
    },
    {
      'destinationName':'Mombasa North Coast',
      'destinationSlug':'Mombasa North Coast'
    },
  ];
  final List hotels = [
    {
      'hotelName':'Ashnil Mara Camp',
      'hotelSlug':''
    },
    {
      'hotelName':'Karen Blixen',
      'hotelSlug':''
    },
    {
      'hotelName':'Enkorok Mara Camp',
      'hotelSlug':''
    },

  ];


  final List packages = [
    {
      'packageTitle':'Olikinyei 4 days trips',
      'packageSlug':''
    },


  ];

  void changeNav(int newNav){
    setState(() {
      initialIdx = newNav;
    });
  }
  List <Widget> pages = [HomeBody(),Destinations(),Hotels()];
  int initialIdx = 0 ;
  Widget build(BuildContext context) {
    return Scaffold(
      drawer:  SafeArea(
        child: Drawer(
          elevation: 3.0,
          child: Column(
            children: [
              ExpansionTile(title: Text("Feature Destinations"),children: featureDestinations.map((destination){
                return   ListTile(
                  leading: Icon(Icons.place,color: Color(0xFFE88B22),),
                  title: Text("${destination['destinationName']}"),
                );
              }).toList()),
              ExpansionTile(title: Text("Feature Hotels"),children:hotels.map((hotel){
                return  ListTile(
                  leading: Icon(Icons.hotel,color: Color(0xFFE88B22),),
                  title: Text("${hotel['hotelName']}"),
                );
              }).toList(),),
              ExpansionTile(title: Text("Feature Packages"),children: packages.map((package){
                return
                  ListTile(
                    leading: Icon(Icons.place,color: Color(0xFFE88B22),),
                    title: Text("${package['packageTitle']}"),
                  );
              }).toList(),),
            TextButton.icon(style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all(Color(0xFFE88B22))
            ),onPressed: (){}, label: Text('Travel to the mara',style: TextStyle(
              color: Colors.white
            ),),icon: Icon(Icons.face,color: Colors.white,),)
        
            ],
          )
        ),
      ),
      bottomNavigationBar: BottomNav(changeItem:changeNav , currentIdx: initialIdx),
      body: Container(

          child: pages[initialIdx] ,
      ),
      appBar: AppBar(

        centerTitle: true,
        backgroundColor: Colors.black,
        automaticallyImplyLeading: false,
       title: Text("Maasai Mara Trips",style: TextStyle(
         color: Colors.white
       ),),
    leading: Padding(padding: EdgeInsets.all(8.5),child: Image(image: AssetImage('lib/assets/maasai-trips-logo.png')),),
      actions: [
      Builder(builder: (ctx){
        return   IconButton(onPressed: (){
          Scaffold.of(ctx).openDrawer();
        },color: Colors.white, icon: Icon(
            Icons.menu
        ));
      })
      ],

      ),

    );
  }
}








// here is the bottom navigation
class BottomNav extends StatelessWidget {
  final int currentIdx;
  final ValueChanged<int> changeItem;

  const BottomNav({super.key,required this.changeItem,required this.currentIdx});

  @override
  Widget build(BuildContext context) {
    
        return NavigationBar(
          backgroundColor: Colors.white,
          elevation: 3.0,
            selectedIndex: currentIdx,
            onDestinationSelected: (idx){
              changeItem(idx);
            },
            indicatorColor: Color(0xFFE88B22),
            destinations: [
              NavigationDestination(icon: Icon(Icons.home), label: "Home"),
              NavigationDestination(icon: Icon(Icons.place), label: "Destinations"),
              NavigationDestination(icon: Icon(Icons.hotel), label: "Hotels"),
              NavigationDestination(icon: Icon(Icons.newspaper_rounded), label: "Blogs"),



            ]);
    


  }
}


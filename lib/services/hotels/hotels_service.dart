import 'package:http/http.dart' as http;

class hotels{
  String baseUrl = 'https://maasaitrips-2.onrender.com/api';
  
  Future<dynamic> fetchHotels(dynamic page)async{
    try{
      final client = http.Client();
      var url =  Uri.parse('${baseUrl}/fetch/display/hotels').replace(
        queryParameters: {
          "page":page
        }
      );
  var response = await client.get(url);
  return response;
    }catch(err){
      return err;
    }}

  Future<dynamic> fetchSingularHotel(String slug)async{
    try{
      final client = http.Client();
      var url =  Uri.parse('${baseUrl}/fetch/hotel').replace(
          queryParameters: {
            "slug":slug
          }
      );
      var response = await client.get(url);
      return response;
    }catch(err){
      return err;
    }}



}


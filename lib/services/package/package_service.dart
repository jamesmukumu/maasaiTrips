import 'package:http/http.dart' as http;
class PackageService{
 String baseUrl = 'https://maasaitrips-2.onrender.com/api';
 Future<dynamic> fetchOfferPackages()async{
try{
 final client = http.Client();
Uri urlParsed = Uri.parse("$baseUrl/fetch/display/packages");
dynamic packageData = await http.get(urlParsed);
return packageData;
}catch(err){
return err;
}}







Future<dynamic> fetchSingularPackage(String packageSlug)async{
  try{
    final client = http.Client();
    String urlPath =  "$baseUrl/fetch/singular/package?packageSlug=$packageSlug";
 Uri uriPath = Uri.parse(urlPath);
var response  = await client.get(uriPath);
return response;
  }catch(err){
return err;
  }

}

}
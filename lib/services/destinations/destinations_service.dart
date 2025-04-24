import 'package:http/http.dart' as http;

class Destinations_Service {
  String baseUrl = 'https://maasaitrips-2.onrender.com/api';

  Future<dynamic> fetchDestinations() async {
    try {
      var client = http.Client();
      final uriPath = Uri.parse('$baseUrl/fetch/destinations');
      var response = await client.get(uriPath);
      return response;
    } catch (err) {
      return err;
    }
  }


  Future<dynamic> fetchParticularDestination(String destinationSlug) async {
    try {
      var client = http.Client();
      final uriPath = Uri.parse(
          '$baseUrl/find/single/destination?slug=$destinationSlug}');
      var response = await client.get(uriPath);
      return response;
    } catch (err) {
      return err;
    }
  }
}
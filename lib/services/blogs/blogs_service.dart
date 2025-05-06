import 'package:http/http.dart' as http;

class Blogs{

  String baseUrl = 'https://maasaitrips-2.onrender.com/api';

  Future<dynamic> fetchBlogs()async{
    try{
      final client = http.Client();
      var url = Uri.parse("$baseUrl/fetch/display/blogs");
      var response = await client.get(url);
      return response;
    }catch(err){
      return err;
    }
  }

}


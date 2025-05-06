import 'package:flutter/material.dart';
import 'package:masaitrips/services/blogs/blogs_service.dart';
import 'dart:convert';

class BlogsPage extends StatefulWidget {
  BlogsPage({super.key});

  @override
  State<BlogsPage> createState() => _BlogsPageState();
}

class _BlogsPageState extends State<BlogsPage> {
  final blogs = new Blogs();
  Future<void> ?fetchingBlogs;
  late List<dynamic> blogsData;

  @override
  void didChangeDependencies() {
     fetchingBlogs = blogs.fetchBlogs().then((data){
       var actualData = json.decode(data.body);
       setState(() {
         blogsData = actualData['blogs'];
       });
     }).catchError((err){
       print(err);
     });
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(future: fetchingBlogs, builder: (ctx,snap){
      if(snap.connectionState == ConnectionState.done){
       return ListView.builder(
         itemCount: blogsData.length,
           itemBuilder: (ctx,idx){
         return BlogCard(blogData: blogsData[idx]);
       });
      }else{
        return Center(child: CircularProgressIndicator(color: Color(0xFFE88B22),));
      }
    });
  }
}







class BlogCard extends StatelessWidget {
  dynamic blogData;
  BlogCard({super.key,required this.blogData});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Blog Thumbnail
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
            child: Image.network(""),//put img url here
          ),

          // Blog Content
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Blog Title
                Text(
                  'Blog Title', // Will be replaced with actual title
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),

                const SizedBox(height: 8),

                // Blog Excerpt
                Text(
                  'Blog content excerpt...', // Will be replaced with actual content
                  style: Theme.of(context).textTheme.bodyMedium,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),

                const SizedBox(height: 16),

                // Creator and Date Info
                Row(
                  children: [
                    // Avatar
                    const CircleAvatar(
                      radius: 16,
                      backgroundImage: AssetImage('assets/default_avatar.png'),
                    ),

                    const SizedBox(width: 8),

                    // Creator name and date
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Creator Name', // Will be replaced with actual name
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            'Time created', // Will be replaced with actual date
                            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ),
                    ),

                    // Like button
                    IconButton(
                      icon: const Icon(Icons.favorite_border),
                      onPressed: () {},
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
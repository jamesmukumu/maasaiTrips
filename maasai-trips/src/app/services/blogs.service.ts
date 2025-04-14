import { Injectable } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root'
})
export class BlogsService {
baseUrl = 'http://localhost:8000/api'
  constructor() { }

async createBlogCategory(blogCategory:any){
try{
let token = Cookies.get("grant_token")
var response = await axios.post(`${this.baseUrl}/create/new/blog/category`,blogCategory,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
}catch(err){
return err
}
}



async fetchBlogCategories(){
try{
var token = Cookies.get("grant_token")
var response = await axios.get(`${this.baseUrl}/fetch/blog/categories`,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
}catch(err){
return err
}}




async createBlog(blogData:any){
try{
let token = Cookies.get("grant_token")
let formData = new FormData()
formData.append("blogTitle",blogData.blogTitle)
formData.append("thumbnail",blogData.thumbnail)
formData.append("blog_categories_id",blogData.blogCategories_id)
formData.append("blogContent",blogData.blogContent)
var response = await axios.post(`${this.baseUrl}/create/new/blog`,formData,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
}catch(err){
return err
}}


async fetchMyBlogs(){
try{
let token = Cookies.get('grant_token')
var response = await axios.get(`${this.baseUrl}/fetch/my/blogs`,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
}catch(err){
return err
}
}






async updateBlog(blogData:any,id:number){
try{
  let formData = new FormData()
  const appender = (key: string, value: any) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      value !== 'undefined'
    ) {
      formData.append(key, value);
    }
  };

    appender("blogTitle",blogData.blogTitle)
    appender("thumbnail",blogData.thumbnail)
    appender("blog_categories_id",blogData.blogCategories_id)
    appender("blogContent",blogData.blogContent)
    let token = Cookies.get('grant_token')
   let response =await axios.post(`${this.baseUrl}/update/blog`,formData,{
  headers:{
  "Authorization":`Bearer ${token}`
  },
  params:{
  "id":id
  }
  })
return response.data
}catch(err){
return err
}
}

async deleteBlog(id:number){
try{
let token = Cookies.get("grant_token")
var response = await axios.delete(`${this.baseUrl}/delete/blog?id=${id}`,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
}catch(err){
return err
}
}




async publishBlog(id:number){
try{
let token = Cookies.get("grant_token")
let response = await axios.patch(`${this.baseUrl}/publish/blog?id=${id}`,{},{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
}catch(err){
return err
}
}

async unpublishBlog(id:number){
  try{
  let token = Cookies.get("grant_token")
  let response = await axios.patch(`${this.baseUrl}/unpublish/blog?id=${id}`,{},{
  headers:{
  "Authorization":`Bearer ${token}`
  }
  })
  return response.data
  }catch(err){
  return err
  }
  }
  

async fetchBlogsDisplay(){
try{
var response = await axios.get(`${this.baseUrl}/fetch/display/blogs`)
return response.data
}catch(err){
return err
}
}



}

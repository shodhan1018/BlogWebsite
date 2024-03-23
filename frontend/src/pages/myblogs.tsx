import React, { useEffect, useState } from 'react';
import { Card, Image, Text ,Space, Button} from '@mantine/core';
import NavBar from './homepage';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Blog{
    title:String,
    body:String,
    blog_id:String,
    user_id:String,
    author: String,
    createdOn: String
}

export default function MyBlogs(){
    
    const [blogs,setBlogs] = useState<any>();
    const [render,setRender]=useState(0);
    async function deleteBlog(id:any) {
        console.log(id)
        await axios.delete("http://localhost:3000/blog/delete/"+id,
        )
        .then((res)=>{
            console.log(res);
            setRender(render+1);
        })
    }
   
    
    useEffect(()=>{
         async function fetchBlogs(){
            await axios.get("http://localhost:3000/myblogs",{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            .then(res=>{
                // console.log(res.data.blogs);
                console.log(localStorage.getItem("token"));
                
                setBlogs(res.data.blogs);
            })
    }
        fetchBlogs();
    },[render])
    if(!blogs || blogs.lenth==0){
        return (
            <h1>Loading..</h1>
        )
    }
    // console.log(blogs);
    
    return(<>
    
    <NavBar/>
    <div className='d-flex justify-content-center'>
        <div>
            {
                blogs.map((x:any)=>{
                    console.log(x);
                    return(
                        <>
                        <div className='m-3' key={x._id} style={{width:"500px"}}>
                            <Card 
                            shadow="lg"
                            padding="xl"
                            component="a"
                            withBorder
                            >
                                <Image onClick={()=>{deleteBlog(x._id)}}
                                    
                                 maw={20} mx="auto" radius="md" src="https://cdn-icons-png.flaticon.com/512/4441/4441955.png" />
                                <Text weight={500} size="lg">
                                    {x.title}
                                </Text>
                                <Text size="sm">
                                    {x.body}
                                </Text>
                            </Card>
                            
                        </div>
                        <Space></Space>
                        </>
                    )
                })
            }
        
    
        </div>
    </div>

    </>)
}
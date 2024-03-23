import React, { useEffect, useState } from 'react';
import { Card, Image, Text ,Space,Avatar} from '@mantine/core';
import NavBar from './homepage';
import axios from 'axios';

interface Blog{
    title:String,
    body:String,
    blog_id:String,
    user_id:String,
    author: String,
    createdOn: String
}

export default function Blogs(){
    const [blogs,setBlogs] = useState<any>();
    async function fetchBlogs(){
        await axios.get("http://localhost:3000/allBlogs")
        .then(res=>{
            // console.log(res.data.blogs);
            setBlogs(res.data.blogs);
        })
    }
    useEffect(()=>{
        fetchBlogs();
    },[])
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
                        <div className='m-3 ' key={x._id} style={{width:"500px"}}>
                            <Card 
                            shadow="lg"
                            
                            
                            withBorder
                            >
                                
                                <div style={{marginTop:"-10px",marginLeft:"-10px"}} className='d-flex border-bottom '>
                                    <div style= {{marginTop:"-3px"}} ><Avatar size={35}  radius="xl"   component="a" src={x.author.image} alt="it's me" /></div>
                                    <div style={{marginTop:"8px",marginLeft:"10px"}} ><Text > {x.author.name}</Text></div>
                                </div>
                                
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
import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Box, Center,Space } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { Textarea } from '@mantine/core';
import NavBar from './homepage';
import { useState } from 'react';
import axios from 'axios';
import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
export default function BlogInsert() {
  const [title,setTitle]=useState(String);
  const[body,setBody]=useState(String);
  const[showNotification,setShowNotification]=useState(0);
   const postBlog= async ()=>{
        await axios.post("http://localhost:3000/insertBlog",{
          headers:{token:localStorage.getItem("token")},
          body:{
            title:title,
            body:body
          }
        })
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.log(err);
        })
        
  }
  return (
    <>
    <NavBar/>
    <Space h="sm" />
    <Box maw={320} mx="auto">
      <TextInput withAsterisk value={title} label="Title" placeholder="Title" onChange={(event)=>{setTitle(event.currentTarget.value)}} />
      <Textarea
      placeholder="Blog"
      label="Blog"
      withAsterisk
      value={body}
      onChange={(event)=>{setBody(event.currentTarget.value)}}
     />
     <Space h="sm" />
     <Center><Button onClick={()=>{
      postBlog();
      setTitle("");
      setBody("");
      }}
      >Submit</Button></Center>
    </Box>
    {title}
    <Space></Space>
    {body}
    
    </>
    
  );
}
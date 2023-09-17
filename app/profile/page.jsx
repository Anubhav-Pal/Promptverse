"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";

import Profile from '@components/Profile';

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPosts(data);
        // console.log(data);

        if (session?.user.id) { fetchPosts(); }

      } catch (error) {

        console.error('Error fetching posts:', error);
        // Handle the error gracefully, e.g., display an error message to the user
      }
    };

    fetchPosts();
  }, [])
  const handleEdit = () => { }
  const handleDelete = async () => { }
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
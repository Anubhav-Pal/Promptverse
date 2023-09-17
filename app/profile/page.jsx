"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";

import Profile from '@components/Profile';

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([])
  const Router = useRouter();

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
  const handleEdit = (post) => {
    Router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hadConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hadConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        })

        const filteredPosts = posts.filter((p) => { p._id !== post._id })
        setPosts(filteredPosts);
      } catch (error) { console.log(error); }
    }
  }
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
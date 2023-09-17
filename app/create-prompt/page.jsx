"use client"

import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'

import Form from '@components/Form'

const createPrompt = () => {
  const Router = useRouter();
  const { data: session } = useSession();

  // State variables

  //This one is for loading function
  const [submitting, setSubmitting] = useState(false);

  const [post, setPost] = useState({
    title: '',
    tag: '',
  })

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    try {
      const response = await fetch('/api/prompt/new', {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })
      if (response.ok) {
        Router.push('/')
      }
    } catch (error) { console.log(error); } finally { setSubmitting(false) }
  }

  return (
    <div>
      <Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  )
}

export default createPrompt
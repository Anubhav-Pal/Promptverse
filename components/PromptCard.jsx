"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const [copied, setCopied] = useState('')

  //Copy function
  const copyToClipboard=()=>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=> setCopied(''),3000)
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-betweem items-start gap-5'>
        <div className='flex flex-1 justify-center items-center gap-2 cursor-pointer'>
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-xs text-gray-500'>{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn object-contain" onClick={copyToClipboard}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={16}
            height={16}
            alt='copy button'
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700' >{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p>

    </div>
  )
}

export default PromptCard
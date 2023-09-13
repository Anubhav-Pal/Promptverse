"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
  const isUserLoggedIn = true;

  // state

  const [providers, setProviders] = useState(null);

  //use effect
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders(); //The response variable will contain an array of objects, each of which represents an authentication provider. 
      setProviders(response);
    }
    fetchProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image
          src='/assets/images/logo.svg'
          width={30}
          height={30}
          alt="Promptopia logo"
          className="object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop navigation */}

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap:3 md:gap-3 items-center">
            <Link href='/create-post' className="black_btn">Create Post</Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href='/profile'>
              <Image
                src='/assets/images/logo.svg'
                width={30}
                height={30}
                alt="Profle Image"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (<>
          {providers && Object.values(providers).map((provider) =>
          (<button
            type="button"
            className="black_btn"
            key={provider.name}
            onClick={() => { signIn(provider.id) }}>
            Sign In</button>)
          )}
        </>)}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {/* sm:hidden means that the shit is hidden of all screens>=sm */}
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src='/assets/images/logo.svg'
              width={30}
              height={30}
              alt="Profle Image"
              className="rounded-full"
            />
          </div>
        ) : (<>
          {providers && Object.values(providers).map((provider) =>
          (<button
            type="button"
            className="black_btn"
            key={provider.name}
            onClick={() => { signIn(provider.id) }}>
            Sign In</button>)
          )}
        </>)}


      </div>
    </nav>
  )
}

export default Nav
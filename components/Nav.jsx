"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
  // const isUserLoggedIn = true;
  const { data: session } = useSession();

  // states
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false)


  //use effect to fetch authentication providers
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



      {/* Next.config.js is not configured */}



      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap:3 md:gap-3 items-center">
            <Link href='/create-prompt' className="black_btn">Create Prompt</Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href='/profile'>
              <Image
                src={session?.user.image}
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
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={30}
              height={30}
              alt="Profle Image"
              className="rounded-full"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link href='/profile' className="dropdown_link" onClick={() => setToggleDropDown(false)}>My Profile</Link>
                <Link href='/create-prompt' className="dropdown_link" onClick={() => setToggleDropDown(false)}>Create Prompt</Link>
                <button type="button" className="mt-5 w-full black_btn">Sign out</button>
              </div>
            )}
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
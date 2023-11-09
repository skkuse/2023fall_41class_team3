"use client";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Header = () => {
  return (
    <div className="w-full bg-primary-green">
      <Link href="/" className="flex justify-center m-1 ">
        <Image
          src="/assets/icons/logo.svg"
          alt="CodEco LOGO"
          width={50}
          height={50}
          className="object-contain "
        />
        <span className="flex items-center logo_text">CodEco</span>
      </Link>
      <ReactPlayer
        className="top-0"
        url="/assets/videos/banner.mp4"
        width="100%"
        height="100%"
        playing={true}
        muted={true}
        controls={false}
        loop={true}
        disablePictureInPicture={true}
      />
    </div>
  );
};

export default Header;

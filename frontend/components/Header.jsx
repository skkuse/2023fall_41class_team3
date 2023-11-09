"use client";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Header = () => {
  return (
    <div className="relative w-full">
      {/* nav-bar 진녹색 투명 설정 */}
      <div
        id="nav-bar"
        className="z-20 top-0 w-full bg-primary-green/80 h-[10%] absolute">
        <Link
          href="/"
          className="flex content-center justify-center m-1 item-center">
          <Image
            src="/assets/icons/logo.svg"
            alt="CodEco 로고"
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="flex items-center logo_text text-white-[2%]">
            CodEco
          </span>
        </Link>
      </div>
      <div id="forest-player" className="top-0 w-full -z-10">
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
    </div>
  );
};

export default Header;

"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Header = () => {
  return (
    <div className="w-full bg-primary-green">
      <Link href="/" className="flex justify-center m-8 ">
        <Image
          src="/assets/icons/logo.svg"
          alt="CodEco LOGO"
          width={50}
          height={50}
          className="object-contain "
        />
        <span className="flex items-center logo_text">CodEco</span>
      </Link>
    </div>
  );
};

export default Header;

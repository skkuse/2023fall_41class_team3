import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    // <header className="w-full h-[7rem] gradient flex-col justify-center items-center">
    <header className="w-full h-[7rem] bg-green-900 flex-col justify-center font-serif items-center py-2">
      <Link href="/">
        <div className="flex items-center content-center justify-center m-1">
          <Image
            src="/assets/icons/logo.svg"
            alt="CodEco 로고"
            width={75}
            height={75}
            className="object-contain"
          />
          <span className="text-5xl tracking-wider text-white">CODECO</span>
        </div>
      </Link>
      <div className="flex items-center content-center justify-center text-xl italic text-white">
        The perfect carbon footprint calculator for your code.
      </div>
    </header>
  );
};

export default Header;

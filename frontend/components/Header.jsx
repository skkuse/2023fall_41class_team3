import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full h-[7rem] bg-green-900 flex-col justify-center items-center">
      <Link href="/">
        <div className="flex content-center justify-center m-1 items-center">
          <Image
            src="/assets/icons/logo.svg"
            alt="CodEco 로고"
            width={75}
            height={75}
            className="object-contain"
          />
          <span className="text-white text-5xl tracking-wider">CODECO</span>
        </div>
      </Link>
      <div className="flex content-center justify-center items-center text-white text-xl italic">
        The perfect carbon footprint calculator for your code.
      </div>
    </header>
  );
};

export default Header;

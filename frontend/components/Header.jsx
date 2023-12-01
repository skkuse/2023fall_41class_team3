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

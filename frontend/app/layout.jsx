import "@styles/globals.css";
import Header from "@/components/Header";
import dynamic from 'next/dynamic'
export const metadata = {
  title: "CodEco",
  description: "A Carbon Footprint Reduction Project",
};

const HeaderC = dynamic(() => import('../components/Header'), { ssr: false })

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          <HeaderC />
          {children}
        </main>
      </body>
    </html>
  );
};

export default Rootlayout;

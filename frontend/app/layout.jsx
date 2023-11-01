import "@styles/globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "CodEco",
  description: "A Carbon Footprint Reduction Project",
};
const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
};

export default Rootlayout;

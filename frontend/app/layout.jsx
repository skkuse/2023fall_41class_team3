import "@styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CodEco",
  description: "A Carbon Footprint Reduction Project",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="app">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default Rootlayout;

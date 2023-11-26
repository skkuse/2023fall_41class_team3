import "@styles/globals.css";
import Header from "@/components/Header";

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
      </body>
    </html>
  );
};

export default Rootlayout;

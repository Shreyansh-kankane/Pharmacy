import { useEffect, useRef } from "react";
import ClientDetails from "@/components/ClientDetails";
import Dates from "@/components/Dates";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainDetails from "@/components/MainDetails";
import Table from "@/components/Table";
import ReactToPrint from "react-to-print";
import { useCart } from "@/context/cartContextProvider";
import { useRouter } from "next/router";

function App() {
    const componentRef = useRef();
    const { cartState } = useCart();
    const router = useRouter();

    if(cartState.items.length === 0){
        return <div className="text-center text-3xl mt-2 font-bold"> No order found</div>
    }

  return (
    <div className="flex justify-center w-full">
      <main
        className="m-5 p-5 xl:grid grid-cols-2 gap-10 xl:items-start"
        style={{
          maxWidth: "1920px",
          margin: "auto",
        }}
      >

        {/* Invoice Preview */}
        <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
          <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                Print / Download
              </button>
            )}
            content={() => componentRef.current}
          />
          <div ref={componentRef} className="p-5">
            <Header />

            <MainDetails />

            <ClientDetails />

            <Dates />

            <Table />

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

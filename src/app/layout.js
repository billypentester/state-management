'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { store } from './../redux/store'
import { Provider } from 'react-redux'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <div className="container px-40 mx-auto my-10">
            <div className="bg-base-200 p-10 rounded-xl shadow-lg">
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}

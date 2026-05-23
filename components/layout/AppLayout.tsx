"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";

import { Menu, X } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [open, setOpen] =
    useState(false);

  return (

    <div className="min-h-screen bg-black flex">

      {/* SIDEBAR DESKTOP */}

      <div className="hidden md:flex">

        <Sidebar />

      </div>

      {/* MOBILE MENU */}

      {open && (

        <div
          className="
            fixed inset-0 z-50
            bg-black/70 backdrop-blur-sm
            md:hidden
          "
        >

          <div className="w-[280px] h-full">

            <Sidebar />

          </div>

        </div>

      )}

      {/* CONTENT */}

      <main className="flex-1 min-w-0">

        {/* TOPBAR MOBILE */}

        <div
          className="
            md:hidden
            h-20
            border-b border-white/10
            flex items-center justify-between
            px-5
            sticky top-0
            z-40
            bg-black/90
            backdrop-blur-xl
          "
        >

          <div>

            <p className="text-green-400 text-xs font-black tracking-[4px]">
              PRANGE ERP
            </p>

            <h1 className="text-white font-black text-lg">
              Sistema Industrial
            </h1>

          </div>

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
              w-12 h-12
              rounded-2xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
              text-white
            "
          >

            {open ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}

          </button>

        </div>

        {/* PAGE */}

        <div className="p-4 md:p-8">

          {children}

        </div>

      </main>

    </div>

  );

}
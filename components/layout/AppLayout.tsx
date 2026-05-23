"use client";

import Sidebar from "./Sidebar";

import {
  Search,
  Bell,
  Menu,
} from "lucide-react";

import { useState } from "react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (

    <div className="flex min-h-screen bg-[#060606]">

      {/* MOBILE SIDEBAR */}

      {mobileOpen && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
            backdrop-blur-sm
            lg:hidden
          "
        >

          <div className="w-[260px] h-full">

            <Sidebar />

          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 -z-10"
          />

        </div>

      )}

      {/* DESKTOP SIDEBAR */}

      <Sidebar />

      {/* CONTENT */}

      <div className="flex-1 flex flex-col min-w-0">

        {/* HEADER */}

        <header
          className="
            sticky
            top-0
            z-40
            h-[88px]
            px-4
            lg:px-10
            flex
            items-center
            justify-between
          "
        >

          {/* BG */}

          <div
            className="
              absolute
              inset-x-4
              lg:inset-x-8
              top-3
              bottom-0
              glass
              rounded-[28px]
            "
          />

          {/* LEFT */}

          <div className="relative z-10 flex items-center gap-4">

            {/* MOBILE MENU */}

            <button
              onClick={() => setMobileOpen(true)}
              className="
                lg:hidden
                w-11
                h-11
                rounded-2xl
                glass
                flex
                items-center
                justify-center
                text-white
              "
            >

              <Menu size={20} />

            </button>

            <div>

              <h1 className="text-white text-2xl font-semibold tracking-tight">
                Painel de Gestão
              </h1>

              <p className="text-zinc-500 text-sm mt-1">
                Controle inteligente da construtora
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative z-10 flex items-center gap-3">

            {/* SEARCH */}

            <div
              className="
                hidden
                md:flex
                items-center
                gap-3
                w-[260px]
                h-[52px]
                px-4
                rounded-2xl
                glass
              "
            >

              <Search
                size={18}
                className="text-zinc-500"
              />

              <input
                placeholder="Buscar..."
                className="
                  bg-transparent
                  outline-none
                  text-sm
                  text-white
                  placeholder:text-zinc-600
                  w-full
                "
              />

            </div>

            {/* NOTIFICATION */}

            <button
              className="
                w-[52px]
                h-[52px]
                rounded-2xl
                glass
                flex
                items-center
                justify-center
                text-zinc-400
                hover:text-white
                transition
              "
            >

              <Bell size={18} />

            </button>

            {/* PROFILE */}

            <div
              className="
                h-[52px]
                px-2
                pr-4
                rounded-2xl
                glass
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                  font-semibold
                  text-sm
                "
              >

                JP

              </div>

              <div className="hidden lg:block">

                <p className="text-white text-sm font-medium">
                  João Prange
                </p>

                <p className="text-zinc-500 text-xs">
                  Administrador
                </p>

              </div>

            </div>

          </div>

        </header>

        {/* MAIN */}

        <main
          className="
            flex-1
            px-4
            lg:px-10
            pb-10
            pt-6
            overflow-auto
          "
        >

          {children}

        </main>

      </div>

    </div>

  );
}
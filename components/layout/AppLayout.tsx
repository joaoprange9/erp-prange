"use client";

import Sidebar from "./Sidebar";
import { Bell, Search } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div className="flex min-h-screen bg-[#09090B] text-white overflow-hidden">

      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTEÚDO */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER PREMIUM */}

        <header className="h-[88px] border-b border-white/5 bg-black/20 backdrop-blur-2xl px-10 flex items-center justify-between sticky top-0 z-40">

          {/* ESQUERDA */}

          <div>

            <h1 className="text-2xl font-black tracking-tight">
              ERP PRANGE
            </h1>

            <p className="text-zinc-500 text-sm mt-1">
              Gestão Inteligente de Obras e Clientes
            </p>

          </div>

          {/* DIREITA */}

          <div className="flex items-center gap-5">

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                placeholder="Buscar clientes, obras..."
                className="
                  w-[340px]
                  h-[52px]
                  bg-zinc-900/80
                  border
                  border-zinc-800
                  rounded-2xl
                  pl-12
                  pr-5
                  text-sm
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  transition
                  focus:border-orange-500
                  focus:bg-zinc-900
                "
              />

            </div>

            {/* NOTIFICAÇÕES */}

            <button
              className="
                relative
                w-12
                h-12
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900/80
                flex
                items-center
                justify-center
                hover:border-orange-500
                transition
              "
            >

              <Bell size={20} />

              <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />

            </button>

            {/* PERFIL */}

            <div
              className="
                flex
                items-center
                gap-4
                bg-zinc-900/80
                border
                border-zinc-800
                rounded-2xl
                px-4
                py-2
              "
            >

              <div className="text-right">

                <h3 className="text-sm font-bold">
                  João Prange
                </h3>

                <p className="text-xs text-zinc-500">
                  Administrador
                </p>

              </div>

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-br
                  from-orange-500
                  to-orange-700
                  flex
                  items-center
                  justify-center
                  font-black
                  text-white
                  shadow-lg
                  shadow-orange-500/20
                "
              >
                JP
              </div>

            </div>

          </div>

        </header>

        {/* MAIN */}

        <main className="flex-1 overflow-y-auto p-8">

          <div className="max-w-[1700px] mx-auto">

            {children}

          </div>

        </main>

      </div>

    </div>

  );
}
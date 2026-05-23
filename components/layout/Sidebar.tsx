"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {

  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Factory,
  Wallet,
  Boxes,

} from "lucide-react";

const menus = [

  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },

  {
    title: "Clientes",
    href: "/clientes",
    icon: Users,
  },

  {
    title: "Obras",
    href: "/obras",
    icon: Building2,
  },

  {
    title: "Orçamentos",
    href: "/orcamentos",
    icon: FileText,
  },

  {
    title: "Produção",
    href: "/producao",
    icon: Factory,
  },

  {
    title: "Financeiro",
    href: "/financeiro",
    icon: Wallet,
  },

  {
    title: "Estoque",
    href: "/estoque",
    icon: Boxes,
  },

];

export default function Sidebar() {

  const pathname =
    usePathname();

  return (

    <aside
      className="
        w-[280px]
        min-h-screen
        bg-[#050505]
        border-r border-white/10
        p-5
        flex flex-col
      "
    >

      {/* LOGO */}

      <div className="mb-10">

        <p
          className="
            text-green-400
            uppercase
            tracking-[5px]
            text-xs
            font-black
          "
        >
          PRANGE ERP
        </p>

        <h1
          className="
            text-white
            text-3xl
            font-black
            mt-3
            leading-none
          "
        >
          PRANGE
          <br />
          BLOCO BR
        </h1>

        <p className="text-zinc-500 mt-4 text-sm leading-6">
          Sistema integrado industrial
          para fábrica e construtora.
        </p>

      </div>

      {/* MENU */}

      <div className="flex flex-col gap-2">

        {menus.map((item) => {

          const active =
            pathname === item.href;

          const Icon =
            item.icon;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                group
                flex items-center gap-4
                px-5 py-4
                rounded-3xl
                transition-all
                border

                ${active

                  ? `
                    bg-green-500
                    text-black
                    border-green-400
                  `

                  : `
                    text-zinc-400
                    border-transparent
                    hover:bg-white/[0.04]
                    hover:text-white
                  `

                }
              `}
            >

              <Icon size={20} />

              <span className="font-semibold">
                {item.title}
              </span>

            </Link>

          );

        })}

      </div>

      {/* FOOTER */}

      <div className="mt-auto">

        <div
          className="
            rounded-[32px]
            border border-green-500/20
            bg-green-500/10
            p-5
          "
        >

          <p className="text-green-400 text-xs font-black tracking-[4px] uppercase">
            Sistema Online
          </p>

          <h2 className="text-white text-2xl font-black mt-3">
            ERP Industrial
          </h2>

          <p className="text-zinc-400 mt-3 text-sm leading-6">
            Controle total da produção,
            estoque e orçamentos.
          </p>

        </div>

      </div>

    </aside>

  );

}
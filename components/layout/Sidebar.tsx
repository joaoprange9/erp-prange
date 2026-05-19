"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    title: "Dashboard",
    href: "/",
    icon: "◩",
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: "👥",
  },
  {
    title: "Obras",
    href: "/obras",
    icon: "🏗️",
  },
  {
    title: "Orçamentos",
    href: "/orcamentos",
    icon: "📋",
  },
  {
    title: "Produção",
    href: "/producao",
    icon: "🧱",
  },
  {
    title: "Financeiro",
    href: "/financeiro",
    icon: "💰",
  },
  {
    title: "Estoque",
    href: "/estoque",
    icon: "📦",
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside className="w-[280px] bg-[#09090b] border-r border-zinc-800 h-screen p-5 flex flex-col">

      {/* LOGO */}

      <div className="mb-10">

        <p className="text-orange-500 uppercase tracking-[5px] text-xs font-black">
          PRANGE ERP
        </p>

        <h1 className="text-white text-3xl font-black mt-2">
          PRANGEBLOCOBR
        </h1>

        <p className="text-zinc-500 mt-2 text-sm">
          Sistema Integrado Industrial
        </p>

      </div>

      {/* MENU */}

      <div className="flex flex-col gap-2">

        {menus.map((item) => {

          const active = pathname === item.href;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-4 px-5 py-4 rounded-2xl transition-all
                ${active
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }
              `}
            >

              <span className="text-xl">
                {item.icon}
              </span>

              <span className="font-semibold text-[15px]">
                {item.title}
              </span>

            </Link>

          );

        })}

      </div>

      {/* FOOTER */}

      <div className="mt-auto">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">

          <p className="text-zinc-500 text-xs uppercase tracking-[3px]">
            Sistema
          </p>

          <h2 className="text-white text-xl font-black mt-2">
            ERP Prange
          </h2>

          <p className="text-zinc-500 mt-2 text-sm leading-6">
            Gestão integrada da fábrica e construtora.
          </p>

        </div>

      </div>

    </aside>

  );
}
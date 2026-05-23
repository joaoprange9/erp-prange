"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardList,
  Wallet,
  Package,
  ChevronRight,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
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
    icon: ClipboardList,
  },
  {
    title: "Financeiro",
    href: "/financeiro",
    icon: Wallet,
  },
  {
    title: "Estoque",
    href: "/estoque",
    icon: Package,
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside
      className="
        hidden
        lg:flex
        w-[250px]
        min-h-screen
        flex-col
        px-5
        py-6
        border-r
        border-white/5
        bg-black/20
        backdrop-blur-3xl
      "
    >

      {/* TOPO */}

      <div className="mb-14 px-2">

        <div className="flex items-center gap-4">

          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-white
              text-black
              flex
              items-center
              justify-center
              font-black
              text-sm
            "
          >

            PB

          </div>

          <div>

            <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
              PRANGE ERP
            </p>

            <h1 className="text-white text-lg font-semibold mt-1 tracking-tight">
              PrangeBlocoBR
            </h1>

          </div>

        </div>

      </div>

      {/* MENU */}

      <div className="flex flex-col gap-1">

        {menus.map((item) => {

          const active =
            pathname === item.href;

          const Icon = item.icon;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                group
                flex
                items-center
                justify-between
                px-4
                h-[56px]
                rounded-2xl
                transition-all
                duration-300

                ${active
                  ? `
                    bg-white
                    text-black
                    shadow-2xl
                  `
                  : `
                    text-zinc-500
                    hover:bg-white/[0.04]
                    hover:text-white
                  `
                }
              `}
            >

              <div className="flex items-center gap-4">

                <Icon
                  size={18}
                  strokeWidth={2.2}
                />

                <span className="text-[15px] font-medium">
                  {item.title}
                </span>

              </div>

              <ChevronRight
                size={16}
                className={`
                  transition

                  ${active
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                  }
                `}
              />

            </Link>

          );

        })}

      </div>

      {/* FOOTER */}

      <div className="mt-auto">

        <div
          className="
            premium-card
            p-5
          "
        >

          <p className="text-zinc-500 text-xs uppercase tracking-[0.2em]">
            Sistema
          </p>

          <h2 className="text-white text-xl font-semibold mt-3 leading-tight">
            Gestão Premium de Obras
          </h2>

          <p className="text-zinc-500 text-sm mt-4 leading-7">
            Plataforma integrada para clientes,
            obras, financeiro e produção.
          </p>

        </div>

      </div>

    </aside>

  );
}
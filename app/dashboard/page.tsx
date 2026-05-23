"use client";

import AppLayout from "../../components/layout/AppLayout";

import {
  ArrowUpRight,
  Building2,
  DollarSign,
  Users,
  Wallet,
} from "lucide-react";

const cards = [
  {
    title: "Clientes",
    value: "48",
    growth: "+12%",
    icon: Users,
  },
  {
    title: "Obras Ativas",
    value: "16",
    growth: "+4%",
    icon: Building2,
  },
  {
    title: "Faturamento",
    value: "R$ 482k",
    growth: "+18%",
    icon: DollarSign,
  },
  {
    title: "Lucro Líquido",
    value: "R$ 128k",
    growth: "+7%",
    icon: Wallet,
  },
];

export default function DashboardPage() {

  return (

    <AppLayout>

      {/* HERO */}

      <section className="mb-12 relative">

        {/* GLOW */}

        <div
          className="
            absolute
            -top-20
            left-0
            w-[400px]
            h-[400px]
            rounded-full
            bg-orange-500/10
            blur-[140px]
            pointer-events-none
          "
        />

        <p className="text-zinc-500 uppercase tracking-[0.35em] text-xs mb-5 relative z-10">
          VISÃO GERAL
        </p>

        <h1
          className="
            title-premium
            text-5xl
            lg:text-7xl
            max-w-[950px]
            leading-[0.95]
            relative
            z-10
          "
        >

          Controle absoluto
          da sua construtora.

        </h1>

        <p
          className="
            subtitle-premium
            mt-8
            text-lg
            max-w-[720px]
            relative
            z-10
          "
        >

          Plataforma premium para gerenciamento
          de clientes, obras, financeiro e produção
          com experiência moderna e sofisticada.

        </p>

      </section>

      {/* METRICS */}

      <section
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
      >

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="
                premium-card
                p-7
                relative
                overflow-hidden
                hover:-translate-y-1
                transition-all
                duration-500
                min-h-[220px]
                flex
                flex-col
                justify-between
              "
            >

              {/* LIGHT */}

              <div
                className="
                  absolute
                  top-0
                  right-0
                  w-[180px]
                  h-[180px]
                  rounded-full
                  bg-gradient-to-br
                  from-orange-400/15
                  to-transparent
                  blur-3xl
                "
              />

              {/* TOP */}

              <div className="flex items-start justify-between relative z-10">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white
                    text-black
                    flex
                    items-center
                    justify-center
                    shadow-2xl
                  "
                >

                  <Icon size={24} />

                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-orange-300
                    font-medium
                  "
                >

                  {card.growth}

                  <ArrowUpRight size={16} />

                </div>

              </div>

              {/* CONTENT */}

              <div className="relative z-10">

                <p className="text-zinc-500 text-sm">
                  {card.title}
                </p>

                <h2
                  className="
                    text-5xl
                    font-semibold
                    tracking-tight
                    mt-3
                    text-white
                  "
                >

                  {card.value}

                </h2>

              </div>

            </div>

          );

        })}

      </section>

      {/* SECOND GRID */}

      <section
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-5
          mt-5
        "
      >

        {/* BIG CARD */}

        <div
          className="
            xl:col-span-2
            premium-card
            p-8
            min-h-[460px]
            relative
            overflow-hidden
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute
              top-0
              right-0
              w-[300px]
              h-[300px]
              rounded-full
              bg-blue-500/10
              blur-[120px]
            "
          />

          <div className="flex items-center justify-between relative z-10">

            <div>

              <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs">
                FINANCEIRO
              </p>

              <h2 className="text-4xl font-semibold mt-4 leading-tight">
                Crescimento da empresa
              </h2>

            </div>

            <button
              className="
                h-12
                px-6
                rounded-2xl
                bg-white
                text-black
                font-medium
                hover:scale-[1.02]
                transition
              "
            >

              Ver relatório

            </button>

          </div>

          {/* GRAPH */}

          <div
            className="
              mt-10
              h-[280px]
              rounded-[32px]
              border
              border-white/5
              bg-gradient-to-b
              from-white/[0.05]
              to-white/[0.02]
              relative
              overflow-hidden
            "
          >

            {/* GRID */}

            <div
              className="
                absolute
                inset-0
                opacity-20
                [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]
                [background-size:40px_40px]
              "
            />

            {/* FAKE CHART */}

            <div
              className="
                absolute
                bottom-10
                left-10
                right-10
                h-[120px]
                rounded-full
                border-t
                border-orange-400/40
                blur-[1px]
              "
            />

          </div>

        </div>

        {/* OBRAS */}

        <div
          className="
            premium-card
            p-8
            min-h-[460px]
            relative
            overflow-hidden
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute
              bottom-0
              left-0
              w-[250px]
              h-[250px]
              rounded-full
              bg-orange-500/10
              blur-[120px]
            "
          />

          <div className="relative z-10">

            <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs">
              OBRAS
            </p>

            <h2 className="text-4xl font-semibold mt-4 leading-tight">
              Projetos recentes
            </h2>

            <div className="mt-10 flex flex-col gap-4">

              {[
                {
                  nome: "Residencial Aurora",
                  status: "Em andamento",
                },
                {
                  nome: "Casa Praia Brava",
                  status: "Finalização",
                },
                {
                  nome: "Edifício Titanium",
                  status: "Estrutura",
                },
              ].map((obra) => (

                <div
                  key={obra.nome}
                  className="
                    h-[90px]
                    rounded-[28px]
                    border
                    border-white/5
                    bg-white/[0.03]
                    px-5
                    flex
                    items-center
                    justify-between
                    hover:bg-white/[0.05]
                    transition
                  "
                >

                  <div>

                    <p className="text-white font-medium text-[15px]">
                      {obra.nome}
                    </p>

                    <p className="text-zinc-500 text-sm mt-2">
                      {obra.status}
                    </p>

                  </div>

                  <div
                    className="
                      w-3
                      h-3
                      rounded-full
                      bg-orange-400
                      shadow-lg
                      shadow-orange-500/50
                    "
                  />

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </AppLayout>

  );
}
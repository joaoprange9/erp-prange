"use client";

import AppLayout from "../../components/layout/AppLayout";

import {

  Users,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Building2,
  Search,
  Plus,

} from "lucide-react";

import { useState } from "react";

export default function ClientesPage() {

  const [search, setSearch] =
    useState("");

  const clientes = [

    {
      nome: "Construtora Silva",
      telefone: "(47) 99999-1111",
      email: "contato@silva.com",
      cidade: "Balneário Camboriú",
      obras: 4,
    },

    {
      nome: "Almeida Engenharia",
      telefone: "(47) 98888-2222",
      email: "engenharia@almeida.com",
      cidade: "Itapema",
      obras: 2,
    },

    {
      nome: "Costa Obras",
      telefone: "(47) 97777-3333",
      email: "contato@costa.com",
      cidade: "Itajaí",
      obras: 7,
    },

    {
      nome: "MZ Construtora",
      telefone: "(47) 96666-4444",
      email: "mz@construtora.com",
      cidade: "Camboriú",
      obras: 3,
    },

  ];

  const clientesFiltrados =
    clientes.filter((cliente) =>

      cliente.nome
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  return (

    <AppLayout>

      <div className="space-y-6">

        {/* HERO */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[28px] md:rounded-[40px]
            border border-white/10
            bg-gradient-to-br
            from-green-500/10
            to-black
            p-5 md:p-8
          "
        >

          <div
            className="
              absolute
              top-0
              right-0
              w-[300px]
              h-[300px]
              rounded-full
              bg-green-500/10
              blur-[120px]
            "
          />

          <div className="relative z-10">

            <div
              className="
                flex flex-col
                xl:flex-row
                xl:items-center
                xl:justify-between
                gap-6
              "
            >

              <div>

                <p
                  className="
                    text-green-400
                    uppercase
                    tracking-[5px]
                    text-xs
                    font-black
                  "
                >
                  CLIENTES
                </p>

                <h1
                  className="
                    text-white
                    text-3xl md:text-6xl
                    font-black
                    mt-4
                    leading-none
                  "
                >
                  Gestão inteligente
                  <br />
                  de clientes.
                </h1>

                <p
                  className="
                    text-zinc-400
                    mt-5
                    text-base md:text-lg
                    max-w-[700px]
                  "
                >
                  Controle total dos clientes,
                  construtoras e parceiros
                  comerciais da operação.
                </p>

              </div>

              <button
                className="
                  h-14
                  px-6
                  rounded-2xl
                  bg-green-500
                  hover:bg-green-400
                  transition
                  text-black
                  font-black
                  flex items-center justify-center gap-3
                "
              >

                <Plus size={18} />

                Novo Cliente

              </button>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1 md:grid-cols-2 xl:grid-cols-4
            gap-4
          "
        >

          {[

            {
              title: "Clientes",
              value: "24",
              icon: Users,
            },

            {
              title: "Novos",
              value: "3",
              icon: UserPlus,
            },

            {
              title: "Obras",
              value: "16",
              icon: Building2,
            },

            {
              title: "Ativos",
              value: "100%",
              icon: Users,
            },

          ].map((item) => {

            const Icon =
              item.icon;

            return (

              <div
                key={item.title}
                className="
                  mobile-card
                  rounded-[28px]
                  border border-white/10
                  bg-white/[0.03]
                  p-5 md:p-6
                "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-zinc-500 text-sm">
                      {item.title}
                    </p>

                    <h2
                      className="
                        text-white
                        text-3xl md:text-5xl
                        font-black
                        mt-3
                      "
                    >
                      {item.value}
                    </h2>

                  </div>

                  <div
                    className="
                      w-14 h-14
                      rounded-2xl
                      bg-green-500/10
                      border border-green-500/20
                      flex items-center justify-center
                    "
                  >

                    <Icon
                      size={24}
                      className="text-green-400"
                    />

                  </div>

                </div>

              </div>

            );

          })}

        </div>

        {/* PESQUISA */}

        <div
          className="
            rounded-[28px]
            border border-white/10
            bg-white/[0.03]
            p-4 md:p-6
          "
        >

          <div
            className="
              flex items-center gap-3
              h-14
              rounded-2xl
              border border-white/10
              bg-black/30
              px-4
            "
          >

            <Search
              size={20}
              className="text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Buscar cliente..."
              className="
                flex-1
                bg-transparent
                outline-none
                text-white
              "
            />

          </div>

        </div>

        {/* CLIENTES */}

        <div className="space-y-4">

          {clientesFiltrados.map((cliente) => (

            <div
              key={cliente.nome}
              className="
                rounded-[28px]
                border border-white/10
                bg-white/[0.03]
                p-5 md:p-6
                hover:bg-white/[0.05]
                transition
              "
            >

              <div
                className="
                  flex flex-col
                  xl:flex-row
                  xl:items-center
                  xl:justify-between
                  gap-6
                "
              >

                {/* LEFT */}

                <div>

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-14 h-14
                        rounded-2xl
                        bg-green-500/10
                        border border-green-500/20
                        flex items-center justify-center
                      "
                    >

                      <Users
                        size={24}
                        className="text-green-400"
                      />

                    </div>

                    <div>

                      <h2
                        className="
                          text-white
                          text-xl md:text-2xl
                          font-black
                        "
                      >
                        {cliente.nome}
                      </h2>

                      <p className="text-zinc-500 text-sm mt-1">
                        Cliente ativo
                      </p>

                    </div>

                  </div>

                </div>

                {/* RIGHT */}

                <div
                  className="
                    grid
                    grid-cols-1 md:grid-cols-3
                    gap-4
                    w-full
                    xl:w-auto
                  "
                >

                  <div
                    className="
                      rounded-2xl
                      bg-black/30
                      border border-white/10
                      px-4 py-3
                    "
                  >

                    <div className="flex items-center gap-2">

                      <Phone
                        size={16}
                        className="text-green-400"
                      />

                      <p className="text-zinc-500 text-xs">
                        Telefone
                      </p>

                    </div>

                    <p className="text-white mt-2 font-semibold">
                      {cliente.telefone}
                    </p>

                  </div>

                  <div
                    className="
                      rounded-2xl
                      bg-black/30
                      border border-white/10
                      px-4 py-3
                    "
                  >

                    <div className="flex items-center gap-2">

                      <Mail
                        size={16}
                        className="text-green-400"
                      />

                      <p className="text-zinc-500 text-xs">
                        E-mail
                      </p>

                    </div>

                    <p className="text-white mt-2 font-semibold break-all">
                      {cliente.email}
                    </p>

                  </div>

                  <div
                    className="
                      rounded-2xl
                      bg-black/30
                      border border-white/10
                      px-4 py-3
                    "
                  >

                    <div className="flex items-center gap-2">

                      <MapPin
                        size={16}
                        className="text-green-400"
                      />

                      <p className="text-zinc-500 text-xs">
                        Cidade
                      </p>

                    </div>

                    <p className="text-white mt-2 font-semibold">
                      {cliente.cidade}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </AppLayout>

  );

}
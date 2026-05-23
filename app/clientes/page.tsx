"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import AppLayout from "../../components/layout/AppLayout";

import { supabase } from "../../lib/supabase";

import {

  Plus,
  Phone,
  MapPin,
  Users,
  X,

} from "lucide-react";

export default function ClientesPage() {

  const [clientes, setClientes] =
    useState<any[]>([]);

  const [open, setOpen] =
    useState(false);

  const [nome, setNome] =
    useState("");

  const [telefone, setTelefone] =
    useState("");

  const [cidade, setCidade] =
    useState("");

  // ======================================================
  // CARREGAR CLIENTES
  // ======================================================

  useEffect(() => {

    carregarClientes();

  }, []);

  async function carregarClientes() {

    const { data, error } =
      await supabase
        .from("clientes")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (error) {

      console.log(error);

      return;

    }

    setClientes(data || []);

  }

  // ======================================================
  // ADICIONAR CLIENTE
  // ======================================================

  async function adicionarCliente() {

    if (!nome) return;

    const { error } =
      await supabase
        .from("clientes")
        .insert([

          {
            nome,
            telefone,
            cidade,
            status: "Ativo",
          },

        ]);

    if (error) {

      console.log(error);

      return;

    }

    await carregarClientes();

    setNome("");
    setTelefone("");
    setCidade("");

    setOpen(false);

  }

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
            via-black
            to-black
            p-5 md:p-8
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute
              right-0
              top-0
              w-[320px]
              h-[320px]
              rounded-full
              bg-green-500/10
              blur-[120px]
            "
          />

          <div className="relative z-10">

            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
              "
            >

              {/* TEXTOS */}

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
                    text-3xl md:text-6xl
                    font-black
                    text-white
                    mt-3
                    leading-none
                  "
                >
                  Gestão de
                  <br />
                  Clientes
                </h1>

                <p
                  className="
                    text-zinc-400
                    mt-4
                    text-sm md:text-base
                    max-w-[600px]
                  "
                >
                  Controle completo dos clientes,
                  construtoras e parceiros da operação.
                </p>

              </div>

              {/* BOTÃO */}

              <button
                onClick={() => setOpen(true)}
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
                  shadow-lg shadow-green-500/20
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
            grid-cols-1 md:grid-cols-3
            gap-4
          "
        >

          <div
            className="
              rounded-[28px]
              border border-white/10
              bg-white/[0.03]
              p-5 md:p-6
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  Clientes
                </p>

                <h2
                  className="
                    text-4xl md:text-5xl
                    text-white
                    font-black
                    mt-3
                  "
                >
                  {clientes.length}
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

                <Users
                  size={24}
                  className="text-green-400"
                />

              </div>

            </div>

          </div>

          <div
            className="
              rounded-[28px]
              border border-white/10
              bg-white/[0.03]
              p-5 md:p-6
            "
          >

            <p className="text-zinc-500 text-sm">
              Clientes Ativos
            </p>

            <h2
              className="
                text-4xl md:text-5xl
                text-white
                font-black
                mt-3
              "
            >
              {clientes.length}
            </h2>

            <p className="text-green-400 mt-3 text-sm font-semibold">
              Todos ativos
            </p>

          </div>

          <div
            className="
              rounded-[28px]
              border border-white/10
              bg-gradient-to-br
              from-green-500/15
              to-black
              p-5 md:p-6
            "
          >

            <p className="text-green-400 text-sm font-bold uppercase tracking-[3px]">
              Sistema Online
            </p>

            <h2
              className="
                text-3xl md:text-4xl
                text-white
                font-black
                mt-4
              "
            >
              ERP Industrial
            </h2>

            <p className="text-zinc-400 mt-3 text-sm">
              Gestão integrada de clientes e obras.
            </p>

          </div>

        </div>

        {/* CLIENTES */}

        {clientes.length === 0 ? (

          <div
            className="
              rounded-[32px]
              border border-white/10
              bg-white/[0.03]
              p-10 md:p-14
              text-center
            "
          >

            <h2
              className="
                text-3xl md:text-4xl
                font-black
                text-white
              "
            >
              Nenhum cliente cadastrado
            </h2>

            <p className="text-zinc-500 mt-4">
              Cadastre seu primeiro cliente.
            </p>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-1 md:grid-cols-2 xl:grid-cols-3
              gap-5
            "
          >

            {clientes.map((cliente) => (

              <Link
                href={`/clientes/${cliente.id}`}
                key={cliente.id}
                className="
                  group
                  rounded-[30px]
                  border border-white/10
                  bg-white/[0.03]
                  p-5 md:p-6
                  hover:border-green-500/40
                  hover:bg-green-500/[0.04]
                  transition-all
                  duration-300
                  block
                "
              >

                {/* TOP */}

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p
                      className="
                        text-green-400
                        text-xs
                        font-black
                        uppercase
                        tracking-[4px]
                      "
                    >
                      Cliente
                    </p>

                    <h2
                      className="
                        text-2xl md:text-3xl
                        font-black
                        text-white
                        mt-3
                        leading-tight
                      "
                    >
                      {cliente.nome}
                    </h2>

                  </div>

                  <div
                    className="
                      px-4 py-2
                      rounded-2xl
                      bg-green-500/10
                      border border-green-500/20
                      text-green-400
                      text-xs
                      font-bold
                      whitespace-nowrap
                    "
                  >
                    {cliente.status}
                  </div>

                </div>

                {/* INFO */}

                <div className="mt-8 space-y-4">

                  <div
                    className="
                      flex items-center justify-between
                      gap-3
                      rounded-2xl
                      bg-black/30
                      border border-white/5
                      px-4 py-3
                    "
                  >

                    <div className="flex items-center gap-2">

                      <Phone
                        size={15}
                        className="text-green-400"
                      />

                      <p className="text-zinc-500 text-sm">
                        Telefone
                      </p>

                    </div>

                    <p
                      className="
                        text-white
                        font-semibold
                        text-sm
                      "
                    >
                      {cliente.telefone || "-"}
                    </p>

                  </div>

                  <div
                    className="
                      flex items-center justify-between
                      gap-3
                      rounded-2xl
                      bg-black/30
                      border border-white/5
                      px-4 py-3
                    "
                  >

                    <div className="flex items-center gap-2">

                      <MapPin
                        size={15}
                        className="text-green-400"
                      />

                      <p className="text-zinc-500 text-sm">
                        Cidade
                      </p>

                    </div>

                    <p
                      className="
                        text-white
                        font-semibold
                        text-sm
                      "
                    >
                      {cliente.cidade || "-"}
                    </p>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

        {/* MODAL */}

        {open && (

          <div
            className="
              fixed inset-0
              z-50
              bg-black/70
              backdrop-blur-sm
              flex items-center justify-center
              p-4
            "
          >

            <div
              className="
                w-full max-w-[520px]
                rounded-[32px]
                border border-white/10
                bg-[#0a0a0a]
                p-6 md:p-7
              "
            >

              {/* HEADER */}

              <div className="flex items-center justify-between mb-8">

                <div>

                  <p
                    className="
                      text-green-400
                      uppercase
                      tracking-[4px]
                      text-xs
                      font-black
                    "
                  >
                    NOVO CLIENTE
                  </p>

                  <h2
                    className="
                      text-2xl md:text-4xl
                      font-black
                      text-white
                      mt-3
                    "
                  >
                    Cadastrar Cliente
                  </h2>

                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="
                    w-11 h-11
                    rounded-2xl
                    bg-white/5
                    border border-white/10
                    flex items-center justify-center
                    text-zinc-400
                    hover:text-white
                    transition
                  "
                >

                  <X size={18} />

                </button>

              </div>

              {/* INPUTS */}

              <div className="space-y-5">

                <div>

                  <label className="text-zinc-500 text-sm">
                    Nome
                  </label>

                  <input
                    value={nome}
                    onChange={(e) =>
                      setNome(e.target.value)
                    }
                    className="
                      w-full
                      mt-2
                      h-14
                      rounded-2xl
                      bg-black/40
                      border border-white/10
                      px-5
                      text-white
                      outline-none
                    "
                  />

                </div>

                <div>

                  <label className="text-zinc-500 text-sm">
                    Telefone
                  </label>

                  <input
                    value={telefone}
                    onChange={(e) =>
                      setTelefone(e.target.value)
                    }
                    className="
                      w-full
                      mt-2
                      h-14
                      rounded-2xl
                      bg-black/40
                      border border-white/10
                      px-5
                      text-white
                      outline-none
                    "
                  />

                </div>

                <div>

                  <label className="text-zinc-500 text-sm">
                    Cidade
                  </label>

                  <input
                    value={cidade}
                    onChange={(e) =>
                      setCidade(e.target.value)
                    }
                    className="
                      w-full
                      mt-2
                      h-14
                      rounded-2xl
                      bg-black/40
                      border border-white/10
                      px-5
                      text-white
                      outline-none
                    "
                  />

                </div>

              </div>

              {/* BOTÕES */}

              <div className="flex gap-3 mt-8">

                <button
                  onClick={() => setOpen(false)}
                  className="
                    flex-1
                    h-14
                    rounded-2xl
                    bg-white/5
                    border border-white/10
                    text-white
                    font-bold
                  "
                >
                  Cancelar
                </button>

                <button
                  onClick={adicionarCliente}
                  className="
                    flex-1
                    h-14
                    rounded-2xl
                    bg-green-500
                    hover:bg-green-400
                    transition
                    text-black
                    font-black
                  "
                >
                  Salvar Cliente
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </AppLayout>

  );

}
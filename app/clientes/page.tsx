"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppLayout from "../../components/layout/AppLayout";
import { supabase } from "../../lib/supabase";

export default function ClientesPage() {

  const [clientes, setClientes] = useState<any[]>([]);

  const [open, setOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");

  // CARREGAR CLIENTES

  useEffect(() => {

    carregarClientes();

  }, []);

  async function carregarClientes() {

    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .order("id", { ascending: false });

    if (error) {

  alert(JSON.stringify(error));

  console.log(error);

  return;
}

    setClientes(data || []);
  }

  // ADICIONAR CLIENTE

  async function adicionarCliente() {

    if (!nome) return;

    const { error } = await supabase
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

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <p className="text-orange-500 uppercase tracking-[5px] text-xs font-black">
            CLIENTES
          </p>

          <h1 className="text-5xl font-black text-white mt-2">
            Gestão de Clientes
          </h1>

          <p className="text-zinc-500 mt-3">
            Controle completo de clientes e obras.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-orange-600 hover:bg-orange-500 transition px-6 py-4 rounded-2xl text-white font-bold"
        >
          + Novo Cliente
        </button>

      </div>

      {/* CLIENTES */}

      {clientes.length === 0 ? (

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center">

          <h2 className="text-3xl font-black text-white">
            Nenhum cliente cadastrado
          </h2>

          <p className="text-zinc-500 mt-3">
            Crie seu primeiro cliente.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-3 gap-5">

          {clientes.map((cliente) => (

            <Link
              href={`/clientes/${cliente.id}`}
              key={cliente.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500 transition block"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-orange-500 text-sm font-bold uppercase tracking-[3px]">
                    Cliente
                  </p>

                  <h2 className="text-3xl font-black text-white mt-3">
                    {cliente.nome}
                  </h2>

                </div>

                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-2xl text-sm font-bold">
                  {cliente.status}
                </div>

              </div>

              <div className="mt-8 space-y-3">

                <div className="flex justify-between">

                  <p className="text-zinc-500">
                    Telefone
                  </p>

                  <p className="text-white font-semibold">
                    {cliente.telefone || "-"}
                  </p>

                </div>

                <div className="flex justify-between">

                  <p className="text-zinc-500">
                    Cidade
                  </p>

                  <p className="text-white font-semibold">
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

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="w-[500px] bg-zinc-950 border border-zinc-800 rounded-3xl p-7">

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-orange-500 uppercase tracking-[4px] text-xs font-black">
                  NOVO CLIENTE
                </p>

                <h2 className="text-3xl font-black text-white mt-2">
                  Cadastrar Cliente
                </h2>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>

            </div>

            <div className="space-y-4">

              <div>

                <label className="text-zinc-500 text-sm">
                  Nome
                </label>

                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white outline-none"
                />

              </div>

              <div>

                <label className="text-zinc-500 text-sm">
                  Telefone
                </label>

                <input
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white outline-none"
                />

              </div>

              <div>

                <label className="text-zinc-500 text-sm">
                  Cidade
                </label>

                <input
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white outline-none"
                />

              </div>

            </div>

            <div className="flex gap-3 mt-8">

              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl py-4 text-white font-bold"
              >
                Cancelar
              </button>

              <button
                onClick={adicionarCliente}
                className="flex-1 bg-orange-600 hover:bg-orange-500 transition rounded-2xl py-4 text-white font-bold"
              >
                Salvar Cliente
              </button>

            </div>

          </div>

        </div>

      )}

    </AppLayout>

  );
}
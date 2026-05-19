"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AppLayout from "../../../components/layout/AppLayout";
import { supabase } from "../../../lib/supabase";

export default function ClienteDetalhesPage() {

  const params = useParams();

  const clienteId = Number(params.id);

  const [cliente, setCliente] = useState<any>(null);

  const [obras, setObras] = useState<any[]>([]);

  const [open, setOpen] = useState(false);

  const [nomeObra, setNomeObra] = useState("");
  const [valorObra, setValorObra] = useState("");

  // CARREGAR DADOS

  useEffect(() => {

    if (!clienteId) return;

    carregarCliente();
    carregarObras();

  }, [clienteId]);

  // CLIENTE

  async function carregarCliente() {

    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("id", clienteId)
      .single();

    if (error) {

      console.log(error);

      return;
    }

    setCliente(data);
  }

  // OBRAS

  async function carregarObras() {

    const { data, error } = await supabase
      .from("obras")
      .select("*")
      .eq("cliente_id", clienteId)
      .order("id", { ascending: false });

    if (error) {

      console.log(error);

      return;
    }

    setObras(data || []);
  }

  // CRIAR OBRA

  async function criarObra() {

    if (!nomeObra) return;

    const { error } = await supabase
      .from("obras")
      .insert([
        {
          cliente_id: clienteId,
          nome: nomeObra,
          valor: valorObra || "R$ 0",
          status: "Em andamento",
        },
      ]);

    if (error) {

      alert(JSON.stringify(error));

      console.log(error);

      return;
    }

    await carregarObras();

    setNomeObra("");
    setValorObra("");

    setOpen(false);
  }

  if (!cliente) {

    return (

      <AppLayout>

        <div className="text-white text-2xl font-bold">
          Carregando cliente...
        </div>

      </AppLayout>

    );

  }

  return (

    <AppLayout>

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <Link
            href="/clientes"
            className="text-orange-500 hover:text-orange-400 text-sm font-bold uppercase tracking-[4px]"
          >
            ← Voltar para clientes
          </Link>

          <p className="text-orange-500 uppercase tracking-[5px] text-xs font-black mt-5">
            CLIENTE
          </p>

          <h1 className="text-5xl font-black text-white mt-2">
            {cliente.nome}
          </h1>

          <p className="text-zinc-500 mt-3">
            Gestão completa de obras, gastos e orçamentos.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-orange-600 hover:bg-orange-500 transition px-6 py-4 rounded-2xl text-white font-bold"
        >
          + Nova Obra
        </button>

      </div>

      {/* KPIS */}

      <div className="grid grid-cols-4 gap-5 mb-10">

        {[
          {
            title: "Obras",
            value: obras.length,
          },
          {
            title: "Faturamento",
            value: "R$ 284k",
          },
          {
            title: "Em aberto",
            value: "R$ 41k",
          },
          {
            title: "Lucro",
            value: "R$ 89k",
          },
        ].map((item) => (

          <div
            key={item.title}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
          >

            <p className="text-zinc-500">
              {item.title}
            </p>

            <h2 className="text-4xl font-black text-white mt-3">
              {item.value}
            </h2>

          </div>

        ))}

      </div>

      {/* OBRAS */}

      {obras.length === 0 ? (

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

          <h2 className="text-3xl font-black text-white">
            Nenhuma obra cadastrada
          </h2>

          <p className="text-zinc-500 mt-3">
            Crie a primeira obra desse cliente.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-5">

          {obras.map((obra) => (

            <Link
              href={`/clientes/${clienteId}/obras/${obra.id}`}
              key={obra.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500 transition block"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-3xl font-black text-white">
                    {obra.nome}
                  </h2>

                  <p className="text-orange-400 mt-2 font-semibold">
                    {obra.status}
                  </p>

                </div>

                <h3 className="text-3xl font-black text-green-400">
                  {obra.valor}
                </h3>

              </div>

              {/* MÓDULOS */}

              <div className="grid grid-cols-4 gap-3 mt-8">

                {[
                  "Orçamentos",
                  "Gastos",
                  "Materiais",
                  "Fotos",
                ].map((item) => (

                  <div
                    key={item}
                    className="bg-black/40 border border-zinc-800 rounded-2xl py-4 text-white text-center hover:border-orange-500 transition"
                  >
                    {item}
                  </div>

                ))}

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
                  NOVA OBRA
                </p>

                <h2 className="text-3xl font-black text-white mt-2">
                  Cadastrar Obra
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
                  Nome da obra
                </label>

                <input
                  value={nomeObra}
                  onChange={(e) => setNomeObra(e.target.value)}
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white outline-none"
                />

              </div>

              <div>

                <label className="text-zinc-500 text-sm">
                  Valor da obra
                </label>

                <input
                  value={valorObra}
                  onChange={(e) => setValorObra(e.target.value)}
                  placeholder="R$ 185.000"
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
                onClick={criarObra}
                className="flex-1 bg-orange-600 hover:bg-orange-500 transition rounded-2xl py-4 text-white font-bold"
              >
                Salvar Obra
              </button>

            </div>

          </div>

        </div>

      )}

    </AppLayout>

  );
}
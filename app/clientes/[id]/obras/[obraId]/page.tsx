"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AppLayout from "../../../../../components/layout/AppLayout";
import { supabase } from "../../../../../lib/supabase";

export default function ObraPage() {

  const params = useParams();

  const obraId = Number(params.obraId);

  const [obra, setObra] = useState<any>(null);

  const [gastos, setGastos] = useState<any[]>([]);

  const [open, setOpen] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  // CARREGAR

  useEffect(() => {

    if (!obraId) return;

    carregarObra();
    carregarGastos();

  }, [obraId]);

  // OBRA

  async function carregarObra() {

    const { data, error } = await supabase
      .from("obras")
      .select("*")
      .eq("id", obraId)
      .single();

    if (error) {

      console.log(error);

      return;
    }

    setObra(data);
  }

  // GASTOS

  async function carregarGastos() {

    const { data, error } = await supabase
      .from("gastos")
      .select("*")
      .eq("obra_id", obraId)
      .order("id", { ascending: false });

    if (error) {

      console.log(error);

      return;
    }

    setGastos(data || []);
  }

  // NOVO GASTO

  async function adicionarGasto() {

    if (!descricao || !valor) return;

    const { error } = await supabase
      .from("gastos")
      .insert([
        {
          obra_id: obraId,
          descricao,
          valor: Number(valor),
        },
      ]);

    if (error) {

      alert(JSON.stringify(error));

      return;
    }

    await carregarGastos();

    setDescricao("");
    setValor("");

    setOpen(false);
  }

  // TOTAL GASTOS

  const totalGastos = gastos.reduce(
    (acc, item) => acc + Number(item.valor),
    0
  );

  if (!obra) {

    return (

      <AppLayout>

        <div className="text-white text-2xl font-bold">
          Carregando obra...
        </div>

      </AppLayout>

    );

  }

  return (

    <AppLayout>

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <p className="text-orange-500 uppercase tracking-[5px] text-xs font-black">
            OBRA
          </p>

          <h1 className="text-5xl font-black text-white mt-2">
            {obra.nome}
          </h1>

          <p className="text-zinc-500 mt-3">
            Gestão financeira e operacional da obra.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-orange-600 hover:bg-orange-500 transition px-6 py-4 rounded-2xl text-white font-bold"
        >
          + Novo Gasto
        </button>

      </div>

      {/* KPIS */}

      <div className="grid grid-cols-4 gap-5 mb-10">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-500">
            Valor da Obra
          </p>

          <h2 className="text-4xl font-black text-green-400 mt-3">
            {obra.valor}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-500">
            Gastos
          </p>

          <h2 className="text-4xl font-black text-red-400 mt-3">
            R$ {totalGastos.toLocaleString("pt-BR")}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-500">
            Status
          </p>

          <h2 className="text-4xl font-black text-orange-400 mt-3">
            {obra.status}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-500">
            Lucro Estimado
          </p>

          <h2 className="text-4xl font-black text-blue-400 mt-3">
            --
          </h2>

        </div>

      </div>

      {/* GASTOS */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

        <div className="flex items-center justify-between mb-6">

          <div>

            <p className="text-orange-500 uppercase tracking-[4px] text-xs font-black">
              FINANCEIRO
            </p>

            <h2 className="text-3xl font-black text-white mt-2">
              Gastos da Obra
            </h2>

          </div>

        </div>

        {gastos.length === 0 ? (

          <div className="text-center py-12">

            <h3 className="text-2xl font-black text-white">
              Nenhum gasto lançado
            </h3>

            <p className="text-zinc-500 mt-3">
              Adicione o primeiro gasto dessa obra.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {gastos.map((gasto) => (

              <div
                key={gasto.id}
                className="bg-black/30 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between"
              >

                <div>

                  <h3 className="text-white text-xl font-bold">
                    {gasto.descricao}
                  </h3>

                  <p className="text-zinc-500 mt-1">
                    Gasto operacional
                  </p>

                </div>

                <h2 className="text-red-400 text-3xl font-black">
                  R$ {Number(gasto.valor).toLocaleString("pt-BR")}
                </h2>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* MODAL */}

      {open && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="w-[500px] bg-zinc-950 border border-zinc-800 rounded-3xl p-7">

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-orange-500 uppercase tracking-[4px] text-xs font-black">
                  NOVO GASTO
                </p>

                <h2 className="text-3xl font-black text-white mt-2">
                  Adicionar Gasto
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
                  Descrição
                </label>

                <input
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white outline-none"
                />

              </div>

              <div>

                <label className="text-zinc-500 text-sm">
                  Valor
                </label>

                <input
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="1500"
                  type="number"
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
                onClick={adicionarGasto}
                className="flex-1 bg-orange-600 hover:bg-orange-500 transition rounded-2xl py-4 text-white font-bold"
              >
                Salvar Gasto
              </button>

            </div>

          </div>

        </div>

      )}

    </AppLayout>

  );
}
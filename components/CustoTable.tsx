"use client";

import { useMemo, useState } from "react";

export default function CustoTable() {
  const [producao, setProducao] = useState(200);

  const [custosFixos, setCustosFixos] = useState([
    { nome: "Aluguel", valor: 12500 },
    { nome: "Mão de obra 1", valor: 3740 },
    { nome: "Mão de obra 2", valor: 3000 },
    { nome: "Água", valor: 250 },
    { nome: "Energia", valor: 350 },
  ]);

  const [materiais, setMateriais] = useState([
    { nome: "Tela", valor: 12.8 },
    { nome: "EPS", valor: 17.24 },
    { nome: "Areia", valor: 2.8 },
    { nome: "Cimento", valor: 6.9 },
    { nome: "Imposto", valor: 7.56 },
    { nome: "Desmoldante", valor: 0.03 },
    { nome: "Superplas", valor: 0.48 },
    { nome: "Flex", valor: 0.9 },
    { nome: "Imperflex", valor: 0.3 },
  ]);

  const totalFixos = useMemo(() => {
    return custosFixos.reduce((acc, item) => acc + item.valor, 0);
  }, [custosFixos]);

  const custoFixoUnitario = useMemo(() => {
    return totalFixos / producao;
  }, [totalFixos, producao]);

  const totalMaterial = useMemo(() => {
    return materiais.reduce((acc, item) => acc + item.valor, 0);
  }, [materiais]);

  const totalBloco = useMemo(() => {
    return custoFixoUnitario + totalMaterial;
  }, [custoFixoUnitario, totalMaterial]);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4 overflow-hidden">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-2xl p-4 shadow-xl flex items-center justify-between">

        <div>
          <p className="text-orange-100 text-[11px] uppercase tracking-[3px]">
            PRANGEBLOCOBR
          </p>

          <h1 className="text-3xl font-black text-white mt-1">
            Bloco 13 cm
          </h1>

          <p className="text-orange-100 text-sm mt-1">
            Sistema de custo industrial
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 min-w-[220px]">

          <p className="text-orange-100 text-xs mb-2">
            Produção mensal
          </p>

          <input
            type="number"
            value={producao}
            onChange={(e) => setProducao(Number(e.target.value))}
            className="w-full bg-black/20 rounded-xl px-4 py-2 text-2xl font-bold text-white outline-none"
          />

        </div>

      </div>

      {/* CONTEÚDO */}

      <div className="grid grid-cols-3 gap-4 flex-1 overflow-hidden">

        {/* FIXOS */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col overflow-hidden">

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-zinc-500 text-[10px] uppercase tracking-[3px]">
                Custos
              </p>

              <h2 className="text-lg font-bold text-white">
                Custos Fixos
              </h2>
            </div>

            <div className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-lg text-sm font-bold">
              R$ {totalFixos.toFixed(2)}
            </div>

          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-2">

            {custosFixos.map((item, index) => (

              <div
                key={index}
                className="bg-zinc-800/70 border border-zinc-700 rounded-xl p-3 flex items-center justify-between gap-3"
              >

                <div>
                  <p className="text-white text-sm font-semibold">
                    {item.nome}
                  </p>

                  <p className="text-zinc-500 text-[11px]">
                    custo mensal
                  </p>
                </div>

                <input
                  type="number"
                  value={item.valor}
                  onChange={(e) => {
                    const novos = [...custosFixos];
                    novos[index].valor = Number(e.target.value);
                    setCustosFixos(novos);
                  }}
                  className="w-28 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-right text-white font-bold outline-none"
                />

              </div>

            ))}

          </div>

          <div className="mt-3 bg-black/30 border border-zinc-800 rounded-xl p-3">

            <p className="text-zinc-400 text-xs mb-1">
              Custo fixo por bloco
            </p>

            <h3 className="text-2xl font-black text-orange-400">
              R$ {custoFixoUnitario.toFixed(2)}
            </h3>

          </div>

        </div>

        {/* MATERIAIS */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col overflow-hidden">

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-zinc-500 text-[10px] uppercase tracking-[3px]">
                Materiais
              </p>

              <h2 className="text-lg font-bold text-white">
                Custo Material
              </h2>
            </div>

            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm font-bold">
              R$ {totalMaterial.toFixed(2)}
            </div>

          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-2">

            {materiais.map((item, index) => (

              <div
                key={index}
                className="bg-zinc-800/70 border border-zinc-700 rounded-xl p-3 flex items-center justify-between gap-3"
              >

                <div>
                  <p className="text-white text-sm font-semibold">
                    {item.nome}
                  </p>

                  <p className="text-zinc-500 text-[11px]">
                    custo unitário
                  </p>
                </div>

                <input
                  type="number"
                  value={item.valor}
                  onChange={(e) => {
                    const novos = [...materiais];
                    novos[index].valor = Number(e.target.value);
                    setMateriais(novos);
                  }}
                  className="w-28 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-right text-white font-bold outline-none"
                />

              </div>

            ))}

          </div>

        </div>

        {/* RESULTADO */}

        <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-5 flex flex-col justify-between shadow-xl">

          <div>

            <p className="text-green-100 text-[10px] uppercase tracking-[3px]">
              Resultado Final
            </p>

            <h2 className="text-3xl font-black text-white mt-2">
              Custo Real
            </h2>

            <p className="text-green-100 text-sm mt-1">
              Bloco estrutural 13 cm
            </p>

          </div>

          <div className="space-y-3 my-5">

            <div className="bg-white/10 border border-white/10 rounded-xl p-4">

              <p className="text-green-100 text-xs">
                Material
              </p>

              <h3 className="text-2xl font-black text-white mt-1">
                R$ {totalMaterial.toFixed(2)}
              </h3>

            </div>

            <div className="bg-white/10 border border-white/10 rounded-xl p-4">

              <p className="text-green-100 text-xs">
                Custos Fixos
              </p>

              <h3 className="text-2xl font-black text-white mt-1">
                R$ {custoFixoUnitario.toFixed(2)}
              </h3>

            </div>

          </div>

          <div className="bg-black/20 border border-white/10 rounded-2xl p-5 text-center">

            <p className="text-green-100 text-xs uppercase tracking-[3px]">
              Total Final
            </p>

            <h1 className="text-5xl font-black text-white mt-3">
              R$ {totalBloco.toFixed(2)}
            </h1>

          </div>

        </div>

      </div>

    </div>
  );
}
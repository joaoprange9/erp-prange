"use client";

import { useEffect, useRef, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";

import SignatureCanvas from "react-signature-canvas";

import { supabase } from "../../lib/supabase";

import {

  Truck,
  Package,
  Plus,
  Clock3,

} from "lucide-react";

export default function ExpedicaoPage() {

  // ======================================================
  // SIGNATURE
  // ======================================================

  const signRef =
    useRef<SignatureCanvas | null>(null);

  // ======================================================
  // STATES
  // ======================================================

  const [expedicoes, setExpedicoes] =
    useState<any[]>([]);

  const [open, setOpen] =
    useState(false);

  const [cliente, setCliente] =
    useState("");

  const [cpf, setCpf] =
    useState("");

  const [bloco, setBloco] =
    useState("BR 13");

  const [quantidade, setQuantidade] =
    useState("");

  const [motorista, setMotorista] =
    useState("");

  const [placa, setPlaca] =
    useState("");

  // ======================================================
  // LOAD
  // ======================================================

  useEffect(() => {

    carregar();

  }, []);

  async function carregar() {

    const { data, error } =
      await supabase
        .from("expedicoes")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (error) {

      console.log(error);

      return;

    }

    setExpedicoes(data || []);

  }

  // ======================================================
  // SALVAR
  // ======================================================

  async function salvar() {

    if (
      !cliente ||
      !cpf ||
      !quantidade
    ) {

      alert("Preencha os campos");

      return;

    }

    // ==========================================
    // ASSINATURA
    // ==========================================

    const assinatura =
      signRef.current
        ?.getTrimmedCanvas()
        .toDataURL("image/png");

    // ==========================================
    // INSERT
    // ==========================================

    const { error } =
      await supabase
        .from("expedicoes")
        .insert([

          {

            cliente,
            cpf,

            bloco,

            quantidade:
              Number(quantidade),

            motorista,
            placa,

            assinatura,

          },

        ]);

    if (error) {

      console.log(error);

      alert("Erro ao salvar");

      return;

    }

    // ==========================================
    // BAIXAR ESTOQUE
    // ==========================================

    const campo =
      bloco === "BR 13"
        ? "bloco13"
        : bloco === "BR 15"
        ? "bloco15"
        : "bloco20";

    const { data: estoque } =
      await supabase
        .from("estoque")
        .select("*")
        .limit(1)
        .single();

    if (estoque) {

      await supabase
        .from("estoque")
        .update({

          [campo]:
            Number(
              estoque[campo]
            ) -
            Number(quantidade),

        })
        .eq("id", estoque.id);

    }

    // ==========================================
    // RESET
    // ==========================================

    setCliente("");

    setCpf("");

    setQuantidade("");

    setMotorista("");

    setPlaca("");

    setBloco("BR 13");

    signRef.current?.clear();

    setOpen(false);

    carregar();

  }

  // ======================================================
  // TOTAL
  // ======================================================

  const totalHoje =
    expedicoes.reduce(

      (acc, item) =>
        acc +
        Number(item.quantidade),

      0

    );

  // ======================================================
  // RETURN
  // ======================================================

  return (

    <AppLayout>

      <div className="space-y-6">

        {/* HERO */}

        <div
          className="
            rounded-[32px]
            border border-white/10
            bg-gradient-to-br
            from-cyan-500/10
            to-black
            p-6 md:p-8
            overflow-hidden
            relative
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
              bg-cyan-500/10
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

              <div>

                <p
                  className="
                    text-cyan-400
                    uppercase
                    tracking-[5px]
                    text-xs
                    font-black
                  "
                >
                  EXPEDIÇÃO
                </p>

                <h1
                  className="
                    text-4xl md:text-6xl
                    text-white
                    font-black
                    mt-3
                  "
                >
                  Controle de Retirada
                </h1>

                <p className="text-zinc-400 mt-4">
                  Controle completo de saída de blocos.
                </p>

              </div>

              <button
                onClick={() =>
                  setOpen(true)
                }
                className="
                  h-14
                  px-6
                  rounded-2xl
                  bg-cyan-500
                  hover:bg-cyan-400
                  transition
                  text-black
                  font-black
                  flex items-center gap-3
                "
              >

                <Plus size={18} />

                Nova Retirada

              </button>

            </div>

          </div>

        </div>

        {/* KPIS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
          "
        >

          {/* RETIRADAS */}

          <div
            className="
              rounded-[28px]
              border border-white/10
              bg-white/[0.03]
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500">
                  Retiradas
                </p>

                <h2
                  className="
                    text-5xl
                    text-white
                    font-black
                    mt-3
                  "
                >
                  {expedicoes.length}
                </h2>

              </div>

              <Truck className="text-cyan-400" />

            </div>

          </div>

          {/* BLOCOS */}

          <div
            className="
              rounded-[28px]
              border border-white/10
              bg-white/[0.03]
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500">
                  Blocos Saindo
                </p>

                <h2
                  className="
                    text-5xl
                    text-white
                    font-black
                    mt-3
                  "
                >
                  {totalHoje}
                </h2>

              </div>

              <Package className="text-green-400" />

            </div>

          </div>

          {/* STATUS */}

          <div
            className="
              rounded-[28px]
              border border-white/10
              bg-white/[0.03]
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500">
                  Sistema
                </p>

                <h2
                  className="
                    text-4xl
                    text-cyan-400
                    font-black
                    mt-3
                  "
                >
                  Online
                </h2>

              </div>

              <Clock3 className="text-cyan-400" />

            </div>

          </div>

        </div>

        {/* LISTA */}

        <div className="space-y-4">

          {expedicoes.map((item) => (

            <div
              key={item.id}
              className="
                rounded-[28px]
                border border-white/10
                bg-white/[0.03]
                p-5
              "
            >

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

                <div>

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        px-3 py-1
                        rounded-xl
                        bg-cyan-500/10
                        border border-cyan-500/20
                        text-cyan-400
                        text-xs
                        font-bold
                      "
                    >
                      {item.bloco}
                    </div>

                    <div
                      className="
                        px-3 py-1
                        rounded-xl
                        bg-green-500/10
                        border border-green-500/20
                        text-green-400
                        text-xs
                        font-bold
                      "
                    >
                      {item.quantidade} un
                    </div>

                  </div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      text-white
                      mt-4
                    "
                  >
                    {item.cliente}
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    CPF: {item.cpf}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-zinc-500">
                    Motorista
                  </p>

                  <h3 className="text-white font-bold mt-2">
                    {item.motorista || "-"}
                  </h3>

                  <p className="text-zinc-500 mt-3">
                    Placa
                  </p>

                  <h3 className="text-white font-bold mt-2">
                    {item.placa || "-"}
                  </h3>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* MODAL */}

      {open && (

        <div
          className="
            fixed inset-0 z-50
            bg-black/70
            backdrop-blur-sm
            flex items-center justify-center
            p-4
          "
        >

          <div
            className="
              w-full max-w-[700px]
              rounded-[32px]
              border border-white/10
              bg-[#090909]
              p-6
            "
          >

            <h2
              className="
                text-4xl
                font-black
                text-white
                mb-8
              "
            >
              Nova Retirada
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                placeholder="Nome"
                value={cliente}
                onChange={(e) =>
                  setCliente(
                    e.target.value
                  )
                }
                className="
                  h-14
                  rounded-2xl
                  bg-black/40
                  border border-white/10
                  px-5
                  text-white
                "
              />

              <input
                placeholder="CPF"
                value={cpf}
                onChange={(e) =>
                  setCpf(
                    e.target.value
                  )
                }
                className="
                  h-14
                  rounded-2xl
                  bg-black/40
                  border border-white/10
                  px-5
                  text-white
                "
              />

              <select
                value={bloco}
                onChange={(e) =>
                  setBloco(
                    e.target.value
                  )
                }
                className="
                  h-14
                  rounded-2xl
                  bg-black/40
                  border border-white/10
                  px-5
                  text-white
                "
              >

                <option>
                  BR 13
                </option>

                <option>
                  BR 15
                </option>

                <option>
                  BR 20
                </option>

              </select>

              <input
                placeholder="Quantidade"
                type="number"
                value={quantidade}
                onChange={(e) =>
                  setQuantidade(
                    e.target.value
                  )
                }
                className="
                  h-14
                  rounded-2xl
                  bg-black/40
                  border border-white/10
                  px-5
                  text-white
                "
              />

              <input
                placeholder="Motorista"
                value={motorista}
                onChange={(e) =>
                  setMotorista(
                    e.target.value
                  )
                }
                className="
                  h-14
                  rounded-2xl
                  bg-black/40
                  border border-white/10
                  px-5
                  text-white
                "
              />

              <input
                placeholder="Placa"
                value={placa}
                onChange={(e) =>
                  setPlaca(
                    e.target.value
                  )
                }
                className="
                  h-14
                  rounded-2xl
                  bg-black/40
                  border border-white/10
                  px-5
                  text-white
                "
              />

            </div>

            {/* ASSINATURA */}

            <div className="mt-8">

              <p className="text-white font-bold mb-3">
                Assinatura
              </p>

              <div
                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                "
              >

                <SignatureCanvas
                  ref={signRef}
                  penColor="black"
                  canvasProps={{

                    width: 600,
                    height: 220,

                    className:
                      "w-full",

                  }}
                />

              </div>

            </div>

            {/* BOTÕES */}

            <div className="flex gap-3 mt-8">

              <button
                onClick={() =>
                  signRef.current?.clear()
                }
                className="
                  flex-1
                  h-14
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  text-white
                  font-bold
                "
              >
                Limpar
              </button>

              <button
                onClick={salvar}
                className="
                  flex-1
                  h-14
                  rounded-2xl
                  bg-cyan-500
                  hover:bg-cyan-400
                  transition
                  text-black
                  font-black
                "
              >
                Finalizar Retirada
              </button>

            </div>

          </div>

        </div>

      )}

    </AppLayout>

  );

}
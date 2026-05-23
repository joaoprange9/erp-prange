"use client";

import { useMemo, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import {

  Calculator,
  FileText,
  Building2,
  Wallet,
  Boxes,
  BadgeDollarSign,
  ShieldCheck,

} from "lucide-react";

export default function OrcamentosPage() {

  // ======================================================
  // DADOS
  // ======================================================

  const [cliente, setCliente] =
    useState("");

  const [obra, setObra] =
    useState("");

  const [metragem, setMetragem] =
    useState("");

  const [tipoBloco, setTipoBloco] =
    useState("13");

  // ======================================================
  // VALORES
  // ======================================================

  const [valorBR13, setValorBR13] =
    useState(105);

  const [valorBR15, setValorBR15] =
    useState(105);

  const [valorBR20, setValorBR20] =
    useState(107);

  const [valorATA, setValorATA] =
    useState(0.8);

  const [valorMassaFix, setValorMassaFix] =
    useState(34);

  const [valorIzi, setValorIzi] =
    useState(190);

  // ======================================================
  // CÁLCULOS
  // ======================================================

  const calculos =
    useMemo(() => {

      const m2 =
        Number(metragem) || 0;

      // BLOCOS

      const blocosBase =
        m2 / 0.612;

      const blocosComPerda =
        blocosBase * 1.05;

      const blocos =
        Math.ceil(
          blocosComPerda
        );

      // ATA

      const ata =
        Math.ceil(
          blocos * 3
        );

      // MASSA FIX

      const massaFix =
        Math.ceil(
          (blocos / 200) * 5
        );

      // IZI MASSA

      const faces =
        m2 * 2;

      const izi =
        Math.ceil(
          faces / 15
        );

      // VALOR BLOCO

      let valorBloco =
        valorBR13;

      if (tipoBloco === "15") {

        valorBloco =
          valorBR15;

      }

      if (tipoBloco === "20") {

        valorBloco =
          valorBR20;

      }

      // TOTAIS

      const totalBlocos =
        blocos * valorBloco;

      const totalATA =
        ata * valorATA;

      const totalMassaFix =
        massaFix * valorMassaFix;

      const totalIzi =
        izi * valorIzi;

      const totalFinal =
        totalBlocos +
        totalATA +
        totalMassaFix +
        totalIzi;

      return {

        blocos,
        ata,
        massaFix,
        izi,

        totalBlocos,
        totalATA,
        totalMassaFix,
        totalIzi,

        totalFinal,

        valorBloco,

      };

    }, [

      metragem,
      tipoBloco,

      valorBR13,
      valorBR15,
      valorBR20,

      valorATA,
      valorMassaFix,
      valorIzi,

    ]);

  // ======================================================
  // PDF
  // ======================================================

  function gerarPDF() {

    const doc =
      new jsPDF();

    const verde =
      [34, 197, 94];

    const preto =
      [20, 20, 20];

    // HEADER

    doc.setFillColor(
      verde[0],
      verde[1],
      verde[2]
    );

    doc.rect(
      0,
      0,
      220,
      28,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(22);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "PRANGE BLOCO BR",
      14,
      18
    );

    doc.setFontSize(10);

    doc.text(
      "Paredes Prontas",
      14,
      24
    );

    // TITULO

    doc.setTextColor(
      preto[0],
      preto[1],
      preto[2]
    );

    doc.setFontSize(22);

    doc.text(
      "ORÇAMENTO",
      14,
      45
    );

    // DADOS

    doc.setFontSize(11);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      `Cliente: ${cliente || "-"}`,
      14,
      58
    );

    doc.text(
      `Obra: ${obra || "-"}`,
      14,
      66
    );

    doc.text(
      `Metragem: ${metragem || 0}m²`,
      14,
      74
    );

    doc.text(
      `Bloco: BR ${tipoBloco}`,
      14,
      82
    );

    // TABELA

    autoTable(doc, {

      startY: 95,

      head: [[

        "Material",
        "Quantidade",
        "Valor Unit.",
        "Total",

      ]],

      body: [

        [

          `Bloco BR ${tipoBloco}`,

          calculos.blocos,

          `R$ ${calculos.valorBloco.toFixed(2)}`,

          `R$ ${calculos.totalBlocos.toFixed(2)}`,

        ],

        [

          "ATA",

          calculos.ata,

          `R$ ${valorATA.toFixed(2)}`,

          `R$ ${calculos.totalATA.toFixed(2)}`,

        ],

        [

          "Massa Fix",

          calculos.massaFix,

          `R$ ${valorMassaFix.toFixed(2)}`,

          `R$ ${calculos.totalMassaFix.toFixed(2)}`,

        ],

        [

          "Izi Massa",

          calculos.izi,

          `R$ ${valorIzi.toFixed(2)}`,

          `R$ ${calculos.totalIzi.toFixed(2)}`,

        ],

      ],

      styles: {

        fontSize: 10,

        cellPadding: 4,

      },

      headStyles: {

        fillColor: [34, 197, 94],

        textColor: [255, 255, 255] as any,

        fontStyle: "bold",

      },

      alternateRowStyles: {

        fillColor: [245, 245, 245],

      },

    });

    // TOTAL

    const finalY =
      (doc as any)
        .lastAutoTable.finalY + 18;

    doc.setFontSize(11);

    doc.setTextColor(
      120
    );

    doc.text(
      "VALOR TOTAL",
      14,
      finalY
    );

    doc.setFontSize(28);

    doc.setTextColor(
      verde[0],
      verde[1],
      verde[2]
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      `R$ ${calculos.totalFinal.toFixed(2)}`,
      14,
      finalY + 14
    );

    // RODAPÉ

    doc.setFontSize(9);

    doc.setTextColor(
      120
    );

    doc.text(
      "Orçamento válido por 7 dias.",
      14,
      280
    );

    doc.text(
      "PRANGE BLOCO BR • ERP Industrial",
      14,
      286
    );

    // DOWNLOAD

    doc.save(
      `orcamento-${cliente || "obra"}.pdf`
    );

  }

  return (

    <AppLayout>

      <div className="space-y-6">

        {/* HERO */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border border-white/10
            bg-gradient-to-br
            from-green-500/10
            to-black
            p-8
          "
        >

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

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

              <div>

                <p className="text-green-400 uppercase tracking-[6px] text-xs font-black">
                  ORÇAMENTOS INTELIGENTES
                </p>

                <h1 className="text-white text-6xl font-black mt-4 leading-none">
                  Cálculo automático
                  <br />
                  da obra.
                </h1>

                <p className="text-zinc-400 mt-5 text-lg max-w-[700px]">
                  Sistema inteligente de cálculo
                  automático de materiais para
                  paredes prontas Prange Bloco BR.
                </p>

              </div>

              <div
                className="
                  flex items-center gap-4
                  rounded-3xl
                  border border-green-500/20
                  bg-green-500/10
                  px-6 py-5
                "
              >

                <ShieldCheck
                  size={26}
                  className="text-green-400"
                />

                <div>

                  <h3 className="text-green-400 font-black">
                    Orçamento Inteligente
                  </h3>

                  <p className="text-zinc-500 text-sm">
                    Cálculo automático em tempo real
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">

          {/* ESQUERDA */}

          <div className="space-y-6">

            {/* DADOS */}

            <div
              className="
                rounded-[36px]
                border border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <div className="flex items-center gap-3 mb-6">

                <Building2
                  size={22}
                  className="text-green-400"
                />

                <h2 className="text-white text-2xl font-black">
                  Dados da Obra
                </h2>

              </div>

              <div className="space-y-4">

                <input
                  value={cliente}
                  onChange={(e) =>
                    setCliente(
                      e.target.value
                    )
                  }
                  placeholder="Nome do cliente"
                  className="
                    w-full
                    h-16
                    rounded-3xl
                    bg-black/40
                    border border-white/10
                    px-5
                    text-white
                    outline-none
                  "
                />

                <input
                  value={obra}
                  onChange={(e) =>
                    setObra(
                      e.target.value
                    )
                  }
                  placeholder="Nome da obra"
                  className="
                    w-full
                    h-16
                    rounded-3xl
                    bg-black/40
                    border border-white/10
                    px-5
                    text-white
                    outline-none
                  "
                />

                <input
                  value={metragem}
                  onChange={(e) =>
                    setMetragem(
                      e.target.value
                    )
                  }
                  type="number"
                  placeholder="M² de parede"
                  className="
                    w-full
                    h-16
                    rounded-3xl
                    bg-black/40
                    border border-white/10
                    px-5
                    text-white
                    outline-none
                    text-xl
                    font-bold
                  "
                />

                <select
                  value={tipoBloco}
                  onChange={(e) =>
                    setTipoBloco(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-16
                    rounded-3xl
                    bg-black/40
                    border border-white/10
                    px-5
                    text-white
                    outline-none
                  "
                >

                  <option value="13">
                    Bloco BR 13
                  </option>

                  <option value="15">
                    Bloco BR 15
                  </option>

                  <option value="20">
                    Bloco BR 20
                  </option>

                </select>

              </div>

            </div>

            {/* VALORES */}

            <div
              className="
                rounded-[36px]
                border border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <div className="flex items-center gap-3 mb-6">

                <Wallet
                  size={22}
                  className="text-green-400"
                />

                <h2 className="text-white text-2xl font-black">
                  Valores
                </h2>

              </div>

              <div className="grid grid-cols-2 gap-4">

                {[
                  {
                    nome: "BR13",
                    valor: valorBR13,
                    set: setValorBR13,
                  },

                  {
                    nome: "BR15",
                    valor: valorBR15,
                    set: setValorBR15,
                  },

                  {
                    nome: "BR20",
                    valor: valorBR20,
                    set: setValorBR20,
                  },

                  {
                    nome: "ATA",
                    valor: valorATA,
                    set: setValorATA,
                  },

                  {
                    nome: "Massa Fix",
                    valor: valorMassaFix,
                    set: setValorMassaFix,
                  },

                  {
                    nome: "Izi Massa",
                    valor: valorIzi,
                    set: setValorIzi,
                  },

                ].map((item) => (

                  <div
                    key={item.nome}
                    className="
                      rounded-3xl
                      bg-black/30
                      border border-white/10
                      p-4
                    "
                  >

                    <p className="text-zinc-500 text-sm">
                      {item.nome}
                    </p>

                    <input
                      type="number"
                      value={item.valor}
                      onChange={(e) =>
                        item.set(
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="
                        w-full
                        mt-3
                        h-12
                        rounded-2xl
                        bg-black/40
                        border border-white/10
                        px-4
                        text-white
                        outline-none
                        font-bold
                      "
                    />

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* DIREITA */}

          <div className="space-y-6">

            {/* RESULTADOS */}

            <div
              className="
                rounded-[36px]
                border border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                  <Calculator
                    size={24}
                    className="text-green-400"
                  />

                  <h2 className="text-white text-3xl font-black">
                    Resultado
                  </h2>

                </div>

                <button
                  onClick={gerarPDF}
                  className="
                    h-14
                    px-6
                    rounded-2xl
                    bg-green-500
                    hover:bg-green-400
                    transition
                    text-black
                    font-black
                    flex items-center gap-3
                  "
                >

                  <FileText size={18} />

                  Gerar PDF

                </button>

              </div>

              <div className="space-y-4">

                {[
                  {
                    nome: `Bloco BR ${tipoBloco}`,
                    qtd: calculos.blocos,
                    valor:
                      calculos.totalBlocos,
                  },

                  {
                    nome: "ATA",
                    qtd: calculos.ata,
                    valor:
                      calculos.totalATA,
                  },

                  {
                    nome: "Massa Fix",
                    qtd:
                      calculos.massaFix,
                    valor:
                      calculos.totalMassaFix,
                  },

                  {
                    nome: "Izi Massa",
                    qtd: calculos.izi,
                    valor:
                      calculos.totalIzi,
                  },

                ].map((item) => (

                  <div
                    key={item.nome}
                    className="
                      rounded-3xl
                      bg-black/30
                      border border-white/10
                      p-5
                    "
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-zinc-500 text-sm">
                          Material
                        </p>

                        <h3 className="text-white text-2xl font-black mt-1">
                          {item.nome}
                        </h3>

                      </div>

                      <Boxes
                        size={22}
                        className="text-green-400"
                      />

                    </div>

                    <div className="flex items-end justify-between mt-6">

                      <div>

                        <p className="text-zinc-500 text-sm">
                          Quantidade
                        </p>

                        <h2 className="text-white text-4xl font-black mt-1">
                          {item.qtd}
                        </h2>

                      </div>

                      <div className="text-right">

                        <p className="text-zinc-500 text-sm">
                          Total
                        </p>

                        <h2 className="text-green-400 text-3xl font-black mt-1">
                          R$ {item.valor.toFixed(2)}
                        </h2>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* TOTAL */}

            <div
              className="
                rounded-[40px]
                border border-green-500/20
                bg-gradient-to-br
                from-green-500/20
                to-black
                p-7
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-green-400 uppercase tracking-[5px] text-xs font-black">
                    VALOR FINAL
                  </p>

                  <h2 className="text-white text-6xl font-black mt-4">
                    R$ {calculos.totalFinal.toFixed(2)}
                  </h2>

                  <p className="text-zinc-300 mt-4">
                    Orçamento automático da obra
                  </p>

                </div>

                <BadgeDollarSign
                  size={70}
                  className="text-green-400"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </AppLayout>

  );

}
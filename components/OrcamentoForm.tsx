"use client";

import { useMemo, useState } from "react";
import jsPDF from "jspdf";

export default function OrcamentoForm() {

  const [cliente, setCliente] = useState("Fabio");
  const [cidade, setCidade] = useState("Balneário Camboriú");
  const [vendedor, setVendedor] = useState("Carlos Prange");

  const [produto, setProduto] = useState("Bloco 13 cm");

  const [metragem, setMetragem] = useState(116.5);
  const [valorM2, setValorM2] = useState(170);

  const [massaFix, setMassaFix] = useState(170);
  const [iziMassa, setIziMassa] = useState(3094);
  const [ata, setAta] = useState(427.5);
  const [frete, setFrete] = useState(0);

  const subtotal = useMemo(() => {
    return metragem * valorM2;
  }, [metragem, valorM2]);

  const total = useMemo(() => {
    return subtotal + massaFix + iziMassa + ata + frete;
  }, [subtotal, massaFix, iziMassa, ata, frete]);

  const descontoVista = useMemo(() => {
    return total * 0.1;
  }, [total]);

  const totalVista = useMemo(() => {
    return total - descontoVista;
  }, [total, descontoVista]);

  const gerarPDF = () => {

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // FUNDO

    pdf.setFillColor(9, 9, 11);
    pdf.rect(0, 0, 297, 210, "F");

    // HEADER

    pdf.setTextColor(255, 255, 255);

    pdf.setFontSize(28);
    pdf.text("PRANGEBLOCOBR", 20, 25);

    pdf.setFontSize(16);
    pdf.text("Orçamento Comercial", 20, 38);

    pdf.setDrawColor(255, 120, 0);
    pdf.setLineWidth(1);
    pdf.line(20, 45, 120, 45);

    // CLIENTE

    pdf.setFontSize(12);

    pdf.text(`Cliente: ${cliente}`, 20, 60);
    pdf.text(`Cidade: ${cidade}`, 20, 70);
    pdf.text(`Vendedor: ${vendedor}`, 20, 80);

    // PRODUTO

    pdf.text(`Produto: ${produto}`, 20, 100);
    pdf.text(`Metragem: ${metragem} m²`, 20, 110);

    pdf.text(
      `Valor por m²: R$ ${valorM2.toFixed(2)}`,
      20,
      120
    );

    // EXTRAS

    pdf.text(
      `MassaFix: R$ ${massaFix.toFixed(2)}`,
      20,
      135
    );

    pdf.text(
      `IziMassa: R$ ${iziMassa.toFixed(2)}`,
      20,
      145
    );

    pdf.text(
      `ATA: R$ ${ata.toFixed(2)}`,
      20,
      155
    );

    pdf.text(
      `Frete: R$ ${frete.toFixed(2)}`,
      20,
      165
    );

    // RESUMO

    pdf.setTextColor(0, 255, 120);

    pdf.setFontSize(18);

    pdf.text(
      `Subtotal: R$ ${subtotal.toFixed(2)}`,
      170,
      70
    );

    pdf.text(
      `Total Final: R$ ${total.toFixed(2)}`,
      170,
      90
    );

    pdf.text(
      `À Vista: R$ ${totalVista.toFixed(2)}`,
      170,
      110
    );

    // OBSERVAÇÕES

    pdf.setTextColor(255, 255, 255);

    pdf.setFontSize(12);

    pdf.text(
      "• Frete sob consulta",
      170,
      145
    );

    pdf.text(
      "• Descarga por conta do cliente",
      170,
      155
    );

    pdf.text(
      "• Validade da proposta: 10 dias",
      170,
      165
    );

    pdf.text(
      "• Pagamento em até 10x no cartão",
      170,
      175
    );

    pdf.save(`orcamento-${cliente}.pdf`);
  };

  return (

    <div className="min-h-screen bg-zinc-950 p-4 flex flex-col gap-4">

      {/* HEADER */}

      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex items-center justify-between">

        <div>

          <p className="text-orange-500 uppercase tracking-[5px] text-xs font-bold">
            PRANGEBLOCOBR
          </p>

          <h1 className="text-4xl font-black text-white mt-2">
            Orçamento Comercial
          </h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Sistema inteligente de propostas comerciais
          </p>

        </div>

        <button
          onClick={gerarPDF}
          className="bg-orange-600 hover:bg-orange-500 transition text-white font-bold px-6 py-4 rounded-2xl"
        >
          Gerar PDF
        </button>

      </div>

      {/* CONTEÚDO */}

      <div className="grid grid-cols-[1.6fr_0.8fr] gap-4 flex-1">

        {/* ESQUERDA */}

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 flex flex-col">

          <div className="grid grid-cols-3 gap-3 mb-5">

            <div>

              <label className="text-zinc-500 text-xs uppercase tracking-wider">
                Cliente
              </label>

              <input
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none"
              />

            </div>

            <div>

              <label className="text-zinc-500 text-xs uppercase tracking-wider">
                Cidade
              </label>

              <input
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none"
              />

            </div>

            <div>

              <label className="text-zinc-500 text-xs uppercase tracking-wider">
                Vendedor
              </label>

              <input
                value={vendedor}
                onChange={(e) => setVendedor(e.target.value)}
                className="w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none"
              />

            </div>

          </div>

          {/* PRODUTO */}

          <div className="border border-zinc-800 rounded-2xl overflow-hidden">

            <div className="grid grid-cols-5 bg-zinc-900 border-b border-zinc-800 px-4 py-3 text-xs uppercase tracking-wider text-zinc-500 font-bold">

              <div>Descrição</div>
              <div>M²</div>
              <div>Valor M²</div>
              <div>Total</div>
              <div>Produto</div>

            </div>

            <div className="grid grid-cols-5 px-4 py-5 items-center border-b border-zinc-800">

              <div>

                <p className="text-white font-semibold leading-6">
                  Alvenaria em placas cimentícias armadas preenchidas com EPS
                </p>

              </div>

              <div>

                <input
                  type="number"
                  value={metragem}
                  onChange={(e) => setMetragem(Number(e.target.value))}
                  className="w-24 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />

              </div>

              <div>

                <input
                  type="number"
                  value={valorM2}
                  onChange={(e) => setValorM2(Number(e.target.value))}
                  className="w-24 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />

              </div>

              <div>

                <h3 className="text-green-400 font-black text-xl">
                  R$ {subtotal.toFixed(2)}
                </h3>

              </div>

              <div>

                <select
                  value={produto}
                  onChange={(e) => setProduto(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                >

                  <option>Bloco 13 cm</option>
                  <option>Bloco 15 cm</option>

                </select>

              </div>

            </div>

            {/* EXTRAS */}

            <div className="p-4 space-y-3">

              {[
                { nome: "MassaFix", valor: massaFix, set: setMassaFix },
                { nome: "IziMassa", valor: iziMassa, set: setIziMassa },
                { nome: "ATA", valor: ata, set: setAta },
                { nome: "Frete", valor: frete, set: setFrete },
              ].map((item) => (

                <div
                  key={item.nome}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between"
                >

                  <p className="text-white font-semibold">
                    {item.nome}
                  </p>

                  <input
                    type="number"
                    value={item.valor}
                    onChange={(e) => item.set(Number(e.target.value))}
                    className="w-36 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-right text-white font-bold"
                  />

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* DIREITA */}

        <div className="bg-orange-600 rounded-3xl p-5 flex flex-col justify-between">

          <div>

            <p className="text-orange-100 uppercase tracking-[4px] text-xs font-bold">
              Resumo Financeiro
            </p>

            <h2 className="text-4xl font-black text-white mt-2">
              Total
            </h2>

          </div>

          <div className="space-y-4 my-5">

            <div className="bg-black/20 border border-white/10 rounded-2xl p-4">

              <p className="text-orange-100 text-sm">
                Total Serviços
              </p>

              <h3 className="text-3xl font-black text-white mt-1">
                R$ {total.toFixed(2)}
              </h3>

            </div>

            <div className="bg-black/20 border border-white/10 rounded-2xl p-4">

              <p className="text-orange-100 text-sm">
                Desconto à vista (10%)
              </p>

              <h3 className="text-3xl font-black text-white mt-1">
                R$ {descontoVista.toFixed(2)}
              </h3>

            </div>

            <div className="bg-black/30 border border-white/10 rounded-3xl p-5 text-center">

              <p className="text-orange-100 uppercase tracking-[4px] text-xs">
                Pagamento à Vista
              </p>

              <h1 className="text-5xl font-black text-white mt-3">
                R$ {totalVista.toFixed(2)}
              </h1>

            </div>

          </div>

          <div className="bg-black/20 border border-white/10 rounded-2xl p-4 text-sm">

            <p className="text-orange-50 leading-6">
              • Frete sob consulta
            </p>

            <p className="text-orange-50 leading-6">
              • Descarga por conta do cliente
            </p>

            <p className="text-orange-50 leading-6">
              • Validade da proposta: 10 dias
            </p>

            <p className="text-orange-50 leading-6">
              • Pagamento em até 10x no cartão
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}
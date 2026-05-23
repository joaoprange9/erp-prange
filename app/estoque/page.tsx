"use client";

import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";

import {
  Factory,
  Boxes,
  Truck,
  AlertTriangle,
  Activity,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Package2,
  ArrowUpRight,
} from "lucide-react";

import {
  getEstoque,
  atualizarEstoque,
} from "../../lib/estoque";

export default function EstoquePage() {

  // =====================================================
  // INSUMOS
  // =====================================================

  const [isopor13, setIsopor13] =
    useState(0);

  const [isopor15, setIsopor15] =
    useState(0);

  const [isopor20, setIsopor20] =
    useState(0);

  // =====================================================
  // BLOCOS
  // =====================================================

  const [bloco13, setBloco13] =
    useState(0);

  const [bloco15, setBloco15] =
    useState(0);

  const [bloco20, setBloco20] =
    useState(0);

  // =====================================================
  // INPUTS
  // =====================================================

  const [entrada13, setEntrada13] =
    useState("");

  const [entrada15, setEntrada15] =
    useState("");

  const [entrada20, setEntrada20] =
    useState("");

  const [tipoFabricacao, setTipoFabricacao] =
    useState("13");

  const [quantidadeFabricacao, setQuantidadeFabricacao] =
    useState("");

  const [tipoSaida, setTipoSaida] =
    useState("13");

  const [quantidadeSaida, setQuantidadeSaida] =
    useState("");

  // =====================================================
  // HISTÓRICO
  // =====================================================

  const [historico, setHistorico] =
    useState<any[]>([]);

  // =====================================================
  // LOAD ESTOQUE
  // =====================================================

  async function carregarEstoque() {

    const data =
      await getEstoque();

    // INSUMOS

    const item13 =
      data.find(
        (i: any) =>
          i.tipo === "isopor13"
      );

    const item15 =
      data.find(
        (i: any) =>
          i.tipo === "isopor15"
      );

    const item20 =
      data.find(
        (i: any) =>
          i.tipo === "isopor20"
      );

    // BLOCOS

    const blocoItem13 =
      data.find(
        (i: any) =>
          i.tipo === "bloco13"
      );

    const blocoItem15 =
      data.find(
        (i: any) =>
          i.tipo === "bloco15"
      );

    const blocoItem20 =
      data.find(
        (i: any) =>
          i.tipo === "bloco20"
      );

    // SETS

    setIsopor13(
      item13?.quantidade || 0
    );

    setIsopor15(
      item15?.quantidade || 0
    );

    setIsopor20(
      item20?.quantidade || 0
    );

    setBloco13(
      blocoItem13?.quantidade || 0
    );

    setBloco15(
      blocoItem15?.quantidade || 0
    );

    setBloco20(
      blocoItem20?.quantidade || 0
    );

  }

  useEffect(() => {

    carregarEstoque();

  }, []);

  // =====================================================
  // HISTÓRICO
  // =====================================================

  function addHistorico(
    texto: string
  ) {

    const novo = {

      id: Date.now(),

      texto,

      hora:
        new Date().toLocaleTimeString(
          "pt-BR",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),

    };

    setHistorico((prev) => [
      novo,
      ...prev,
    ].slice(0, 8));

  }

  // =====================================================
  // ENTRADA INSUMOS
  // =====================================================

  async function adicionarInsumo(
    tipo: string
  ) {

    if (tipo === "13") {

      const qtd = Number(
        entrada13
      );

      if (!qtd) return;

      const novo =
        isopor13 + qtd;

      setIsopor13(novo);

      await atualizarEstoque(
        "isopor13",
        novo
      );

      addHistorico(
        `Entrada de ${qtd} isopores 13`
      );

      setEntrada13("");

    }

    if (tipo === "15") {

      const qtd = Number(
        entrada15
      );

      if (!qtd) return;

      const novo =
        isopor15 + qtd;

      setIsopor15(novo);

      await atualizarEstoque(
        "isopor15",
        novo
      );

      addHistorico(
        `Entrada de ${qtd} isopores 15`
      );

      setEntrada15("");

    }

    if (tipo === "20") {

      const qtd = Number(
        entrada20
      );

      if (!qtd) return;

      const novo =
        isopor20 + qtd;

      setIsopor20(novo);

      await atualizarEstoque(
        "isopor20",
        novo
      );

      addHistorico(
        `Entrada de ${qtd} isopores 20`
      );

      setEntrada20("");

    }

  }

  // =====================================================
  // FABRICAR
  // =====================================================

  async function fabricar() {

    const qtd = Number(
      quantidadeFabricacao
    );

    if (!qtd) return;

    // BR13

    if (tipoFabricacao === "13") {

      if (isopor13 < qtd) {

        alert(
          "Sem isopor 13 suficiente"
        );

        return;

      }

      const novoInsumo =
        isopor13 - qtd;

      const novoBloco =
        bloco13 + qtd;

      setIsopor13(
        novoInsumo
      );

      setBloco13(
        novoBloco
      );

      await atualizarEstoque(
        "isopor13",
        novoInsumo
      );

      await atualizarEstoque(
        "bloco13",
        novoBloco
      );

    }

    // BR15

    if (tipoFabricacao === "15") {

      if (isopor15 < qtd) {

        alert(
          "Sem isopor 15 suficiente"
        );

        return;

      }

      const novoInsumo =
        isopor15 - qtd;

      const novoBloco =
        bloco15 + qtd;

      setIsopor15(
        novoInsumo
      );

      setBloco15(
        novoBloco
      );

      await atualizarEstoque(
        "isopor15",
        novoInsumo
      );

      await atualizarEstoque(
        "bloco15",
        novoBloco
      );

    }

    // BR20

    if (tipoFabricacao === "20") {

      if (isopor20 < qtd) {

        alert(
          "Sem isopor 20 suficiente"
        );

        return;

      }

      const novoInsumo =
        isopor20 - qtd;

      const novoBloco =
        bloco20 + qtd;

      setIsopor20(
        novoInsumo
      );

      setBloco20(
        novoBloco
      );

      await atualizarEstoque(
        "isopor20",
        novoInsumo
      );

      await atualizarEstoque(
        "bloco20",
        novoBloco
      );

    }

    addHistorico(
      `Fabricados ${qtd} blocos BR ${tipoFabricacao}`
    );

    setQuantidadeFabricacao("");

  }

  // =====================================================
  // SAÍDA
  // =====================================================

  async function registrarSaida() {

    const qtd = Number(
      quantidadeSaida
    );

    if (!qtd) return;

    if (tipoSaida === "13") {

      if (bloco13 < qtd) {

        alert(
          "Sem estoque BR13"
        );

        return;

      }

      const novo =
        bloco13 - qtd;

      setBloco13(novo);

      await atualizarEstoque(
        "bloco13",
        novo
      );

    }

    if (tipoSaida === "15") {

      if (bloco15 < qtd) {

        alert(
          "Sem estoque BR15"
        );

        return;

      }

      const novo =
        bloco15 - qtd;

      setBloco15(novo);

      await atualizarEstoque(
        "bloco15",
        novo
      );

    }

    if (tipoSaida === "20") {

      if (bloco20 < qtd) {

        alert(
          "Sem estoque BR20"
        );

        return;

      }

      const novo =
        bloco20 - qtd;

      setBloco20(novo);

      await atualizarEstoque(
        "bloco20",
        novo
      );

    }

    addHistorico(
      `Saída de ${qtd} blocos BR ${tipoSaida}`
    );

    setQuantidadeSaida("");

  }

  // =====================================================
  // KPIS
  // =====================================================

  const totalBlocos =
    bloco13 +
    bloco15 +
    bloco20;

  const alertas =
    [
      isopor13 < 50,
      isopor15 < 50,
      isopor20 < 50,
    ].filter(Boolean).length;

  return (

    <AppLayout>

      <div className="space-y-5">

        {/* HEADER */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border border-white/10
            bg-gradient-to-br
            from-orange-500/10
            to-black
            p-8
          "
        >

          <div
            className="
              absolute
              right-0
              top-0
              w-[350px]
              h-[350px]
              bg-orange-500/10
              rounded-full
              blur-[140px]
            "
          />

          <div className="relative z-10">

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

              <div>

                <p className="text-orange-400 uppercase tracking-[6px] text-xs font-black">
                  CONTROLE INDUSTRIAL
                </p>

                <h1 className="text-white text-6xl font-black mt-4">
                  Estoque da Fábrica
                </h1>

                <p className="text-zinc-400 mt-4 text-lg max-w-[700px]">
                  Gestão operacional da produção,
                  expedição e estoque dos blocos BR.
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
                    Sistema Online
                  </h3>

                  <p className="text-zinc-500 text-sm">
                    Sincronizado em tempo real
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* KPIS */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

          {[
            {
              title: "Blocos",
              value: totalBlocos,
              icon: Boxes,
            },

            {
              title: "Produção",
              value: "Ativa",
              icon: Factory,
            },

            {
              title: "Alertas",
              value: alertas,
              icon: AlertTriangle,
            },

            {
              title: "Movimentos",
              value: historico.length,
              icon: Activity,
            },

          ].map((item) => (

            <div
              key={item.title}
              className="
                rounded-[32px]
                border border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <div className="flex items-center justify-between">

                <p className="text-zinc-500 text-sm">
                  {item.title}
                </p>

                <item.icon
                  size={20}
                  className="text-orange-400"
                />

              </div>

              <h2 className="text-white text-5xl font-black mt-6">
                {item.value}
              </h2>

            </div>

          ))}

        </div>

        {/* INSUMOS */}

        <div
          className="
            rounded-[32px]
            border border-white/10
            bg-white/[0.03]
            p-5
          "
        >

          <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-3">

              <Package2
                size={20}
                className="text-orange-400"
              />

              <h2 className="text-white text-xl font-black">
                Insumos
              </h2>

            </div>

            <p className="text-zinc-500 text-sm">
              Matéria-prima
            </p>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

            {[
              {
                nome: "13",
                valor: isopor13,
                entrada: entrada13,
                setEntrada: setEntrada13,
              },

              {
                nome: "15",
                valor: isopor15,
                entrada: entrada15,
                setEntrada: setEntrada15,
              },

              {
                nome: "20",
                valor: isopor20,
                entrada: entrada20,
                setEntrada: setEntrada20,
              },

            ].map((item) => {

              const baixo =
                item.valor < 50;

              return (

                <div
                  key={item.nome}
                  className="
                    flex items-center gap-4
                    rounded-3xl
                    bg-black/30
                    border border-white/5
                    p-4
                  "
                >

                  <div
                    className={`
                      w-3 h-3 rounded-full

                      ${baixo
                        ? "bg-red-400"
                        : "bg-green-400"}
                    `}
                  />

                  <div className="flex-1">

                    <p className="text-zinc-500 text-sm">
                      Isopor {item.nome}
                    </p>

                    <h3 className="text-white text-3xl font-black">
                      {item.valor}
                    </h3>

                  </div>

                  <input
                    value={item.entrada}
                    onChange={(e) =>
                      item.setEntrada(
                        e.target.value
                      )
                    }
                    type="number"
                    placeholder="Qtd"
                    className="
                      w-[110px]
                      h-12
                      rounded-2xl
                      bg-black/40
                      border border-white/10
                      px-4
                      text-white
                      outline-none
                    "
                  />

                  <button
                    onClick={() =>
                      adicionarInsumo(
                        item.nome
                      )
                    }
                    className="
                      h-12
                      px-5
                      rounded-2xl
                      bg-orange-500
                      hover:bg-orange-400
                      transition
                      text-black
                      font-black
                    "
                  >

                    Add

                  </button>

                </div>

              );

            })}

          </div>

        </div>

        {/* MAIN */}

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-5">

          {/* PRODUÇÃO */}

          <div
            className="
              rounded-[36px]
              border border-white/10
              bg-white/[0.03]
              p-6
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-orange-400 uppercase tracking-[5px] text-xs font-black">
                  PRODUÇÃO
                </p>

                <h2 className="text-white text-4xl font-black mt-2">
                  Fabricação de Blocos
                </h2>

              </div>

              <Factory
                size={30}
                className="text-orange-400"
              />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 mt-6">

              <select
                value={tipoFabricacao}
                onChange={(e) =>
                  setTipoFabricacao(
                    e.target.value
                  )
                }
                className="
                  h-16
                  rounded-2xl
                  bg-black/40
                  border border-white/10
                  px-5
                  text-white
                  outline-none
                "
              >

                <option value="13">
                  BR 13
                </option>

                <option value="15">
                  BR 15
                </option>

                <option value="20">
                  BR 20
                </option>

              </select>

              <input
                value={quantidadeFabricacao}
                onChange={(e) =>
                  setQuantidadeFabricacao(
                    e.target.value
                  )
                }
                type="number"
                placeholder="Quantidade"
                className="
                  h-16
                  rounded-2xl
                  bg-black/40
                  border border-white/10
                  px-5
                  text-white
                  outline-none
                "
              />

              <button
                onClick={fabricar}
                className="
                  h-16
                  rounded-2xl
                  bg-orange-500
                  hover:bg-orange-400
                  transition
                  text-black
                  font-black
                  text-lg
                "
              >

                Fabricar

              </button>

            </div>

            {/* BLOCOS */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-6">

              {[
                {
                  nome: "BR 13",
                  valor: bloco13,
                },

                {
                  nome: "BR 15",
                  valor: bloco15,
                },

                {
                  nome: "BR 20",
                  valor: bloco20,
                },

              ].map((item) => (

                <div
                  key={item.nome}
                  className="
                    relative
                    overflow-hidden
                    rounded-[32px]
                    border border-white/10
                    bg-black/30
                    p-6
                  "
                >

                  <div
                    className="
                      absolute
                      right-0
                      top-0
                      w-[120px]
                      h-[120px]
                      bg-orange-500/10
                      rounded-full
                      blur-[60px]
                    "
                  />

                  <div className="relative z-10">

                    <p className="text-zinc-500 text-sm">
                      {item.nome}
                    </p>

                    <h2 className="text-white text-6xl font-black mt-5">
                      {item.valor}
                    </h2>

                    <div
                      className="
                        flex items-center gap-2
                        mt-5
                        text-green-400
                        text-sm
                        font-semibold
                      "
                    >

                      <TrendingUp size={15} />

                      Em estoque

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* LATERAL */}

          <div className="space-y-5">

            {/* SAÍDA */}

            <div
              className="
                rounded-[36px]
                border border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-orange-400 uppercase tracking-[5px] text-xs font-black">
                    EXPEDIÇÃO
                  </p>

                  <h2 className="text-white text-3xl font-black mt-2">
                    Saída de Blocos
                  </h2>

                </div>

                <Truck
                  size={28}
                  className="text-orange-400"
                />

              </div>

              <div className="space-y-3 mt-6">

                <select
                  value={tipoSaida}
                  onChange={(e) =>
                    setTipoSaida(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-16
                    rounded-2xl
                    bg-black/40
                    border border-white/10
                    px-5
                    text-white
                    outline-none
                  "
                >

                  <option value="13">
                    BR 13
                  </option>

                  <option value="15">
                    BR 15
                  </option>

                  <option value="20">
                    BR 20
                  </option>

                </select>

                <input
                  value={quantidadeSaida}
                  onChange={(e) =>
                    setQuantidadeSaida(
                      e.target.value
                    )
                  }
                  type="number"
                  placeholder="Quantidade"
                  className="
                    w-full
                    h-16
                    rounded-2xl
                    bg-black/40
                    border border-white/10
                    px-5
                    text-white
                    outline-none
                  "
                />

                <button
                  onClick={registrarSaida}
                  className="
                    w-full
                    h-16
                    rounded-2xl
                    bg-red-500
                    hover:bg-red-400
                    transition
                    text-white
                    font-black
                    text-lg
                  "
                >

                  Registrar Saída

                </button>

              </div>

            </div>

            {/* HISTÓRICO */}

            <div
              className="
                rounded-[36px]
                border border-white/10
                bg-white/[0.03]
                p-6
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-orange-400 uppercase tracking-[5px] text-xs font-black">
                    OPERAÇÕES
                  </p>

                  <h2 className="text-white text-3xl font-black mt-2">
                    Histórico
                  </h2>

                </div>

                <BarChart3
                  size={26}
                  className="text-orange-400"
                />

              </div>

              <div className="space-y-3 mt-6">

                {historico.map((item) => (

                  <div
                    key={item.id}
                    className="
                      flex items-center justify-between
                      rounded-3xl
                      bg-black/30
                      border border-white/5
                      p-4
                    "
                  >

                    <div>

                      <h3 className="text-white font-bold">
                        {item.texto}
                      </h3>

                      <p className="text-zinc-500 text-sm mt-1">
                        {item.hora}
                      </p>

                    </div>

                    <ArrowUpRight
                      size={18}
                      className="text-orange-400"
                    />

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </AppLayout>

  );

}
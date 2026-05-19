import AppLayout from "../components/layout/AppLayout";

export default function Home() {

  return (

    <AppLayout>

      {/* HEADER */}

      <div className="mb-10">

        <p className="text-orange-500 uppercase tracking-[5px] text-xs font-black">
          DASHBOARD
        </p>

        <h1 className="text-5xl font-black text-white mt-3">
          ERP PRANGE
        </h1>

        <p className="text-zinc-500 mt-4 text-lg">
          Gestão industrial e construtora integrada.
        </p>

      </div>

      {/* KPIS */}

      <div className="grid grid-cols-4 gap-5 mb-10">

        {[
          {
            title: "Faturamento",
            value: "R$ 1.2M",
            color: "text-green-400",
          },
          {
            title: "Lucro",
            value: "R$ 482k",
            color: "text-orange-400",
          },
          {
            title: "Obras Ativas",
            value: "12",
            color: "text-blue-400",
          },
          {
            title: "Clientes",
            value: "28",
            color: "text-purple-400",
          },
        ].map((item) => (

          <div
            key={item.title}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-orange-500 transition"
          >

            <p className="text-zinc-500 text-sm">
              {item.title}
            </p>

            <h2 className={`text-5xl font-black mt-4 ${item.color}`}>
              {item.value}
            </h2>

          </div>

        ))}

      </div>

      {/* GRID */}

      <div className="grid grid-cols-3 gap-5">

        {/* GRÁFICO */}

        <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

          <div className="flex items-center justify-between mb-8">

            <div>

              <p className="text-zinc-500 text-sm">
                Performance
              </p>

              <h2 className="text-3xl font-black text-white mt-2">
                Crescimento Financeiro
              </h2>

            </div>

            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-2xl font-bold">
              +18%
            </div>

          </div>

          {/* BARRAS */}

          <div className="flex items-end gap-5 h-[260px]">

            {[
              40,
              70,
              90,
              120,
              150,
              190,
              220,
            ].map((height, index) => (

              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-3"
              >

                <div
                  style={{
                    height: `${height}px`,
                  }}
                  className="w-full bg-orange-500 rounded-t-3xl hover:bg-orange-400 transition"
                />

                <p className="text-zinc-500 text-sm">
                  M{index + 1}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* ATIVIDADES */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

          <p className="text-zinc-500 text-sm">
            Atividades
          </p>

          <h2 className="text-3xl font-black text-white mt-2 mb-8">
            Recentes
          </h2>

          <div className="space-y-5">

            {[
              "Nova obra cadastrada",
              "Cliente adicionado",
              "PDF gerado",
              "Novo gasto registrado",
              "Orçamento aprovado",
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-4"
              >

                <div className="w-3 h-3 rounded-full bg-orange-500" />

                <p className="text-white">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* OBRAS */}

      <div className="mt-10">

        <div className="flex items-center justify-between mb-6">

          <div>

            <p className="text-zinc-500 text-sm">
              Obras
            </p>

            <h2 className="text-3xl font-black text-white mt-2">
              Obras em andamento
            </h2>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-5">

          {[
            {
              nome: "Casa Praia Brava",
              valor: "R$ 185k",
              status: "63%",
            },
            {
              nome: "Residencial Green",
              valor: "R$ 420k",
              status: "81%",
            },
            {
              nome: "Sobrado BC",
              valor: "R$ 98k",
              status: "41%",
            },
          ].map((obra) => (

            <div
              key={obra.nome}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500 transition"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-2xl font-black text-white">
                    {obra.nome}
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    Em andamento
                  </p>

                </div>

                <h3 className="text-2xl font-black text-green-400">
                  {obra.valor}
                </h3>

              </div>

              {/* PROGRESS */}

              <div className="mt-8">

                <div className="flex items-center justify-between mb-3">

                  <p className="text-zinc-500 text-sm">
                    Progresso
                  </p>

                  <p className="text-white font-bold">
                    {obra.status}
                  </p>

                </div>

                <div className="h-3 bg-black rounded-full overflow-hidden">

                  <div
                    style={{
                      width: obra.status,
                    }}
                    className="h-full bg-orange-500 rounded-full"
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </AppLayout>

  );
}
import LayoutPage from "../../components/LayoutPage";

export default function ProducaoPage() {
  return (
    <LayoutPage title="Produção">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-2">
            Produção Hoje
          </p>

          <h2 className="text-4xl font-bold text-white">
            8.500
          </h2>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-2">
            Máquinas Ativas
          </p>

          <h2 className="text-4xl font-bold text-white">
            6
          </h2>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-2">
            Funcionários
          </p>

          <h2 className="text-4xl font-bold text-white">
            18
          </h2>
        </div>
      </div>
    </LayoutPage>
  );
}
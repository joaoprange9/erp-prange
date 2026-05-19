import Sidebar from "./layout/Sidebar";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function LayoutPage({
  title,
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-[#0b0f19] flex">
      <Sidebar />

      <div className="flex-1">
        <header className="h-20 border-b border-white/10 bg-[#111827] flex items-center justify-between px-10">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {title}
            </h1>

            <p className="text-sm text-gray-400">
              Sistema de Gestão Prange ERP
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            P
          </div>
        </header>

        <div className="p-10">
          {children}
        </div>
      </div>
    </main>
  );
}
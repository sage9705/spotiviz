import SidePanel from "./SidePanel";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-[85%] pr-6 overflow-y-auto h-screen pb-20">
        {children}
      </div>
      <div className="w-[15%] fixed right-0 top-0 h-screen overflow-y-auto">
        <SidePanel />
      </div>
    </div>
  );
}
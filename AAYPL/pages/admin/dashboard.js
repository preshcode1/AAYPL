import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("recharts").then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });

function isAdmin() {
  return typeof document !== "undefined" && document.cookie.includes("adminSession=true");
}

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ totalRegs: 0, regsByState: [], totalPosts: 0, totalSubs: 0 });

  useEffect(() => {
    if (!isAdmin()) router.push("/admin/login");
    async function fetchStats() {
      const { count: totalRegs } = await supabase.from("registrations").select("*", { count: "exact", head: true });
      const { data: regs } = await supabase.from("registrations").select("state");
      const regsByState = Array.from(
        regs?.reduce((map, r) => map.set(r.state, (map.get(r.state) || 0) + 1), new Map())
      ).map(([state, count]) => ({ state, count }));
      const { count: totalPosts } = await supabase.from("posts").select("*", { count: "exact", head: true });
      const { count: totalSubs } = await supabase.from("subscribers").select("*", { count: "exact", head: true });
      setStats({ totalRegs, regsByState, totalPosts, totalSubs });
    }
    fetchStats();
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-6 rounded shadow text-center">
            <div className="text-4xl font-bold text-blue-700">{stats.totalRegs}</div>
            <div>Total Registrations</div>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <div className="text-4xl font-bold text-blue-700">{stats.totalPosts}</div>
            <div>Total Blog Posts</div>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <div className="text-4xl font-bold text-blue-700">{stats.totalSubs}</div>
            <div>Newsletter Subscribers</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Registrations per State</h2>
          {stats.regsByState.length > 0 && typeof window !== "undefined" && (
            <BarChart width={600} height={300} data={stats.regsByState}>
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0047AB" />
            </BarChart>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
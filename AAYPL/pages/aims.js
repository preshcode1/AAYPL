import Header from "../components/Header";
import Footer from "../components/Footer";

const aims = [
  "To Unite Young Political Leaders Across Africa",
  "To Promote Democratic Values and Good Governance",
  "To Empower Youth Participation in Politics",
  "To Strengthen Leadership Capacity",
  "To Influence Policy and Advocate for Youth-Friendly Legislation"
];

export default function Aims() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Aims of AAYPL</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {aims.map((aim, i) => (
            <div key={i} className="bg-white rounded shadow p-5">
              <h2 className="text-xl font-semibold">{aim}</h2>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
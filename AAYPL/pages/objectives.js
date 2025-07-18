import Header from "../components/Header";
import Footer from "../components/Footer";

const objectives = [
  "To create forums and summits for young political leaders to exchange ideas, build partnerships, and develop continental strategies for political advancement.",
  "To provide training programs, workshops, and mentorship opportunities focused on political strategy, governance, diplomacy, and civic responsibility.",
  "To collaborate with African Union organs, national governments, youth organizations, and international partners in promoting youth political representation.",
  "To support youth candidacy and leadership in political parties, electoral processes, and public service roles.",
  "To establish a database of young African political leaders and document their contributions to democratic development across Africa.",
  "To campaign against political violence, voter suppression, corruption, and the marginalization of youth and women in political processes.",
  "To foster innovation and policy research that supports inclusive governance and sustainable development in Africa.",
];

export default function Objectives() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Objectives of AAYPL</h1>
        <ul className="list-disc pl-6 space-y-3">
          {objectives.map((obj, i) => (
            <li key={i} className="text-lg">{obj}</li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
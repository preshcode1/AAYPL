import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">About AAYPL</h1>
        <p className="mb-4">
          The All Africa Young Political Leaders (AAYPL) is a continental platform dedicated to uniting, empowering, and amplifying the voices of Africa’s emerging political leaders. It fosters leadership development, good governance, and intergenerational dialogue to shape a more inclusive, democratic, and progressive Africa.
        </p>
        <h2 className="text-xl mt-8 mb-2 font-semibold text-blue-700">Leadership Team</h2>
        <ul className="list-disc pl-6">
          <li>Adetunji Badeji – President (Nigeria)</li>
          <li>Akua Mensah – Vice President (Ghana)</li>
          <li>Jean-Pierre Nguema – Secretary (Gabon)</li>
          <li>Amina Said – Communications Lead (Kenya)</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
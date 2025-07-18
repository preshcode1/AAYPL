import Header from "../components/Header";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
      setEvents(data || []);
    }
    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Events</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
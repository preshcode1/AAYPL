import { formatDate } from "../lib/utils";

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col hover:shadow-lg transition">
      <img src={event.image_url || "/event-placeholder.png"} alt={event.title} className="w-full h-40 object-cover rounded" />
      <div className="mt-2 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-1">{event.title}</h3>
        <div className="text-sm text-gray-600 mb-2">
          {formatDate(event.date)} • {event.location}
        </div>
        <p className="flex-1 text-gray-700 mb-2">{event.description.slice(0, 100)}...</p>
      </div>
    </div>
  );
}
import { useEffect } from 'react';
import { useEventStore } from '../store/useEventStore';
import './organiser.css';

const MyEvents = () => {
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const events = useEventStore((state) => state.events);
  const isLoading = useEventStore((state) => state.isLoading);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Skeleton loader for loading state
  if (isLoading) {
    return (
      <div className="events-grid">
        {[1, 2, 3,4,5,6,7,8,9 ,10,11,12].map((i) => (
          <div className="event-card skeleton" key={i}>
            <div className="skeleton-title"></div>
            <div className="skeleton-desc"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row short"></div>
            <div className="skeleton-btns"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return <p className="no-events">No events found.</p>;
  }

  return (
    <div className="events-grid">
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <div className="event-header">
            <h2 className="event-title">{event.title}</h2>
            <span className="event-location">{event.location}</span>
          </div>
          <p className="event-desc">{event.description}</p>
          <div className="event-info">
            <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
            <span className="event-time">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="event-meta">
            <span className="event-attendees">Attendees: {event.attendees?.length || 0}</span>
            <span className="event-attendance">Attendance: {event.attendance?.length || 0}</span>
            <span className="event-created">Created: {new Date(event.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="event-actions">
            <button className="event-btn update-btn" disabled>Update</button>
            <button className="event-btn delete-btn" disabled>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEvents;
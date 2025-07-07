import { useEffect } from 'react'
import { useEventStore } from '../../store/useEventStore';
import './Home.css'

const Home = () => {
  const { allEvents, fetchAllEvents } = useEventStore();
  useEffect(() => {
    fetchAllEvents()
  }, [fetchAllEvents]);
  // console.log(allEvents);
  return (
    <>
      <div className='container'>
        <div className='eventsrow'>
          {allEvents.map((event) => (
            <div className="eventcol" id={event._id}>
              <div className="eventcard">
                {/* <img src={event.image} alt={event.title} /> */}
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(event.date).toLocaleTimeString()}</p>
                <p><strong>Location:</strong> {(() => {
                  try {
                    if (event.location.startsWith('{') || event.location.startsWith('[')) {
                      const loc = JSON.parse(event.location);
                      return (
                        <a
                          href={`https://www.google.com/maps?q=${loc.lat},${loc.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                          style={{ textDecoration: 'none' }}
                        >
                          📍 Location
                        </a>
                      );
                    } else {
                      return event.location;
                    }
                  } catch (error) {
                    return event.location;
                  }
                })()}</p>
                <button className='btn'>Join Event</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
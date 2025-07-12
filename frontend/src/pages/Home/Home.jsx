import { useEffect } from 'react'
import { useEventStore } from '../../store/useEventStore';
import './Home.css'
import Carasol from '../../components/carasol/Carasol';
import Trusted from '../../components/trusted/Trusted';

const Home = () => {
  const { allEvents, fetchAllEvents , registerForEvent} = useEventStore();
  useEffect(() => {
    fetchAllEvents()
  }, [fetchAllEvents]);
  // console.log(allEvents);
  return (
    <>

    <Carasol/>
    <Trusted/>
 {
        /*
        <div className='container'>
          <div className='eventsrow'>
            {allEvents.map((event) => (
              <div className="eventcol" id={event._id} >
                <div className="eventcard">
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
                  <button className='btn' onClick={() => registerForEvent(event._id)}>Join Event</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        */
      }
    </>
  )
}

export default Home
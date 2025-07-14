import './middleSection.css';

const MiddleSection = () => {
  return (
    <>
    {/* <h1 className='text-amber-700'>phwe</h1> */}
    <div className="container">
        <div className="row">
            <div className="colone">
                <h1 className="heading">
                    Your Team Is Lean. Your Conference Isn’t.
                </h1>
                <p className="text">
                    Planning a complex event with a small team? You’re not alone.
                     From sponsor logistics to badge printing, Planning a complex event with a small team? 
                     You’re not alone. From sponsor logistics to badge printing,
                      registration forms to agenda chaos—you’re expected to handle it all,
                       often with disconnected tools and no time to spare.
                       registration forms to agenda chaos—you’re expected to handle it all,
                        often with disconnected tools and no time to spare.
                </p>
                <ul className="tags">
                    <li className="tag">Supporting multiple sponsors & speakers</li>
                    <li className="tag">Managing complex registration forms</li>
                    <li className="tag">Handling multiple event types</li>
                    <li className="tag">Creating custom agendas</li>
                    <li className="tag">Managing multiple ticket types</li>
                    <li className="tag">Tracking attendee engagement</li>
                </ul>
            </div>
            <div className="coltwo">
                <img src="https://www.eventmobi.com/wp-content/uploads/2025/05/EventMobi-Homepage-Quote-Block-1024x942.png.webp" alt="Event Management" className="image"/>
            </div>
        </div>
    </div>
 {/* <h1>EventMobi Makes Engaging Events Easy — Even For Small Teams</h1> */}

<div className="container-two">
    <div className="row-two">
        <div className="coltwo-two">
            <img src="https://www.eventmobi.com/wp-content/uploads/2025/06/EventMobi_Roadmap_2025-1024x760.png.webp" alt="Event Management" className="image"/>
        </div>
        <div className="colone-two">
            <h1 className="heading-two">
                Everything You Need. Nothing You Don’t.
            </h1>
            <p className="text-two">
                You’re never locked in. Choose just the modules you want for any event type...
            </p>
            <ul className="tags-two">
                <li>Use tools for every stage of the event lifecycle</li>
                <li>Create custom registration forms</li>
                <li>Manage multiple ticket types</li>
                <li>Create custom agendas</li>
                <li>Track attendee engagement</li>
                <li>Use tools for every stage of the event lifecycle</li>
            </ul>
        </div>
    </div>
</div>

    </>
  )
}

export default MiddleSection
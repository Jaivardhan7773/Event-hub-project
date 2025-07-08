import './Carasol.css'
import { Cake , Users } from 'lucide-react';
const Carasol = () => {
    return (
        <>
            <div className="container">
                <div className="background">
                    <div className="elements">
                        <h1>Event Management <br /> Software That Lets Small Teams Play Big</h1>
                        <p>
                            EventMobi offers modular tools, transparent pricing,
                             and support from seasoned experts for the best value in the industry,
                              in one integrated platform.
                        </p>
                        <div className="achievements">
                            <span className="credits">
                                <Cake size={24} color="white" />
                                Founded in <br/> 2025
                            </span>
                            <span className="credits">
                                <Users size={24} color="white" />
                                41000+ <br/> Planners
                            </span>
                            <span className="credits">
                                 <Users size={24} color="white" />
                                1000+ <br/> Team
                            </span>
                        </div>
                        <div className="fakebuttons">
                            <button className="btn1">Watch The Product Tour</button>
                            <button className="btn2">Book a Demo</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carasol
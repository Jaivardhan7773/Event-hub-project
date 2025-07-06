import React, { useState, useEffect } from 'react';
import { useEventStore } from '../../store/useEventStore';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../AddEvent/AddEvent.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LocationPicker = ({ setLocation, initialPosition }) => {
    const [position, setPosition] = useState(
        initialPosition ? [initialPosition.lat, initialPosition.lng] : [20.5937, 78.9629]
    );

    useEffect(() => {
        if (initialPosition) {
            setPosition([initialPosition.lat, initialPosition.lng]);
            setLocation({
                lat: initialPosition.lat,
                lng: initialPosition.lng
            });
        }
    }, [initialPosition]);

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
            },
        });
        return position ? <Marker position={position} /> : null;
    };

    return (
        <MapContainer
            center={position}
            zoom={4}
            style={{ height: '300px', width: '100%' }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />
        </MapContainer>
    );
};



const UpdateEventModal = ({ event, onClose }) => {
    const { isLoading, updateEvent } = useEventStore();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: null,
        textlocation: ''
    });

    useEffect(() => {
        if (event) {
            let parsedLocation = null;
            if (event.location) {
                try {
                    const loc = JSON.parse(event.location);
                    parsedLocation = { lat: loc.lat, lng: loc.lng };
                } catch (error) {
                    console.error("Invalid location JSON:", event.location);
                }
            }

            setFormData({
                title: event.title || '',
                description: event.description || '',
                date: event.date ? event.date.slice(0, 16) : '',
                location: parsedLocation,
                textlocation: event.textlocation || ''
            });
        }
    }, [event]);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.date || !formData.textlocation) {
            alert("Please fill in all fields");
            return;
        }

        await updateEvent(event._id, {
            ...formData,
            location: formData.location ? JSON.stringify(formData.location) : formData.textlocation
        });


        onClose(); // Close modal after successful update
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <textarea
                        name="description"
                        placeholder="Event Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    ></textarea>
                    <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="textlocation"
                        placeholder="Event Location (Text)"
                        value={formData.textlocation}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <div>
                        <label className="block mb-1 font-medium">Select Location on Map</label>
                        <LocationPicker
                            setLocation={(latlng) => {
                                setFormData({ ...formData, location: latlng });
                            }}
                            initialPosition={
                                formData.location
                                    ? { lat: formData.location.lat, lng: formData.location.lng }
                                    : { lat: 20.5937, lng: 78.9629 }
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {isLoading ? "Updating..." : "Update Event"}
                    </button>
                </form>

                <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default UpdateEventModal;

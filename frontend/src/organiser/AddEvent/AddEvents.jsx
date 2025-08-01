import React, { useState } from 'react';
import './AddEvent.css';
import { useEventStore } from '../../store/useEventStore';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LocationPicker = ({ setLocation }) => {
    const [position, setPosition] = useState(null);

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
                setLocation(e.latlng);
            },
        });
        return position ? <Marker position={position} /> : null;
    };

    return (
        <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: '300px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />
        </MapContainer>
    );
};

const AddEvents = () => {
    const { isLoading, addevent } = useEventStore();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        textlocation: '',
    });


    const [imageFile, setImageFile] = useState(null);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.date || !formData.location || !formData.textlocation || !imageFile) {
            alert("Please fill in all fields");
            return;
        }

        const formPayload = new FormData();
        formPayload.append('title', formData.title);
        formPayload.append('description', formData.description);
        formPayload.append('date', formData.date);
        formPayload.append('textlocation', formData.textlocation);
        formPayload.append('location', formData.location);
        formPayload.append('image', imageFile);

        await addevent(formPayload);
        setImageFile(null);
    };


    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Add Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

                <textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} className="w-full border px-3 py-2 rounded"></textarea>

                <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

                <input type="text" name="textlocation" placeholder="Event Location (Text)" value={formData.textlocation} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

                <div>
                    <label className="block mb-1 font-medium">Select Location on Map</label>
                    <LocationPicker setLocation={(latlng) => {
                        const locationString = JSON.stringify(latlng); // convert object to string
                        setFormData({ ...formData, location: locationString });
                    }} />


                </div>
                <div>
                    <label className="block mb-1 font-medium" htmlFor="image">
                        Event Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {imageFile && <p>Selected file: {imageFile.name}</p>}
                </div>

                <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
                    {isLoading ? "Adding..." : "Add Event"}
                </button>
            </form>
        </div>
    );
};

export default AddEvents;

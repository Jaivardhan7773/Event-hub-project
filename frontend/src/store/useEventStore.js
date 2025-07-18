import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../utils/axios.js';

export const useEventStore = create((set, get) => ({
    events: [],
    allEvents: [],
    isLoading: false,

    fetchAllEvents: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/events/get-all-events");
            set({ allEvents: response.data.events });
         

        } catch (error) {
            console.error("Error fetching all events:", error);
            const message = error.response?.data?.message || "Failed to fetch all events";
            toast.error(message);
        }
    },

    fetchEvents: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/events/my-events");
            set({ events: response.data.events });
        } catch (error) {
            console.error("Error fetching events:", error);
            const message = error.response?.data?.message || "Failed to fetch events";
            toast.error(message);
        } finally {
            set({ isLoading: false });
        }
    },

    registerForEvent: async (eventId) => {
        set({ isLoading: true });
        try {
             const response = await axiosInstance.post(`events/${eventId}/registerok`);
            toast.success("Successfully registered for the event");
        } catch (error) {
            console.error("Error registering for event:", error);
            const message = error.response?.data?.message || "Failed to register for event";
            toast.error(message);
        } finally {
            set({ isLoading: false });
            
        }
    },

        addevent: async (eventData) => {
            set({ isLoading: true });
            try {
                const response = await axiosInstance.post("/events/add-event", eventData);
                toast.success("Event added successfully");
            } catch (error) {
                console.error("Error adding event:", error);
                const message = error.response?.data?.message || "Failed to add event";
                toast.error(message);
            } finally {
                set({ isLoading: false });
                get().fetchEvents();
            }
        },

    deleteEvent: async (eventId) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.delete(`/events/delete-event/${eventId}`);
            toast.success("Event deleted successfully");
        } catch (error) {
            console.error("Error deleting event:", error);
            const message = error.response?.data?.message || "Failed to delete event";
            toast.error(message);
        } finally {
            set({ isLoading: false });
            get().fetchEvents();
        }
    },

    updateEvent: async (eventId, eventData) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.put(`/events/update-event/${eventId}`, eventData);
            toast.success("Event updated successfully");
        } catch (error) {
            console.error("Error updating event:", error);
            const message = error.response?.data?.message || "Failed to update event";
            toast.error(message);
        } finally {
            set({ isLoading: false });
            get().fetchEvents();
        }
    }
}))
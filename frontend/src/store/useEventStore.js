import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../utils/axios.js';

export const useEventStore = create((set , get) => ({
    events: [],
    isLoading: false,

    fetchEvents: async () => {
        set({isLoading : true});
        try {
            const response = await axiosInstance.get("/events/my-events");
            set({ events: response.data.events });
        } catch (error) {
            console.error("Error fetching events:", error);
            const message = error.response?.data?.message || "Failed to fetch events";
            toast.error(message);
        } finally{
            set({isLoading : false});
        }
    }
}))
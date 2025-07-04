import { create } from 'zustand';

import toast from 'react-hot-toast';

import { axiosInstance } from '../utils/axios.js';

const  BASE_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set , get) => ({
    authUser: null,
    isSigningIn: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: response.data })
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    } ,

    signup: async (data) => {
        set({isSigningIn: true});
        try {
            const response = await axiosInstance.post(`/auth/signup`, data);
            set({ authUser: response.data });
            toast.success("Account created successfully");
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error("Failed to create account");
        } finally{
            set({isSigningIn: false});
        }
    }

    
}));
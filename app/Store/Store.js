import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // User data
      currentUser: null,
      
      // Set user data after login/registration
      setCurrentUser: (userData) => set({ 
        currentUser: userData 
      }),
      
      // Update specific user fields
      updateUser: (updatedFields) => set((state) => ({
        currentUser: state.currentUser ? { ...state.currentUser, ...updatedFields } : null
      })),
      
      // Clear user data (for logout)
      clearUser: () => set({ 
        currentUser: null 
      }),
      
      // Get current user data
      getCurrentUser: () => get().currentUser,
    }),
    {
      name: "user-storage", // name of the item in storage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);

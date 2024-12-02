// src/features/events/eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// Fetch all events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    const response = await axios.get('/events/');
    return response.data;
  }
);

// Add new event
export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (eventData) => {
    const response = await axios.post('/events/', eventData);
    return response.data;
  }
);

// Update existing event
export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, eventData }) => {
    const response = await axios.put(`/events/${eventId}/`, eventData);
    return response.data;
  }
);

// Delete event
export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId) => {
    await axios.delete(`/events/${eventId}/`);
    return eventId;
  }
);

// Register for event
export const registerForEvent = createAsyncThunk(
  'events/registerForEvent',
  async ({ eventId, ...formData }) => {
    const response = await axios.post(`/events/${eventId}/register/`, formData);
    return response.data;
  }
);

// Cancel registration
export const cancelRegistration = createAsyncThunk(
  'events/cancelRegistration',
  async (eventId) => {
    await axios.delete(`/events/${eventId}/registration/`);
    return eventId;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null,
    userRegistrations: [],
    selectedEvent: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Add event
      .addCase(addEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
        state.error = null;
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Update event
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex(event => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Delete event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(event => event.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Register for event
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false;
        const eventIndex = state.events.findIndex(e => e.id === action.payload.event.id);
        if (eventIndex !== -1) {
          const event = state.events[eventIndex];
          event.registrations = event.registrations || [];
          event.registrations.push(action.payload);
        }
        state.userRegistrations.push(action.payload);
        state.error = null;
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Cancel registration
      .addCase(cancelRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelRegistration.fulfilled, (state, action) => {
        state.loading = false;
        const eventIndex = state.events.findIndex(e => e.id === action.payload);
        if (eventIndex !== -1) {
          const event = state.events[eventIndex];
          event.registrations = event.registrations.filter(
            reg => reg.event.id !== action.payload
          );
        }
        state.userRegistrations = state.userRegistrations.filter(
          reg => reg.event.id !== action.payload
        );
        state.error = null;
      })
      .addCase(cancelRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearError, setSelectedEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    time: "",
    duration: 1,
    location: "",
    email: "",
    recurring: false,
    frequency: "",
    repeatCount: 1,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvent({
      ...event,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const createEvent = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/events", event);
      alert("Event created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating event.");
    }
  };

  return (
    <div className="App">
      <h1>Create Event</h1>
      <form onSubmit={(e) => { e.preventDefault(); createEvent(); }}>
        <input type="text" name="title" placeholder="Event Title" value={event.title} onChange={handleInputChange} />
        <input type="date" name="date" value={event.date} onChange={handleInputChange} />
        <input type="time" name="time" value={event.time} onChange={handleInputChange} />
        <input type="number" name="duration" placeholder="Duration (hours)" value={event.duration} onChange={handleInputChange} />
        <input type="text" name="location" placeholder="Location" value={event.location} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Your Email" value={event.email} onChange={handleInputChange} />
        <label>
          Recurring?
          <input type="checkbox" name="recurring" checked={event.recurring} onChange={handleInputChange} />
        </label>
        {event.recurring && (
          <>
            <input type="text" name="frequency" placeholder="Frequency (e.g., weekly)" value={event.frequency} onChange={handleInputChange} />
            <input type="number" name="repeatCount" placeholder="Repeat Count" value={event.repeatCount} onChange={handleInputChange} />
          </>
        )}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default App;

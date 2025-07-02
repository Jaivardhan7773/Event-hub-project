import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  organiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: [true, "Event title is required"]
  },
  description: {
    type: String,
    required: [true, "Event description is required"]
  },
  date: {
    type: Date,
    required: [true, "Event date is required"]
  },
  location: {
    type: String,
    required: [true, "Event location is required"]
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model("Event", eventSchema);

export default Event;

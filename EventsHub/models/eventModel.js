import mongoose from 'mongoose';
import slugify from 'slugify';


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
  photos: {
    type: String,
    required: [true, "Event photos are required"]
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
  textlocation: {
    type: String,
    required: [true, "Event text location is required"]
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
  slug: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
eventSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Event = mongoose.model("Event", eventSchema);

export default Event;

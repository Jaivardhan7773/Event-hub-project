import Event from '../models/eventModel.js';
import QRCode from 'qrcode'; // we will use this for QR generation later


//create an event
export const addEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // `req.user._id` comes from your auth middleware
    const newEvent = await Event.create({
      organiser: req.user._id,
      title,
      description,
      date,
      location,
    });

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Server error while adding event" });
  }
};

// Register for an event
export const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if already registered
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    event.attendees.push(userId);
    await event.save();

    // Generate QR Code (for now return a dummy string, integrate QR later)
    const qrCodeData = `EventID:${eventId}-UserID:${userId}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    res.status(200).json({
      message: "Registered successfully",
      qrCode: qrCodeImage
    });
  } catch (error) {
    console.log("Error in registerForEvent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

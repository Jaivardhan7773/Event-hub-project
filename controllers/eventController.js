import Event from '../models/eventModel.js';
import QRCode from 'qrcode'; // we will use this for QR generation later


//create an event
export const addEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user is an organiser
    if (req.user.role !== "organiser") {
      return res.status(403).json({ message: "Only organisers can create events" });
    }

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
    console.log("Error in addEvent:", error);
    res.status(500).json({ message: "Internal server error" });
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


//get events by organiser id
export const getOrganiserEvents = async (req, res) => {
  try {
    const organiserId = req.user._id;

    const events = await Event.find({ organiser: organiserId })
      .populate("attendees", "name email") // populate only name & email
      .sort({ date: -1 });

    res.status(200).json({
      message: "Fetched organiser events successfully",
      events,
    });
  } catch (error) {
    console.log("Error in getOrganiserEvents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get attendees of an event
export const getEventAttendees = async (req, res) => {
  try {
    const eventId = req.params.id;
    const organiserId = req.user._id;

    const event = await Event.findById(eventId).populate("attendees", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the requester is the organiser of this event
    if (event.organiser.toString() !== organiserId.toString()) {
      return res.status(403).json({ message: "Unauthorized access to attendees" });
    }

    res.status(200).json({
      message: "Fetched attendees successfully",
      attendees: event.attendees,
    });
  } catch (error) {
    console.log("Error in getEventAttendees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

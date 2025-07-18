import Event from '../models/eventModel.js';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode'; // we will use this for QR generation later

//get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .select("_id title date location textlocation slug createdAt organiser")
      .populate("organiser", "name email")
      .sort({ date: -1 });
    res.status(200).json({
      message: "Fetched all events successfully",
      events,
    });
  } catch (error) {
    console.log("Error in getAllEvents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


//create an event
export const addEvent = async (req, res) => {
  try {
    const { title, description, date, location, textlocation  } = req.body;
 
    if (!title || !description || !date || !location || !textlocation) {
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
      textlocation,
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
    const payload = {
      eventId: eventId,
      userId: userId
    };

    const qrToken = jwt.sign(payload, process.env.JWT_SECRET); // no expiresIn

    // Generate QR Code with this token
    const qrCodeImage = await QRCode.toDataURL(qrToken);

    res.status(200).json({
      message: "Registered successfully",
      qrCode: qrCodeImage,
      token: qrToken // optional: if you want to see the raw token
    });
  } catch (error) {
    console.log("Error in registerForEvent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//delete an event
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    console.log(eventId)
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.log("Error in deleteEvent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


//for updating an event
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, date, location, textlocation } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, date, location, textlocation },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.log("Error in updateEvent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


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

//search and filtet events
export const searchAndFilterEvents = async (req, res) => {
  try {
    const { search, category, organiser, date } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (organiser) {
      query.organiser = organiser;
    }

    if (date) {
      query.date = { $gte: new Date(date) }; // upcoming from date
    }

    const events = await Event.find(query).populate("organiser", "name email");

    res.status(200).json(events);

  } catch (error) {
    console.log("Error in searchAndFilterEvents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug }).populate("organiser", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);

  } catch (error) {
    console.log("Error in getEventBySlug:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const organiserDashboard = (req, res) => {
  res.json({ message: "Welcome Organiser, this is your dashboard." });
};

import jwt from "jsonwebtoken";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js"; // if you want to fetch user details

export const markAttendance = async (req, res) => {
  try {
    const { qrToken } = req.body; // scanned token sent from frontend

    // Verify token
    const decoded = jwt.verify(qrToken, process.env.JWT_SECRET);

    const { eventId, userId } = decoded;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user registered
    if (!event.attendees.includes(userId)) {
      return res.status(400).json({ message: "User not registered for this event" });
    }

    // Check if already marked attended
    if (!event.attendance) {
      event.attendance = []; // initialize if not present
    }

    if (event.attendance.includes(userId)) {
      return res.status(400).json({ message: "User already marked as attended" });
    }

    // Mark attendance
    event.attendance.push(userId);
    await event.save();

    res.status(200).json({ message: "Attendance marked successfully" });

  } catch (error) {
    console.log("Error in markAttendance:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid QR token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

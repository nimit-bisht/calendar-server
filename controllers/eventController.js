import eventModel from "../models/eventModel.js";


const createEvent = async (req, res) => {
  const { eventName, eventDescription, eventDate } = req.body;

  if (!eventName || !eventDate) {
    return res.status(400).json({ error: "Event Data not complete." });
  }

  try {
    const newEvent = new eventModel({
      eventName: eventName,
      eventDescription: eventDescription,
      eventDate: eventDate,
    });

    const response = await newEvent.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await eventModel.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events", error });
  }
};

const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event Not Found" });
    }

    await eventModel.findByIdAndDelete(eventId);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    res.status(500).json({ error: "Failed to delete Event" });
  }
};


const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { eventName, eventDescription, eventDate } = req.body;

  if (!eventId) {
    return res.status(400).json({ error: "Event ID is required." });
  }

  try {
    // Find the event by ID and update it with the new data
    const updatedEvent = await eventModel.findByIdAndUpdate(
      eventId,
      {
        eventName: eventName,
        eventDescription: eventDescription,
        eventDate: eventDate,
      },
      { new: true } // To return updated Event Data
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json(updatedEvent);
  } catch (error) { 
    console.log(error);
    res.status(500).json(error);
  }
};


export {
  // helloEvent,
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
};

import userModel from "../models/userModel.js";


const helloAPI = async (req, res) => {
  res.send('This is the Holiday Calendar API service.');
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fiels are Required." });
    }
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("User already exist");
    const newUser = new userModel({name, email, password});
    const response = await newUser.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// const getEvents = async (req, res) => {
//   try {
//     const events = await eventModel.find();
//     res.status(200).json(events);
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).json({ message: "Failed to fetch events", error });
//   }
// };

// const deleteEvent = async (req, res) => {
//   const { eventId } = req.params;

//   try {
//     const event = await eventModel.findById(eventId);

//     if (!event) {
//       return res.status(404).json({ error: "Event Not Found" });
//     }

//     await eventModel.findByIdAndDelete(eventId);

//     res.status(200).json({ message: "Event deleted successfully" });
//   } catch (error) {
//     console.error("Error in deleteEvent:", error);
//     res.status(500).json({ error: "Failed to delete Event" });
//   }
// };


// const updateEvent = async (req, res) => {
//   const { eventId } = req.params;
//   const { eventName, eventDescription, eventDate } = req.body;

//   if (!eventId) {
//     return res.status(400).json({ error: "Event ID is required." });
//   }

//   try {
//     // Find the event by ID and update it with the new data
//     const updatedEvent = await eventModel.findByIdAndUpdate(
//       eventId,
//       {
//         eventName: eventName,
//         eventDescription: eventDescription,
//         eventDate: eventDate,
//       },
//       { new: true } // To return updated Event Data
//     );

//     if (!updatedEvent) {
//       return res.status(404).json({ error: "Event not found." });
//     }

//     res.status(200).json(updatedEvent);
//   } catch (error) { 
//     console.log(error);
//     res.status(500).json(error);
//   }
// };


export {
  helloAPI,
  registerUser,
  // getEvents,
  // deleteEvent,
  // updateEvent,
};

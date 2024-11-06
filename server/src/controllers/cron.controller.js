import { Event, EventParticipant } from '../models/event.model.js';
import { Profile } from '../models/user.models.js';

export const updateGlobalAura = async () => {
    const now = new Date();
    try{
        const events = await Event.find({
            endTime: { $lte: now },
            auraDistributed: false
        })
        for(const event of events){
            const eventparticipants = await EventParticipant.find({eventId: event._id});
            
            for(const participant in eventparticipants){
                const profile = await Profile.findByIdAndUpdate(
                    participant.participantId,
                    { $inc: { aura: participant.points } }
                )
            }

            await Event.findByIdAndUpdate(
                event._id,
                {auraDistributed: true}
            );
        }
    }catch(error){
        console.log(error);
    }
}
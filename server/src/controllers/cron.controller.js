import { Event, EventParticipant } from '../models/event.model.js';
import { Profile } from '../models/user.models.js';
import { History } from '../models/history.model.js';

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
};

export const deleteOldNotification = async () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    try{
        const oldnotification = await History.deleteMany({
            seen: true,
            createdAt : { $lt: oneWeekAgo }
        })

        console.log(`Deleted ${oldnotification.deletedCount} old seen notifications.`);
    }catch(err){
        console.log(err)
    }
}
import { Event, EventParticipant } from '../models/event.model.js';
import { Profile } from '../models/user.models.js';
import { History } from '../models/history.model.js';
import { addNotification } from './notification.controller.js';

export const updateGlobalAura = async () => {
    console.log("running update Global Aura cron worker");
    const now = new Date();
    try{
        const events = await Event.find({
            endTime: { $lte: now },
            auraDistributed: false
        })
        for(const event of events){
            const eventparticipants = await EventParticipant.find({eventId: event._id});
            
            for(const participant of eventparticipants){
                const profile = await Profile.findByIdAndUpdate(
                    participant.participantId,
                    { $inc: { aura: participant.points } }
                );

                // notification part
                addNotification(participant.participantId, `${participant.points} added from ${event.name}`);
            }

            await Event.findByIdAndUpdate(
                event._id,
                {auraDistributed: true}
            );
        }
    }catch(error){
        console.log(error);
    }

    console.log("done running update Global Aura cron worker");
};

export const deleteOldNotification = async () => {
    console.log("Delete Old Notification running")
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
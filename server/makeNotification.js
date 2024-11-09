import { History } from "./src/models/history.model.js"

for(let i=0; i<100; i++){
    const history = new History({
        ProfileId:"672e901ddc2dd26c9eaca3e1",
        message: `message ${i}`
    }).save();
    console.log(JSON.stringify(history));
}
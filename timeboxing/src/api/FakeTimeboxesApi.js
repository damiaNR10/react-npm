import { v4 as uuidv4 } from 'uuid';

function wait(ms = 2000) {
    return new Promise(
        (resolve) => {
            setTimeout(resolve, ms);
        }
    )
}

const timeboxes = [
    {id: "aa", title: "Uczę się A", totalTimeInMinutes: "5"}, 
    {id: "bb", title: "Uczę się B", totalTimeInMinutes: "10"},
    {id: "cc", title: "Uczę się C", totalTimeInMinutes: "15"}
];

function findIndexById(id) {
    const result = timeboxes.findIndex((timebox) => timebox.id === id);
    if(result < 0) {
        throw new Error('Timebox with given id does not exist.');
    }
    return result;
}

const FakeTimeboxesAPI = {

    //Object with KEY - VALUE pairs
    getAllTimeboxes: async function() {
        await wait(2000);
        console.log("GET", timeboxes);
        return [...timeboxes];
    },  
    addTimebox: async function(timeboxToAdd) {
        await wait(2000);
        const addedTimebox = {...timeboxToAdd, id: uuidv4()};
        timeboxes.push(addedTimebox);
        console.log("POST", timeboxes);
        return addedTimebox;
    },
    replaceTimebox: async function(timeboxToReplace) {
        await wait(2000);
        if(!timeboxToReplace.id) {
            return new Error('Cannot replace timebox without an id.');
        }
        const index = findIndexById(timeboxToReplace.id); 
        const replacedTimebox = {...timeboxToReplace};
        timeboxes[index] = replacedTimebox;
        console.log("PUT", timeboxes);
        return replacedTimebox;
    },
    removeTimebox: async function(timeboxToRemove) {
        await wait(2000);
        if(!timeboxToRemove.id) {
            return new Error('Cannot remove timebox without an id.');
        }
        const index = findIndexById(timeboxToRemove.id); 
        timeboxes.splice(index, 1);
        console.log("DELETE", timeboxes);
    },
}

export default FakeTimeboxesAPI;
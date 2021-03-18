const slots = [];

const startTime = Math.floor((new Date("2021-03-18T06:00:00.541Z")).getTime() / 1000 / 60);
const endTime = Math.floor((new Date("2021-03-18T22:00:00.541Z")).getTime() / 1000 / 60);
const slotLength = 30;
let currentSlotStartTime = startTime;

console.log(startTime);

while(currentSlotStartTime < endTime){
    slots.push({
        interval: slotLength,
        startTime: new Date(currentSlotStartTime * 1000 * 60),
        endTime: new Date((currentSlotStartTime + slotLength) * 1000 * 60),
        startUnixTime: currentSlotStartTime * 1000 * 60,
        endUnixTime: (currentSlotStartTime + slotLength) * 1000 * 60,
    });
    currentSlotStartTime += slotLength;
}

const queries = [
    {
        startTime: (new Date("2021-03-18T06:00:00.541Z")).getTime(),
        endTime: (new Date("2021-03-18T06:30:00.541Z")).getTime(),
        status: "EXECUTAT"
    },
    {
        startTime: (new Date("2021-03-18T09:45:00.541Z")).getTime(),
        endTime: (new Date("2021-03-18T10:00:00.541Z")).getTime(),
        status: "ANULAT"
    },
    {
        startTime: (new Date("2021-03-18T09:15:00.541Z")).getTime(),
        endTime: (new Date("2021-03-18T09:35:00.541Z")).getTime(),
        status: "FINALIZAT"
    }
];

for (const query of queries) {
    for (const slotIndex in slots) {
        const slot = slots[slotIndex];
        if(query.startTime >= slot.startUnixTime && query.startTime <= slot.endUnixTime){
            slots[slotIndex]["query"] = query;
        }
    }
}

const pushSlot = (slot) => {
    const colors = {
        "DISPONIBIL": "blue",
        "FINALIZAT": "green",
        "ANULAT": "black",
        "EXECUTAT": "magenta"
    };
    const slotContainer = document.createElement("div");
    slotContainer.innerHTML = `${slot.startTime} -> ${slot.status}`;
    slotContainer.style.backgroundColor = colors[slot.status];
    document.body.append(slotContainer);
};

const generatedSlots = slots.map(el => ({
    startTime: `${el.startTime.getUTCHours()}:${el.startTime.getUTCMinutes()}`,
    status: !el.query ? "DISPONIBIL" : el.query.status
}));

for (const slot of generatedSlots) {
    pushSlot(slot);
}



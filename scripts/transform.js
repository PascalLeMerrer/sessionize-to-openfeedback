'use strict';

const fs = require('fs');
const {BUILD_DIRECTORY, BUILD_FILENAME} = require("./config");

const initBuild = () => {
    fs.rmSync(BUILD_DIRECTORY, {recursive: true, force: true});
    fs.mkdirSync(BUILD_DIRECTORY)
}

const transform = () => {
    initBuild()
    fetch(process.env.SESSIONIZE_API_URL)
        .then((response) => response.json())
        .then((originalData) => {
            const rooms = extractRooms(originalData)
            originalData.sessions = transformSessions(originalData, rooms)
            originalData.speakers = transformSpeakers(originalData)
            let data = JSON.stringify(originalData);
            fs.writeFileSync(BUILD_DIRECTORY + "/" + BUILD_FILENAME, data);
        });
}

const extractRooms = (originalData) => {
    const rooms = {}
    originalData.rooms.forEach(room => rooms[room.id] = room.name)
    return rooms
}

const transformSessions = (originalData, rooms) => {
    const transformedSessions = {}
    originalData.sessions.forEach(session => {
        transformedSessions[session.id] = {
            "speakers": session.speakers,
            "tags": [],
            "title": session.title,
            "id": session.id,
            "startTime": session.startsAt,
            "endTime": session.endsAt,
            "trackTitle": rooms[session.roomId]
        }
    })
    return transformedSessions
}

const transformSpeakers = (originalData) => {
    const transformedSpeakers = {}
    originalData.speakers.forEach(speaker => {
        transformedSpeakers[speaker.id] = {
            "name": speaker.fullName,
            "photoUrl": speaker.profilePicture==null ? "https://freesvg.org/storage/img/thumb/abstract-user-flat-4.png": speaker.profilePicture,
            "socials": [],
            "id": speaker.id
        }
    })
    return transformedSpeakers
}

transform()

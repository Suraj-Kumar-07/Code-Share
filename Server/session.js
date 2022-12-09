const sessions = [];

export const addsession = (sessionId, room, token) => {
  const ispresent = sessions.find((session) => session.room === room);
  if (ispresent) {
    if (diff_hours(ispresent.date, new Date()) > 21) {
      removesession(ispresent.room);
    } else {
      return { ispresent: true };
    }
  }
  const session = {
    room: room,
    sessionId: sessionId,
    token: token,
    date: new Date(),
  };
  sessions.push(session);
  console.log("added new session", session);
  return { sessioninfo: session };
};

export const removesession = (room) => {
  const ind = sessions.findIndex((session) => {
    return session.room === room;
  });

  if (ind !== -1) {
    sessions.splice(ind, 1)[0];
  }
};

function diff_hours(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

export const getSessionid = (room) => {
  const session = sessions.find((session) => session.room === room);
  console.log("Join in ", session)
  return { sessionId: session.sessionId, token: session.token };
};

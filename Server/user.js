const users = [];


export const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existinguser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existinguser) {
    return { error: "username is taken" };
  }

  const user = { id, name, room };
  users.push(user);
  return { user };
};

export const getuserinroom = (room) => {
  return users.filter((user) => user.room === room);
};


export const removeUser = (id) => {
  const index = users.findIndex((user) => {
    return user.id === id;
  });
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};


export const isEmpty = (room) => {
  const user = users.find((user) => user.room === room);
  if (!user) {
    return true;
  } else return false;
};


export const getUser = (id) => {
  return users.find((user) => user.id === id);
};
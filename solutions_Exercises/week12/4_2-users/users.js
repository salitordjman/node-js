const fs = require("fs");

const addUser = (name, email, id) => {
  const users = loadUsers();
  const duplicateUser = users.find((user) => user.id === id);
  if (!duplicateUser) {
    users.push({
      id: id,
      name: name,
      email: email,
    });
    saveUsers(users);
    console.log("New user added!");
  } else {
    console.log("The user already exists!");
  }
};

const removeUser = (id) => {
  const users = loadUsers();
  const usersToKeep = users.filter((user) => user.id !== id);

  if (users.length > usersToKeep.length) {
    console.log("User removed!");
    saveUsers(usersToKeep);
  } else {
    console.log("No Id found!");
  }
};

const readUser = (id) => {
  const users = loadUsers();
  const user = users.find((user) => user.id === id);

  if (user) {
    console.log(user);
    console.log("Name: " + user.name + " Email: " + user.email);
  } else {
    console.log("Id not found!");
  }
};

const updateUser = (name, email, id, newId) => {
  const users = loadUsers();
  const userToUpdate = users.find((user) => user.id === id);
  const usersToKeep = users.filter((user) => user.id !== id);
  if (userToUpdate) {
    usersToKeep.push({
      id: newId ? newId : id,
      name: name ? name : userToUpdate.name,
      email: email ? email : userToUpdate.email,
    });
    saveUsers(usersToKeep);
    console.log("The user updating!");
  } else {
    console.log("This Id not found!");
  }
};

const loadUsers = function () {
  try {
    const dataBuffer = fs.readFileSync("users.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("users.json", dataJSON);
};

module.exports = { addUser, removeUser, readUser, updateUser };

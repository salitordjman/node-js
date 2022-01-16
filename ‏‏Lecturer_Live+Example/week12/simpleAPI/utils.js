const fs = require('fs');

const loadUsers = () => {
  try {
    const dataBuffer = fs.readFileSync('./db/users.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const addUser = (body) => {
  //   console.log(body);
  const users = loadUsers();
  users.find((user) => {
    if (user.id === body.id) {
      throw Error('The user is allready exist');
    }
  });
  //! tests to all key and properteis
  //! tests to all key and properteis
  //! tests to all key and properteis
  //! tests to all key and properteis
  //* All good
  //   const newUser = { id: body.ID };
  users.push(body);
  saveUsers(users);
  return stringToJson('new-client', body);
};
const stringToJson = (message, string, message2, string2) => {
  return JSON.stringify({ [message]: string, [message2]: string2 });
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync('./db/users.json', dataJSON);
};

module.exports = {
  loadUsers,
  addUser,
};

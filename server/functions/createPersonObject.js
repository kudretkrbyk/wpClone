function createPersonObject(person, groupMessages) {
  const personObj = {
    Name: person["Name"],
    About: person["About"],
    PhoneNumber: person["PhoneNumber"],
    ProfilePhoto: person["ProfilePhoto"],
    userId: person["userId"],
    Messages: [],
  };

  for (let a = 0; a < groupMessages.length; a++) {
    const messageObj = {
      ChatId: groupMessages[a].ChatId,
      Content: groupMessages[a].Content,
      MessageId: groupMessages[a].MessageId,
      ReceiverId: groupMessages[a].ReceiverId,
      SenderId: groupMessages[a].SenderId,
      _Date: groupMessages[a]._Date,
      forwarded: groupMessages[a].forwarded,
      isRead: groupMessages[a].isRead,
    };
    personObj.Messages.push(messageObj);
  }

  return personObj;
}

module.exports = createPersonObject;

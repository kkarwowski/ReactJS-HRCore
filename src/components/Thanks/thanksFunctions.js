import { ref, getDatabase, push, serverTimestamp } from "firebase/database";

export function addNotification(toUser, type, title) {
  const dbrt = getDatabase();
  if (type === "liked") {
    push(ref(dbrt, `Notifications/${toUser}`), {
      Description: "Liked Thanks you have received!",
      Timestamp: serverTimestamp(),
      Title: `${title.FirstName} ${title.LastName}`,
      Type: type,
      isUnRead: true,
    });
  } else if (type === "comment") {
    push(ref(dbrt, `Notifications/${toUser}`), {
      Description: "commented on your Thanks",
      Timestamp: serverTimestamp(),
      Title: `${title.FirstName} ${title.LastName}`,
      Type: type,
      isUnRead: true,
    });
  } else if (type === "task") {
    push(ref(dbrt, `Notifications/${toUser}`), {
      Description: "has been assgined for your approval",
      Timestamp: serverTimestamp(),
      Title: "New Task",
      Type: type,
      isUnRead: true,
    });
  }
}

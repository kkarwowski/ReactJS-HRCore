import { ref, getDatabase, push, serverTimestamp } from "firebase/database";

export function addNotification(toUser, title, type) {
  const dbrt = getDatabase();
  if (type === "liked") {
    push(ref(dbrt, `Notifications/${toUser.id}`), {
      Description: "Liked Thanks you have received!",
      Timestamp: serverTimestamp(),
      Title: `${title.FirstName} ${title.LastName}`,
      Type: type,
      isUnRead: true,
    });
  } else if (type === "comment") {
    push(ref(dbrt, `Notifications/${toUser.id}`), {
      Description: "commented on your Thanks",
      Timestamp: serverTimestamp(),
      Title: `${title.FirstName} ${title.LastName}`,
      Type: type,
      isUnRead: true,
    });
  }
}

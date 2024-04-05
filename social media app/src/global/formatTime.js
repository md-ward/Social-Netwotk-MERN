export const formatPostTime = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diff = Math.round((now - created) / 1000); // Time difference in seconds

  if (diff < 60) {
    return `${diff} seconds ago`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minutes ago`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days} days ago`;
  }
};

export function formatBirthDay(bday) {
  const birthday = new Date(bday);

  return birthday.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

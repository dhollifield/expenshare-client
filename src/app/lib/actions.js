export async function getUsers() {
  const res = await fetch("https://localhost:7167/api/User");
  return res.json();
}

export async function getEvents() {
  const res = await fetch("https://localhost:7167/api/Event");
  return res.json();
}

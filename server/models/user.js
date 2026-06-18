const users = new Map();

import { v4 as uuidv4 } from 'uuid';

export function createUser({ email, password, name, grade, subjects, school }) {
  const id = uuidv4();
  const user = {
    id,
    email,
    password,
    name: name || '',
    grade: grade || '',
    subjects: subjects || [],
    school: school || '',
    avatar: '',
    createdAt: new Date().toISOString(),
  };
  users.set(id, user);
  return user;
}

export function findUserByEmail(email) {
  for (const user of users.values()) {
    if (user.email === email) return user;
  }
  return null;
}

export function findUserById(id) {
  return users.get(id) || null;
}

export function updateUser(id, data) {
  const user = users.get(id);
  if (!user) return null;
  Object.assign(user, data);
  return user;
}

export { users };

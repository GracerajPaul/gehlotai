export function getProfile(req, res) {
  const { user } = req;
  res.json({ user: { id: user.id, email: user.email, ...user.user_metadata } });
}

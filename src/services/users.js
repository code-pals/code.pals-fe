async function fetchUser() {
  try {
    const res = await fetch('http://localhost:7890/api/v1/users/me/', {
      credentials: 'include',
    });
    if (res.statusCode >= 400) {
      return {};
    }
    const user = await res.json();
    return user;
  } catch (e) {
    console.log('EEEEEE', e);
    return {};
  }
}

export { fetchUser };

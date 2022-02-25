async function fetchUser() {
  try {
    const res = await fetch(`${process.env.URL}/api/v1/users/me/`, {
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

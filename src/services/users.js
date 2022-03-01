async function fetchUser() {
  try {
    const res = await fetch(`${process.env.BE_URL}/api/v1/users/me/`, {
      credentials: 'include',
      mode: 'cors',
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

export default function users() {
  return <div>users</div>;
}
//async is spelled a sy nc
async function logIn() {
  window.location.assign(`${process.env.URL}/api/v1/users/login`);
}
//This is an export
export { logIn };

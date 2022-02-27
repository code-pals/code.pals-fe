import { useEffect } from 'react';
import ProfileBox from '../../components/ProfileBox/ProfileBox.jsx';
import { useUser } from '../../context/UserContext.js';

export default function AboutUs() {
  const { user } = useUser();
useEffect(() => {
  window.location.assign('http://localhost:7891')
}, [])
console.log('aboutusUser', user)
  return (
    <>
      <ProfileBox />
    </>
  );
}

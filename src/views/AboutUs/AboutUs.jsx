import ProfileBox from '../../components/ProfileBox/ProfileBox.jsx';
import about from '../../components/ProfileBox/about.json';

export default function AboutUs() {
  console.log(about);
  return (
    <>
      <h1>About Us</h1>
      <ul>
        {about.map((profile, i) => {
          return (
            <li key={i}>
              {' '}
              <ProfileBox {...profile} />{' '}
            </li>
          );
        })}
      </ul>
    </>
  );
}

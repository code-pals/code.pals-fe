import ProfileBox from '../../components/ProfileBox/ProfileBox.jsx';
import about from '../../components/ProfileBox/about.json';

export default function AboutUs() {
  console.log(about);
  return (
    <>
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

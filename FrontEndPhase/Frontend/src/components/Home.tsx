import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { 
  SectionContainer,
  Headingg,
  Subparagraph,
  NavbarButt,
  HomeContainer,
} from '../Styles/Home';

const Home = () => {
  const navigate = useNavigate();
  return (
    <HomeContainer>
      <SectionContainer>
      <Headingg>Personalized Care for Your Healthy Living</Headingg>
      <Subparagraph>
      We provide personalized care to ensure you live a healthier and more fulfilling life. Our team of professionals is committed to offering the best services tailored to your unique needs.
      </Subparagraph>
      </SectionContainer>
      <NavbarButt onClick={() => { navigate("/doctor-list") }}>View Doctors</NavbarButt>
    </HomeContainer>

  );
};

export default Home;

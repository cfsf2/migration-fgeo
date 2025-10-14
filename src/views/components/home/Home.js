import FooterHome from '../footers/FooterHome';
import BannerInferior from './BannerInferior';
import BannerSuperior from './BannerSuperior';
import FarmaciasCercanas from './FarmaciasCercanas/FarmaciasCercanas';
import RedFarmaciasTA from './RedFarmaciasTA';
import BannerFarmaciasCercanas from './FarmaciasCercanas/BannerFarmaciasCercanas';
import './Home.css';

function Home() {
  return (
    <>
      <BannerSuperior />
      <BannerFarmaciasCercanas />
      <FarmaciasCercanas home nextPage="farmaciaperfil?u=" />
      <BannerInferior />

      <RedFarmaciasTA />
      <FooterHome />
    </>
  );
}

export default Home;

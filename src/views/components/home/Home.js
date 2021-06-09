import FooterHome from "../footers/FooterHome";
import BannerInferior from "./BannerInferior";
import BannerSuperior from "./BannerSuperior";
import FarmaciasCercanas from "./FarmaciasCercanas/FarmaciasCercanas";
import Suscribite from "./Suscribite";
import BannerFarmaciasCercanas from "./FarmaciasCercanas/BannerFarmaciasCercanas";

function Home() {
  return (
    <>
      <BannerSuperior />
      <BannerFarmaciasCercanas />
      <FarmaciasCercanas home nextPage="farmaciaperfil?u=" />
      <BannerInferior />
      <Suscribite />
      <FooterHome />
    </>
  );
}

export default Home;

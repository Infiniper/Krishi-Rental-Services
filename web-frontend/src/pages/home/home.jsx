import React from "react";
import Button1 from "../../components/button1/button1";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import DropDown from "../../components/drop-down/drop-down";
import Block1 from "./home-components/block1/block1";
import Block2 from "./home-components/block2/block2";
const Home = () => {
  return (
    <div>
          <Header />
    <Block1 />
    {/* <Block2 /> */}
    <Footer />
</div>
  );
};

export default Home;





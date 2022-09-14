import React from 'react';
import "./Home.css";
import Product from "./Product";

function Home() {
  return ( 
    <div className="home">
        <div className="home__container">
            <img className="home__image"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/GW/Unrec/Heros/under_1999_Tallhero_1500x600._CB634376407_.jpg" alt=""/>
            <div className='home__row'>
              <Product id="123" title="The Himalyan Neem" price={29.99} image='https://m.media-amazon.com/images/I/61vrqywBOBL._AC_AA440_.jpg' rating={4}/>
              <Product id="124" title="Dry Fruit Basket" price={30.99} image='https://imgcdn.floweraura.com/nourishing-dry-fruits-radhe-radhe-rakhi-pack-9848087ra-A_0.jpg?tr=w-304,dpr-1.5,q-70' rating={5}/>
              <Product id="125" title="Red Velvet Cake" price={15.99} image='https://imgcdn.floweraura.com/red-velvet-love%20-cake-a_0.jpg?tr=w-304,dpr-1.5,q-70' rating={5}/>
            </div>
            <div className='home__row'>
              <Product id="126" title="Golden Plant" price={63.99} image='https://imgcdn.floweraura.com/sweet-dotted-golden-pothos-9853937pl-A_0.jpg?tr=w-304,dpr-1.5,q-70' rating={4} />
              <Product id="127" title="Teddy Bear" price={55.99} image='https://imgcdn.floweraura.com/teddy-photo-frame-9902477gf-A.jpg?tr=w-304,dpr-1.5,q-70' rating={5} />
              <Product id="128" title="Personalized Wall Clock" price={61.99} image='https://imgcdn.floweraura.com/personalised-photo-clock-9965207gf-A.jpg?tr=w-304,dpr-1.5,q-70' rating={5} />
              <Product id="129" title="Photo Mug" price={22.99} image='https://imgcdn.floweraura.com/mugs_1.jpg?tr=w-298,dpr-1.5,q-70' rating={5}/>
            </div>
            <div className='home__row'>
              <Product id="130" title="The Flower Expression" price={55.99} image='https://imgcdn.floweraura.com/flower_homepage_fa_desktop_2.jpg?tr=w-1583,dpr-1.5,q-70' rating={5}/>   
             </div>

        </div>
    </div>
  );
}

export default Home;
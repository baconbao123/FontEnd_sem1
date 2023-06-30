import React, { useEffect } from "react";
import "./WillAlfedNobel.css";
import nobel from "../../../../img/nobel.jpg";
import Footer from "../../Footer";
import AOS from "aos";
import "aos/dist/aos.css";

function WillAlfedNobel() {
  // effect srcoll
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container">
      <div className="overlay">
        {/* header content */}
        <header className="header-will-alfred-nobel">
          <div className="overlay"></div>
        </header>
        <section className="container page-container text-light ">
          <div
            className="col-md-10 col-lg-7 m-auto"
            
          >
            <p style={{ color: "gray" }} className="text-center">
              The will of Alfred Nobel from 27 November, 1895 © Nobel Media.
              Photo: Alexander Mahmoud
            </p>
            <h2 className="title-will-alfed-nobel mb-4 text-center" data-aos="fade-up">
              Alfred Nobel’s will
            </h2>
            <hr />
            <p className="mb-4 fs-5" data-aos="fade-up">
              On November 27, 1895, Alfred Nobel signed his third and last will
              at the Swedish-Norwegian Club in Paris. When it was opened and
              read after his death, the will caused a lot of controversy both in
              Sweden and internationally, as Nobel had left much of his wealth
              for the establishment of a prize. His family opposed the
              establishment of the Nobel Prize, and the prize awarders he named
              refused to do what he had requested in his will. It was five years
              before the first Nobel Prize could be awarded in 1901.
            </p>
            <hr />
            <h2 className=" mb-4">The establishment of the Nobel Prize</h2>
            <img src={nobel} className="w-75 " data-aos="fade-up"  data-aos-duration="800"/>
            <p className="mb-4 fs-5 mt-3" data-aos="fade-up">
              On November 27, 1895, Alfred Nobel signed his third and last will
              at the Swedish-Norwegian Club in Paris. When it was opened and
              read after his death, the will caused a lot of controversy both in
              Sweden and internationally, as Nobel had left much of his wealth
              for the establishment of a prize. His family opposed the
              establishment of the Nobel Prize, and the prize awarders he named
              refused to do what he had requested in his will. It was five years
              before the first Nobel Prize could be awarded in 1901.
            </p>
            <hr />
            <p className="mb-4 fs-5" data-aos="fade-right" data-aos-duration="800">
              “All of my remaining realisable assets are to be disbursed as
              follows: the capital, converted to safe securities by my
              executors, is to constitute a fund, the interest on which is to be
              distributed annually as prizes to those who, during the preceding
              year, have conferred the greatest benefit to humankind. The
              interest is to be divided into five equal parts and distributed as
              follows: one part to the person who made the most important
              discovery or invention in the field of physics; one part to the
              person who made the most important chemical discovery or
              improvement; one part to the person who made the most important
              discovery within the domain of physiology or medicine; one part to
              the person who, in the field of literature, produced the most
              outstanding work in an idealistic direction; and one part to the
              person who has done the most or best to advance fellowship among
              nations, the abolition or reduction of standing armies, and the
              establishment and promotion of peace congresses. The prizes for
              physics and chemistry are to be awarded by the Swedish Academy of
              Sciences; that for physiological or medical achievements by the
              Karolinska Institute in Stockholm; that for literature by the
              Academy in Stockholm; and that for champions of peace by a
              committee of five persons to be selected by the Norwegian
              Storting. It is my express wish that when awarding the prizes, no
              consideration be given to nationality, but that the prize be
              awarded to the worthiest person, whether or not they are
              Scandinavian.”
            </p>
            <sub className="mb-4 fs-6" style={{ color: "gray" }} data-aos="fade-up" data-aos-duration="800">
              To cite this section MLA style: Alfred Nobel’s will.
              NobelPrize.org. Nobel Prize Outreach AB 2023. Thu. 15 Jun 2023.
              https://www.nobelprize.org/alfred-nobel/alfred-nobels-will
            </sub>
          </div>
        </section>
        <Footer/>
      </div>
    </div>
  );
}

export default WillAlfedNobel;

import React from "react";
import Biography from "./Biography";
import './content_style.scss'

const MarieCurie = [
    {
        title: 'Biography',
        birthplace: 'née Sklodowska',
        nobelprize: 'The Nobel Prize in Physics ',
        name: 'Marie Curie',
        born: '7 November 1867, Warsaw, Russian Empire (now Poland)',
        died: '4 July 1934, Sallanches, France',
        prizemotivation: 'in recognition of the extraordinary services they have rendered by their joint researches on the radiation phenomena discovered by Professor Henri Becquerel',
        prizeshare: '1/4', 
        life: 'Marie Skłodowska was born in Warsaw, Poland, to a family of teachers who believed strongly in education. She moved to Paris to continue her studies and there met Pierre Curie, who became both her husband and colleague in the field of radioactivity. The couple later shared the 1903 Nobel Prize in Physics. Marie was widowed in 1906, but continued the couple\'s work and went on to become the first person ever to be awarded two Nobel Prizes. During World War I, Curie organized mobile X-ray teams. The Curies\' daughter, Irene, was also jointly awarded the Nobel Prize in Chemistry alongside her husband, Frederic Joliot',
        work: 'The 1896 discovery of radioactivity by Henri Becquerel inspired Marie and Pierre Curie to further investigate this phenomenon. They examined many substances and minerals for signs of radioactivity. They found that the mineral pitchblende was more radioactive than uranium and concluded that it must contain other radioactive substances. From it they managed to extract two previously unknown elements, polonium and radium, both more radioactive than uranium.',
        achievement: 'Following Henri Becquerel\'s discovery (1896) of a new phenomenon (which she later called “radioactivity”), Marie decided to find out if the property discovered in uranium was to be found in other matter. She discovered that this was true for thorium at the same time as Gerhard Carl Schmidt did. Turning her attention to minerals, she found her interest drawn to pitchblende. Pitchblende, a mineral whose activity is superior to that of pure uranium, could be explained only by the presence in the ore of small quantities of an unknown substance of very high activity. Pierre then joined Marie in the work that she had undertaken to resolve this problem and that led to the discovery of the new elements, polonium and radium. Pierre devoted himself chiefly to the physical study of the new radiations. In 1902 Marie succeeded in isolating one-tenth of a gram of radium chloride that was entirely free from barium. Scientists soon recognized the importance of this work. In 1903 Marie , Pierre, and Becquerel shared the Nobel Prize in Physics. Marie was the first woman to win the Nobel Prize in any subject. Pure radium alone was not isolated until 1910 by Marie with the help of chemist André-Louis Debierne, one of Pierre\'s pupils. The radioactivity of pure radium proved to be more than one million times as great as that of either uranium or thorium. In 1911 Marie was awarded the Nobel Prize for Chemistry, for the isolation of pure radium.',
        timeline: [
            {
                year: 'November 7, 1867',
                event: 'Okänd/Tekniska Museet (DIG17379)Maria Salomea Skłodowska, later known as , is born in , in what is at the time the Congress Kingdom of Poland, Russian Empire.'
            },
            {
                year: '1883–85',
                event: 'a wins a gold medal as top student in her class upon completion of her secondary education. Because her father has lost his savings through bad investment she has to go to work, finding employment first as a teacher and later as a governess. From her earnings she is able to finance her sister Bronislawa’s medical studies in Paris, France, with the understanding that Bronislawa will in turn later help her to get an education.'
            },
            {
                year: '1891–94',
                event: 'Skłodowska moves to Paris in 1891 to study at the Sorbonne. She begins to use the name Marie. She studies far into the night and completes degrees in physics and math. In the spring of 1894 she meets , who is completing his doctorate of science.'
            },
            {
                year: '1895',
                event: 'Photos.com\JupiterimagesMarie and Pierre marry on July 25. She takes her husband\’s surname. Their marriage marks the beginning of a partnership that is soon to achieve results of world significance.'
            },
        ],
        quote: '"One never notices what has been done; one can only see what remains to be done."',
        nbprizedes: 'Sit amet massa vitae tortor condimentum lacinia quis. Ornare arcu dui vivamus arcu felis bibendum ut. Consectetur adipiscing elit duis tristique sollicitudin. Volutpat lacus laoreet non curabitur. Magna fringilla urna porttitor rhoncus. Ultricies leo integer malesuada nunc vel risus commodo viverra. Ipsum a arcu cursus vitae congue. Imperdiet dui accumsan sit amet nulla facilisi. Tincidunt dui ut ornare lectus sit. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Eget gravida cum sociis natoque.',
        imgper: 
        [
            {
                src: 'https://1.bp.blogspot.com/-VeAYvgdzlUI/VRUOGS49LVI/AAAAAAAAAP4/qJET5BK6mns/s1600/marie_curie_mittel.jpg'
            },
            {
                src:'https://i.guim.co.uk/img/media/cb3743611333f344b0dc62da6e813967470a5e2f/379_150_2771_1663/master/2771.jpg?width=620&quality=45&dpr=2&s=none'
            },
            {
                src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQISmYAR1c4I_ps7_-H-paB9fJuNnVm4k5Vjg&usqp=CAU'
            },
            {
                src:'https://images.immediate.co.uk/production/volatile/sites/4/2020/07/GettyImages-530845108-crop-49ff8ef.jpg?quality=90&resize=700,906'
            },
            {
                src:'https://i.guim.co.uk/img/media/cb3743611333f344b0dc62da6e813967470a5e2f/379_150_2771_1663/master/2771.jpg?width=620&quality=45&dpr=2&s=none'
            },
            {
                src: 'https://1.bp.blogspot.com/-VeAYvgdzlUI/VRUOGS49LVI/AAAAAAAAAP4/qJET5BK6mns/s1600/marie_curie_mittel.jpg'
            },
        ]

    }

]

function BiographyContent () {
    return(
        <section className="content">
            <Biography data={MarieCurie[0]}/>
        </section>
    )
}

export default BiographyContent;


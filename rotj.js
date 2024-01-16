export default class ROTJ {
    constructor() {        
        this.showMoviedata();   
        this.getCharacters();  
        this.getVehicles();   
    }
    

    async loadMovie() {
        const response = await fetch('https://bgs.jedlik.eu/swapi/api/films/3', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });        
        return await response.json(); // .json() -> js tömböt készít
    }

    async showMoviedata(){       
        const movie = await this.loadMovie();

        console.log(movie);

        document.querySelector('.data').innerText +=
        `            
            director: ${movie[0].director}
            opening crawl: \n ${movie[0].opening_crawl}            
        `
    }

    async getCharacters(){
        const movie = await this.loadMovie();
        
        var fetchString = "https://bgs.jedlik.eu/swapi/api/group/people?ids=";
        movie[0].characters.forEach(char => {
            fetchString+=`${char},`
        });

        const characters = await (await fetch(fetchString)).json();
        console.log(characters);

        const carouselInner = document.querySelector('.carousel-inner');
        // characters.forEach(char => {            
        //     carouselInner.innerHTML += 
        //     `            
        //     <div class="carousel-item ${char.id == 1 ? "active" : ""}">
        //         <div class="bg-dark">
        //             <div class="col-12 col-sm-6 col-md-4">
        //                 <img class="d-block w-100 h-100 rounded-circle" src="https://bgs.jedlik.eu/swimages/characters/${char.url}.jpg" alt="First slide">
        //                 <h1>Név</h1>
        //                 <p>sajt</p>
        //             </div>        
        //         </div> 
        //     </div>     
        //     `
        // });
        for (let i = 0; i < characters.length; i+=3) {
            carouselInner.innerHTML += 
            `            
            <div class="carousel-item ${characters[i].id == 1 ? "active" : ""}">
                <div class="bg-dark">
                    <div class="row">
                        <div class="col-12 col-sm-4">
                            <img class="d-block w-100 h-100 rounded-circle" src="https://bgs.jedlik.eu/swimages/characters/${characters[i].url}.jpg" alt="First slide">
                            <h1>Név</h1>
                            <p>sajt</p>
                        </div>
                        <div class="col-12 col-sm-4">
                            <img class="d-block w-100 h-100 rounded-circle" src="https://bgs.jedlik.eu/swimages/characters/${characters[i+1].url}.jpg" alt="First slide">
                            <h1>Név</h1>
                            <p>sajt</p>
                        </div> 
                        <div class="col-12 col-sm-4">
                            <img class="d-block w-100 h-100 rounded-circle" src="https://bgs.jedlik.eu/swimages/characters/${characters[i+2].url}.jpg" alt="First slide">
                            <h1>Név</h1>
                            <p>sajt</p>
                        </div>  
                    </div>    
                </div> 
            </div>     
            `            
        }
    }

    async getVehicles(){
        const movie = await this.loadMovie();
        
        var fetchString = "https://bgs.jedlik.eu/swapi/api/group/vehicles?ids=";
        movie[0].vehicles.forEach(v => {
            fetchString+=`${v},`
        });

        const vehicles = await (await fetch(fetchString)).json();
        console.log(vehicles);
    }
}
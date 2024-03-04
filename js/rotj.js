let characters;
let vehicles;

export default class ROTJ {
    constructor() {        
        this.showMoviedata();   
        this.getCharacters();  
        this.getVehicles();           

        this.HandOutEventHandlers();
                   
    }   
    
    HandOutEventHandlers(){
        document.querySelector('#BTN_C_P').addEventListener('click', this.slideUp);
        document.querySelector('#BTN_V_P').addEventListener('click', this.slideUp);
        document.querySelector('#BTN_C_N').addEventListener('click', this.slideDown);   
        document.querySelector('#BTN_V_N').addEventListener('click', this.slideDown);   
        document.querySelectorAll('.BTN_closeModal').forEach(btn =>{
            btn.addEventListener('click', function() {
                document.querySelector('.modal_content').innerHTML = "";
                document.querySelectorAll('.modal')[0].style.display = "none";
                document.querySelectorAll('.modal')[1].style.display = "none";
                document.querySelector('#hider').style.display = "none";               
        })
        });   
        document.querySelector('#characters').style.top = "0px";  
        document.querySelector('#vehicles').style.top = "0px";  

        window.addEventListener('resize', function() {
            document.querySelector('#characters').style.top = document.querySelector('#vehicles').style.top = 
            document.querySelectorAll('.modal')[0].style.top = document.querySelectorAll('.modal')[1].style.top = "0px";
        });
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

        // document.querySelector('.crawl').innerHTML += `<p>Episode VI<br>${movie[0].title}</p>`;
        if (document.querySelector('.crawl').innerHTML.length < 500) {
            document.querySelector('.crawl').innerHTML +=
            `           
                <p class="title">Episode VI</p>
                <p class="title">${movie[0].title}</p><br>    
                <p>${movie[0].opening_crawl.replaceAll("\r\n\r\n", `<p class="spacer"></p>`)}</p>    
                            
            `;   
        }        

        console.log(movie[0].opening_crawl);
                      
    }

    async getCharacters(){
        const movie = await this.loadMovie();
        
        var fetchString = "https://bgs.jedlik.eu/swapi/api/group/people?ids=";
        movie[0].characters.forEach(char => {
            fetchString+=`${char},`
        });

        characters = await (await fetch(fetchString)).json();
        console.log(characters);

        const DIV_characters = document.querySelector('#characters');
               
        characters.forEach((char, index) => {
            let div = document.createElement('div');
            div.className = "col-12 col-md-4 px-5 displayWrapper mx-auto";
            div.innerHTML += 
            `                
                <div class="displayItem C" data-id="${index}">
                    <img class="d-block w-50 h-75 mx-auto" src="https://bgs.jedlik.eu/swimages/characters/${char.url}.jpg" alt="First slide">
                    <h1>${char.name}</h1>                 
                </div>                          
            `            
            DIV_characters.append(div);            
        });
        
        this.addListenersToCharacters();
    }

    async addListenersToCharacters(){        
        document.querySelectorAll('.C').forEach(div => {
            div.addEventListener("click", async function(){                
                document.querySelectorAll('.modal')[0].style.display = "block";               
                document.querySelector('#hider').style.display = "block";   

                let filmsIndexes = "";
                characters[parseInt(div.dataset.id)].films.forEach(index =>{
                    filmsIndexes += `${index},`
                });               
                let films = await (await fetch(`https://bgs.jedlik.eu/swapi/api/group/films?ids=${filmsIndexes}`)).json()
                let filmString = "";
                films.forEach(film => {
                    filmString += `${film.title}<br> `;
                })                

                
                document.querySelector('.modal_content').innerHTML = 
                `
                        <tr>                            
                            <th colspan="2">${characters[parseInt(div.dataset.id)].name}</th>
                        </tr>
                        <tr>
                            <th>Year of birth:</td>
                            <td>${characters[parseInt(div.dataset.id)].birth_year}</td>
                        </tr>
                        <tr>
                            <th>Gender:</td>
                            <td>${characters[parseInt(div.dataset.id)].gender}</td>
                        </tr>
                        <tr>
                            <th>Height:</td>
                            <td>${characters[parseInt(div.dataset.id)].height}</td>
                        </tr>
                        <tr>
                            <th>Skin color:</td>
                            <td>${characters[parseInt(div.dataset.id)].skin_color}</td>
                        </tr>
                        <tr style="border-bottom: none">
                            <th>Featured in:</td>
                            <td>${filmString}</td>
                        </tr>                  
                `;
            });
        });        
    }

    async getVehicles(){
        const movie = await this.loadMovie();
        
        var fetchString = "https://bgs.jedlik.eu/swapi/api/group/vehicles?ids=";
        movie[0].vehicles.forEach(v => {
            fetchString+=`${v},`
        });

        vehicles = await (await fetch(fetchString)).json();
        console.log(vehicles);

        const DIV_vehicles = document.querySelector('#vehicles');
               
        vehicles.forEach((vehicle, index) => {
            let div = document.createElement('div');
            div.className = "col-12 col-md-4 px-5 displayWrapper mx-auto";
            div.innerHTML += 
            `                
                <div class="displayItem V" data-id="${index}">
                    <img class="d-block w-50 h-50 mx-auto" src="https://bgs.jedlik.eu/swimages/vehicles/${vehicle.url}.jpg" alt="First slide">
                    <h1>${vehicle.name}</h1>                 
                </div>                          
            `            
            DIV_vehicles.append(div);            
        });

        this.addListenersToVehicles();
    }

    async addListenersToVehicles(){        
        document.querySelectorAll('.V').forEach(div => {
            div.addEventListener("click", async function(){                
                document.querySelectorAll('.modal')[1].style.display = "block";               
                document.querySelector('#hider').style.display = "block";   

                let filmsIndexes = "";
                vehicles[parseInt(div.dataset.id)].films.forEach(index =>{                    
                    filmsIndexes += `${index},`
                });                
                let films = await (await fetch(`https://bgs.jedlik.eu/swapi/api/group/films?ids=${filmsIndexes}`)).json()
                let filmString = "";

                films.forEach(film => {                    
                    filmString += `${film.title}<br>`;
                })

                // console.log(filmString);
                
                document.querySelectorAll('.modal_content')[1].innerHTML = 
                `                
                    <tr>                            
                        <th colspan="2">${vehicles[parseInt(div.dataset.id)].name}</th>
                    </tr>
                    <tr>
                        <th>Cost in credits:</td>
                        <td>${vehicles[parseInt(div.dataset.id)].cost_in_credits}</td>
                    </tr>
                    <tr>
                        <th>Crew:</td>
                        <td>${vehicles[parseInt(div.dataset.id)].crew}</td>
                    </tr>
                    <tr>
                        <th>Model:</td>
                        <td>${vehicles[parseInt(div.dataset.id)].model}</td>
                    </tr>
                    <tr>
                        <th>Passengers:</td>
                        <td>${vehicles[parseInt(div.dataset.id)].passengers}</td>
                    </tr>
                    <tr>
                        <th>Featured in:</td>
                        <td>${filmString}</td>
                    </tr> 
                `;
            });
        });    
    }
    
    slideUp(event){
        let div;  
        let modal;
        if (event.target.id == "BTN_C_P") {
            div = document.querySelector('#characters'); 
            modal = document.querySelectorAll('.modal')[0];   
        }else{
            div = document.querySelector('#vehicles');  
            modal = document.querySelectorAll('.modal')[1];   
        } 

        
        let value = parseInt(div.style.top.replace("px", "")) + 350;
        if (value != 350) {
            div.style.top = `${value}px` 
            modal.style.top = `${value*-1}px` 
        }        
    }

    slideDown(event){ 
        let div;  
        let modal;
        if (event.target.id == "BTN_C_N") {
            div = document.querySelector('#characters');  
            modal = document.querySelectorAll('.modal')[0]; 
        }
        if (event.target.id == "BTN_V_N"){
            div = document.querySelector('#vehicles');
            modal = document.querySelectorAll('.modal')[1];   
        }         
        let value = parseInt(div.style.top.replace("px", "")) - 350;
        if (window.innerWidth < 576) {
            if (value != div.offsetHeight*-1 ) {
                div.style.top = `${value}px` 
                modal.style.top = `${value*-1}px` 
            } 
        } else {
            if (value != div.offsetHeight*-1 ) {
                div.style.top = `${value}px` 
                modal.style.top = `${value*-1}px` 
            }  
        }    
        
        
    }
}

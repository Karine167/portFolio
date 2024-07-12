class Home {
    constructor(){
        this.profilHTML = document.querySelector('.js-home-profil-url')
        this.descriptionHTML = document.querySelector('.js-home-description')
        this.avatarHTML = document.querySelector('.js-home-avatar')
        this.init()
    }


    init(){
        // Récupérer les infos du profil depuis l'api
        this.getUserInformations()
    }

    getUserInformations(){
        fetch("https://api.github.com/users/Karine167")
        .then((response) => response.json())
        .then((data) => {
            this.updateHTML(data)
        })
        .catch((error) => {
            console.log("Erreur lors de l'appel de l'api ", error)
        })
    }

    updateHTML(APIdata) {
        //Afficher la description de mon profil Github
        this.descriptionHTML.textContent = APIdata.bio
        //Afficher l'url de mon profil github
        this.profilHTML.setAttribute("href", APIdata.html_url) 
        //Afficher mon avatar
        this.avatarHTML.setAttribute("src", APIdata.avatar_url)
    }
}

export { Home }
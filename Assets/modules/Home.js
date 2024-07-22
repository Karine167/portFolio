import { Octokit, App } from "https://esm.sh/octokit";

class Home {
    constructor(){
        this.profilHTML = document.querySelector('.js-home-profil-url')
        this.descriptionHTML = document.querySelector('.js-home-description')
        this.avatarHTML = document.querySelector('.js-home-avatar')
        
        this.projectsTitle = document.querySelectorAll('.js-home-project-title')
        this.projectsDescription = document.querySelectorAll('.js-home-project-description')
        this.projectsTagsContainer = document.querySelectorAll('.js-home-project-tags-container')
        this.projectsURL = document.querySelectorAll('.js-home-project-url')
        this.projectsGithub = document.querySelectorAll('.js-home-project-github')
        this.projectsImg = document.querySelectorAll('.js-home-project-img')

        this.init()
    }


    init(){
        // Récupérer les infos du profil depuis l'api
        this.getUserInformations()
        // Récupérer les informations de nos repos
        this.getReposInformations()
    }

    getUserInformations(){
        // methode 1: à l'aide de la méthode fetch
        fetch("https://api.github.com/users/Karine167")
        .then((response) => response.json())
        .then((data) => {
            this.updateHTMLUser(data)
        })
        .catch((error) => {
            console.log("Erreur lors de l'appel de l'api getUserInformations", error)
        })
    }

    async getReposInformations (){
        // methode 2 : en utilisant l'octokit de github et un await
        const octokit = new Octokit()
        // récupération de tous les repositorys de mon dépôt Github que l'on stocke dans une variable
        const response = await octokit
            .request("GET /users/{owner}/repos", {
                owner: "Karine167",
            })
            .catch((error) => {
                console.log("ERREUR lors de l'appel api getReposInformations", error)
            })
        const projects = response.data
        this.updateHTMLProjects(projects)
    }

    updateHTMLUser(APIdata) {
        //Afficher la description de mon profil Github
        this.descriptionHTML.textContent = APIdata.bio
        //Afficher l'url de mon profil github
        this.profilHTML.setAttribute("href", APIdata.html_url) 
        //Afficher mon avatar
        this.avatarHTML.setAttribute("src", APIdata.avatar_url)
    }
    
    updateHTMLProjects(myProjects) {
        const nbProjects = myProjects.length - 1
        const tabImg = ['ECFGarage', 'JeuDesADeuxJoueurs', 'associationDesJeunes', 'ProjetMissionKGB']
        let htmlIndex = 0
        for (let i = 0; i <= nbProjects; i++){
            const project = myProjects[i]
            this.projectsTitle[htmlIndex].textContent = project.name
            this.projectsDescription[htmlIndex].textContent = project.description
            this.projectsURL[htmlIndex].setAttribute("href", project.homepage )
            this.projectsGithub[htmlIndex].setAttribute("href", project.html_url)
            
            let imgName = 'Assets/images/' + project.name + '.jpg'
            if (tabImg.indexOf(project.name) > -1) {
                this.projectsImg[htmlIndex].setAttribute('src', imgName)
            }
            
            htmlIndex++
        }

    }
}

export { Home }
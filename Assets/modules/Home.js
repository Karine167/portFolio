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
        for (let i = 0; i < projects.length ; i++){
            const languagesUrl = projects[i].languages_url
            const responseLanguages = await octokit
                .request(`GET ${languagesUrl}`)
                .catch((error) => {
                    console.log("ERREUR lors de l'appel api getReposInformations-Languages", error)
                })
            projects[i].languages = responseLanguages.data
        }
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
        const nbProjects = myProjects.length 
        const tabImg = ['ECFGarage', 'JeuDesADeuxJoueurs', 'associationDesJeunes', 'ProjetMissionKGB', 'portFolio']
        let htmlIndex = 0
        console.log(myProjects)
        for (let i = 0; i < nbProjects; i++){
            const project = myProjects[i]
            if (tabImg.indexOf(project.name) > -1) {
                const createdAt = project.created_at.substring(0,10)
                const projectTitle = project.name + ' - date de création : ' + createdAt
                this.projectsTitle[htmlIndex].textContent = projectTitle 
                this.createHTMLLanguageTag(this.projectsTagsContainer[htmlIndex], project.languages)
                this.projectsDescription[htmlIndex].textContent = project.description
                this.projectsURL[htmlIndex].setAttribute("href", project.homepage )
                this.projectsGithub[htmlIndex].setAttribute("href", project.html_url)
                //Affichage d'une photo du site
                let imgName = 'Assets/images/' + project.name + '.jpg'
                this.projectsImg[htmlIndex].setAttribute('src', imgName)
                htmlIndex++
            }
        }
    }

    createHTMLLanguageTag(div, languages) {
        const arrayLanguages = Object.keys(languages)
        const arraySize = Object.values(languages)
        let totalSize = 0   
        arraySize.forEach ((numb) => totalSize += numb)
        for (let j = 0; j < arrayLanguages.length ; j++){
            const span = document.createElement('span')
            const pourcent = Math.round(arraySize[j]*100/totalSize)
            const backgroundColor = arrayLanguages[j]
            span.classList.add(backgroundColor)
            span.style.width = pourcent+'%'
            span.textContent = arrayLanguages[j] + '-' + pourcent + '%'
            div.appendChild(span)
        } 
    }
}

export { Home }
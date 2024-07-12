import { Home } from "./modules/Home.js"

new Home()









//  exemple de requête en début de live pour récupérer des infos avec octokit
//    import { Octokit } from "https://esm.sh/octokit"

//    const octokit = new Octokit()

// octokit.rest.repos => provient du SDK
// get => Méthode du SDK pour récupérer ici les repos
//     octokit.rest.repos
//        .get({
//            owner:"Karine167",
//            repo:"ProjetMissionKGB",
//        })
//        .then(({ data}) => {
//            console.log('url :', data.url)
//        })
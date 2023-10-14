
// Déclaration des variables nécessaire au projet

let buttonVille = $('#button--ville');
let buttonMontagne = $('#button--montagne');
let buttonRealiste = $('#button--realiste');
let buttonCartoon = $('#button--cartoon');

let img1 = $('#img1');
let img2 = $('#img2');
let img3 = $('#img3');
let img4 = $('#img4');

let buttons = [buttonVille, buttonMontagne, buttonRealiste, buttonCartoon];

let originalImageNumbers;

// Déclaration de la variable pour le chemin du fichier JSON à partir du html
let url = '../src/data/data.json';


// Fonction pour générer des nombres aléatoires uniques, il retourne un tableau de "count" nombres aléatoires uniques avec un min et un max par rapport aux images voulu dans le dossier
// Dans ce projet je l'utilise pour générer 4 nombres aléatoires uniques entre 1 et 35 pour les images contenue dans mon dossier
function generateUniqueRandomNumbers(count, min, max) {
    let uniqueNumbers = [];
    while (uniqueNumbers.length < count) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!uniqueNumbers.includes(randomNum)) {
            uniqueNumbers.push(randomNum);
        }
    }
    return uniqueNumbers;
}

// Fonction pour initialiser 4 images au démarrage de la page avec l'utilisation de la fonction qui génère des nombres aléatoires uniques et j'attribue les 4 premiers résultats de la fonction à mes 4 emplacements d'images
function initialImages() {
    let randomIndices = generateUniqueRandomNumbers(4, 1, 35);
    img1.attr('src', '../src/images/img' + randomIndices[0] + '.jpg');
    img2.attr('src', '../src/images/img' + randomIndices[1] + '.jpg');
    img3.attr('src', '../src/images/img' + randomIndices[2] + '.jpg');
    img4.attr('src', '../src/images/img' + randomIndices[3] + '.jpg');
}

// Fonction qui utilise une requête Ajax pour récupérer les données du fichier JSON par rapport à leur nom et les afficher dans les 4 emplacements d'images
function AjaxQuery(nomJSON) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var nomVariable = data.options.find(function (option) {
                return option.nom === nomJSON;
            });

            var randomIndices = generateUniqueRandomNumbers(4, 0, nomVariable.imgs.length - 1);

            img1.attr('src', nomVariable.imgs[randomIndices[0]]);
            img2.attr('src', nomVariable.imgs[randomIndices[1]]);
            img3.attr('src', nomVariable.imgs[randomIndices[2]]);
            img4.attr('src', nomVariable.imgs[randomIndices[3]]);
        }
    });
}


// fonction qui va vérifier chaque boutons pour savoir si ils ont la classe "active" et si c'est le cas, elle va appeler la fonction AjaxQuery 
// avec le nom du bouton en paramètre pour afficher les images correspondantes
function updateImagesBasedOnActiveButtons() {
    if (buttonMontagne.hasClass('active')) {
        if (buttonRealiste.hasClass('active')) {
            AjaxQuery("Montagnes Réalistes");
        } else if (buttonCartoon.hasClass('active')) {
            AjaxQuery("Montagnes Cartoon");
        } else {
            AjaxQuery("Montagnes");
        }
    } else if (buttonVille.hasClass('active')) {
        if (buttonRealiste.hasClass('active')) {
            AjaxQuery("Ville Réaliste");
        } else if (buttonCartoon.hasClass('active')) {
            AjaxQuery("Ville Cartoon");
        } else {
            AjaxQuery("Ville");
        }
    } else if (buttonRealiste.hasClass('active')) {
        AjaxQuery("Réaliste");
    } else if (buttonCartoon.hasClass('active')) {
        AjaxQuery("Cartoon");
    } else {
        initialImages();
    }
}


// Enfin, lorsque la page est prête et a fini de charger, j'appelle la fonction initialImages pour afficher les 4 images au démarrage de la page puis au clic sur un bouton, 
// j'appelle la fonction updateImagesBasedOnActiveButtons qui va executer toute la logique du code pour afficher des images en fonctions du choix de l'utilisateur
$(document).ready(function () {
    originalImageNumbers = generateUniqueRandomNumbers(4, 1, 35);
    initialImages(originalImageNumbers);

    buttonCartoon.click(function () {
        buttonCartoon.toggleClass('active');
        buttonRealiste.removeClass('active');
        updateImagesBasedOnActiveButtons();
    });

    buttonRealiste.click(function () {
        buttonRealiste.toggleClass('active');
        buttonCartoon.removeClass('active');
        updateImagesBasedOnActiveButtons();
    });

    buttonMontagne.click(function () {
        buttonMontagne.toggleClass('active');
        buttonVille.removeClass('active');
        updateImagesBasedOnActiveButtons();
    });

    buttonVille.click(function () {
        buttonVille.toggleClass('active');
        buttonMontagne.removeClass('active');
        updateImagesBasedOnActiveButtons();
    });
});

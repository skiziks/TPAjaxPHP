
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

// Déclaration de la variable pour le chemin du fichier PHP à partir du html
let url = '../src/data/data.php';


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

// Fonction qui récupère les id des boutons actifs et les envoies en POST à mon fichier PHP pour qu'il puisse faire la requête SQL et me retourner les images correspondantes
function envoieAjax() {
    let activeButtons = [];
    buttons.forEach(function (button) {
        if (button.hasClass('active')) {
            activeButtons.push(button.attr('id'));
        }
    });

    let activeButtonsJSON = JSON.stringify(activeButtons);
    console.log(activeButtons);

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            activeButtons: activeButtonsJSON
        },
        success: function (data) {
            let images = JSON.parse(data);
            // let images = data;
            console.log(images);
            img1.attr('src', '../src/images/' + images.img1 + '.jpg');
            img2.attr('src', '../src/images/' + images.img2 + '.jpg');
            img3.attr('src', '../src/images/' + images.img3 + '.jpg');
            img4.attr('src', '../src/images/' + images.img4 + '.jpg');
        }
    });
}


// Enfin, lorsque la page est prête et a fini de charger, j'appelle la fonction initialImages pour afficher les 4 images au démarrage de la page puis au clic sur un bouton, 
// j'appelle la fonction updateImagesBasedOnActiveButtons qui va executer toute la logique du code pour afficher des images en fonctions du choix de l'utilisateur
$(document).ready(function () {
    originalImageNumbers = generateUniqueRandomNumbers(4, 1, 35);
    initialImages(originalImageNumbers);

    buttonCartoon.click(function () {
        buttonCartoon.toggleClass('active');
        buttonRealiste.removeClass('active');
        envoieAjax();
    });

    buttonRealiste.click(function () {
        buttonRealiste.toggleClass('active');
        buttonCartoon.removeClass('active');
        envoieAjax();
    });

    buttonMontagne.click(function () {
        buttonMontagne.toggleClass('active');
        buttonVille.removeClass('active');
        envoieAjax();
    });

    buttonVille.click(function () {
        buttonVille.toggleClass('active');
        buttonMontagne.removeClass('active');
        envoieAjax();
    });
});

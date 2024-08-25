let questionIndex = 0; // Indice pour suivre la question actuelle
let nb = 0; // Variable pour stocker le score total

const questions = [
    {
        question: "Pensez-vous à la clé ou à la fleur ?",
        options: ["oui", "non"],
        score: { oui: 1, non: 0 } // Score pour cette question
    },
    {
        question: "Pensez-vous à la clé ou à la montre ?",
        options: ["oui", "non"],
        score: { oui: 2, non: 0 } // Score pour cette question
    },
    {
        question: "Pensez-vous me pièger ?",
        options: ["oui", "non"],
        score: { oui: 0, non: 0 } // Score pour cette question (peut être modifié si nécessaire)
    },
    {
        question: "Pensez-vous à la fleur ou à la montre ?",
        options: ["oui", "non"],
        score: { oui: 4, non: 0 } // Score pour cette question
    }
];

function testMenteur() {
    questionIndex = 0; // Réinitialise l'indice à 0
    nb = 0; // Réinitialise le score à 0
    displayQuestion();
}

function displayQuestion() {
    if (questionIndex < questions.length) {
        const currentQuestion = questions[questionIndex];
        document.getElementById('testMenteur').innerHTML = `
            <p>${currentQuestion.question}</p>
            ${currentQuestion.options.map(option => `
                <label>
                    <input type="radio" name="question" value="${option}"> 
                    ${option.charAt(0).toUpperCase() + option.slice(1)}
                </label><br>
            `).join('')}
            <button onclick="checkAnswer()">Valider</button>
        `;
    } else {
        let resultMessage = '';
        let imageSrc = '';
        let roleMessage = '';

        // Vérifie si le joueur joue le rôle du menteur ou de celui qui dit la vérité
        if (nb === 0 || nb === 3 || nb === 5 || nb === 6) {
            roleMessage = '<p class="truth">Vous avez joué le rôle de celui qui dit toujours la vérité !</p>';
        } else {
            roleMessage = '<p class="liar">Vous avez joué le rôle du menteur !</p>';
        }

        // Détermine le message et l'image en fonction du score
        switch (nb) {
            case 0:
            case 7:
                resultMessage = 'Vous pensez à la tête de mort';
                imageSrc = '/assets/teteDeMort.jpg';
                break;
            case 3:
            case 4:
                resultMessage = 'Vous pensez à la clé';
                imageSrc = '/assets/CleAncienne.jpg';
                break;
            case 5:
            case 2:
                resultMessage = 'Vous pensez à la fleur';
                imageSrc = '/assets/Fleurs.jpg';
                break;
            case 6:
            case 1:
                resultMessage = 'Vous pensez à la montre';
                imageSrc = '/assets/montreCasse.jpg';
                break;
            default:
                resultMessage = 'Votre réponse n\'est pas reconnue.';
                imageSrc = '';
        }

        // Affiche le résultat, le message de rôle, et l'image
        document.getElementById('testMenteur').innerHTML = `
            ${roleMessage}
            <p>${resultMessage}</p>
            ${imageSrc ? `<img src="${imageSrc}" alt="${resultMessage}" style="width: 300px; height: auto; display: block; margin: 20px auto;">` : ''}
        `;
    }
}

function checkAnswer() {
    const radios = document.getElementsByName('question');
    let selectedValue = '';
    
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }
    
    if (selectedValue) {
        // Ajoute le score en fonction de la question actuelle
        nb += questions[questionIndex].score[selectedValue];
    }

    // Passe à la question suivante
    questionIndex++;
    displayQuestion();
}

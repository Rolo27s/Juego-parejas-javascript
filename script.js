const images = [
	"card_Ac.png",
	"card_Ad.png",
	"card_Ah.png",
	"card_As.png",
	"card_Kc.png",
	"card_Kd.png",
	"card_Kh.png",
	"card_Ks.png",
	"card_Qc.png",
	"card_Qd.png",
	"card_Qh.png",
	"card_Qs.png",
	"card_Ts.png",
	"card_Td.png",
	"card_Th.png",
];

// Duplicar las imágenes para hacer parejas
const cards = images.concat(images);

// Función para barajar las cartas
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Función para crear la tabla de juego
function createGameBoard() {
	const gameBoard = document.getElementById("game-board");
	shuffle(cards);

	for (let i = 0; i < 5; i++) {
		const row = document.createElement("tr");
		for (let j = 0; j < 6; j++) {
			const card = document.createElement("td");
			card.classList.add("card-hidden");
			const image = document.createElement("img");
			image.src = `assets/${cards[i * 6 + j]}`;
			card.appendChild(image);
			row.appendChild(card);
		}
		gameBoard.appendChild(row);
	}
}

createGameBoard();

// Variables para almacenar las cartas seleccionadas
let firstCard = null;
let secondCard = null;

// Función para manejar el clic en una carta
function handleCardClick(card, image) {
	// Voltear la carta
	card.classList.add("flip");

	// Mostrar la imagen de la carta al hacer clic
	image.style.visibility = "visible";

	// Si es la primera carta seleccionada
	if (!firstCard) {
		firstCard = card;
	} else {
		// Si es la segunda carta seleccionada
		secondCard = card;

		// Desactivar el clic en todas las cartas
		document.querySelectorAll("td").forEach((card) => {
			card.style.pointerEvents = "none";
		});

		// Verificar si las dos cartas forman una pareja
		if (image.src === firstCard.querySelector("img").src) {
			// Si coinciden, marcar las cartas y restablecer las variables
			firstCard.classList.add("matched");
			secondCard.classList.add("matched");
			firstCard = null;
			secondCard = null;

			// Volver a habilitar el clic en todas las cartas
			document.querySelectorAll("td").forEach((card) => {
				card.style.pointerEvents = "auto";
			});
		} else {
			// Si no coinciden, esperar un momento y luego volver a ocultar la imagen de las cartas
			setTimeout(() => {
				firstCard.classList.remove("flip");
				secondCard.classList.remove("flip");
				// Volver a ocultar la imagen de las cartas que no coinciden
				firstCard.querySelector("img").style.visibility = "hidden";
				secondCard.querySelector("img").style.visibility = "hidden";
				firstCard = null;
				secondCard = null;

				// Volver a habilitar el clic en todas las cartas
				document.querySelectorAll("td").forEach((card) => {
					card.style.pointerEvents = "auto";
				});
			}, 1000);
		}
	}
}

// Añadir evento de clic a todas las cartas
document.querySelectorAll("td").forEach((card) => {
	card.addEventListener("click", () => {
		if (
			!card.classList.contains("flip") &&
			!card.classList.contains("matched")
		) {
			handleCardClick(card, card.querySelector("img"));
		}
	});
});

// Función para resolver el juego
function solveGame() {
    document.querySelectorAll('td').forEach(card => {
        card.classList.add('flip');
        card.querySelector('img').style.visibility = 'visible';
    });
}

// Función para reiniciar el juego
function resetGame() {
    // Limpiar el tablero
    document.getElementById("game-board").innerHTML = "";

    // Volver a crear el tablero
    createGameBoard();

    // Restablecer las variables
    firstCard = null;
    secondCard = null;

    // Volver a añadir el evento de clic a todas las cartas
    document.querySelectorAll('td').forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('flip') && !card.classList.contains('matched')) {
                handleCardClick(card, card.querySelector('img'));
            }
        });
    });
}

// Añadir evento de clic al botón de resolver
document.getElementById('solve-button').addEventListener('click', solveGame);

// Añadir evento de clic al botón de reiniciar
document.getElementById('reset-button').addEventListener('click', resetGame);

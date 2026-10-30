
// REDES DE BIENESTAR 
// Funciones interactivas de la página

document.addEventListener("DOMContentLoaded", function () {

    // 1. ¿CÓMO ME SIENTO HOY?
    const emociones = document.querySelectorAll(".emocion");
    const mensajeEmocion = document.getElementById("mensajeEmocion");

    emociones.forEach(function (boton) {
        boton.addEventListener("click", function () {
            emociones.forEach(b => b.classList.remove("seleccionada"));
            boton.classList.add("seleccionada");
            mensajeEmocion.textContent = boton.dataset.mensaje;
        });
    });


    // 2. CHECKLIST DE BIENESTAR
    const casillas = document.querySelectorAll(".lista-habitos input");
    const progresoHabitos = document.getElementById("progresoHabitos");
    const barraHabitos = document.getElementById("barraHabitos");
    const reiniciarHabitos = document.getElementById("reiniciarHabitos");

    function actualizarHabitos() {
        const marcados = document.querySelectorAll(
            ".lista-habitos input:checked"
        ).length;

        progresoHabitos.textContent =
            "Has marcado " + marcados + " de " + casillas.length + " hábitos.";

        barraHabitos.style.width =
            (casillas.length ? marcados / casillas.length * 100 : 0) + "%";
    }

    casillas.forEach(c => c.addEventListener("change", actualizarHabitos));

    reiniciarHabitos.addEventListener("click", function () {
        casillas.forEach(c => c.checked = false);
        actualizarHabitos();
    });

    actualizarHabitos();


    // 3. MENSAJES POSITIVOS ALEATORIOS
    const frases = [
        "No tienes que resolver todo hoy. Ve paso a paso.",
        "Tus pequeños logros también cuentan. 💜",
        "Descansar también es parte de avanzar.",
        "Está bien pedir ayuda cuando la necesitas.",
        "Cada persona tiene su propio ritmo.",
        "Equivocarte también puede ayudarte a aprender.",
        "Mereces tratarte con la misma amabilidad que das a los demás.",
        "Un día difícil no define todo lo que eres.",
        "Haz lo mejor que puedas con el tiempo y la energía que tienes.",
        "Recuerda dedicar un momento a algo que disfrutes."
    ];

    const frasePositiva = document.getElementById("frasePositiva");

    document.getElementById("nuevaFrase").addEventListener("click", function () {
        const fraseActual = frasePositiva.textContent;
        let nuevaFrase = fraseActual;

        while (frases.length > 1 && nuevaFrase === fraseActual) {
            nuevaFrase = frases[Math.floor(Math.random() * frases.length)];
        }

        frasePositiva.textContent = nuevaFrase;
    });


    // 4. EJERCICIO DE RESPIRACIÓN
    const circulo = document.getElementById("circuloRespiracion");
    const textoRespiracion = document.getElementById("textoRespiracion");
    const instruccionRespiracion = document.getElementById("instruccionRespiracion");
    const iniciarRespiracion = document.getElementById("iniciarRespiracion");
    const detenerRespiracion = document.getElementById("detenerRespiracion");

    let temporizadorRespiracion = null;
    let faseRespiracion = 0;

    const fases = [
        { texto: "Inhala", instruccion: "Inhala suavemente, sin forzarte." },
        { texto: "Exhala", instruccion: "Exhala despacio y de forma cómoda." }
    ];

    function mostrarFase() {
        const fase = fases[faseRespiracion];
        textoRespiracion.textContent = fase.texto;
        instruccionRespiracion.textContent = fase.instruccion;
        faseRespiracion = (faseRespiracion + 1) % fases.length;
    }

    iniciarRespiracion.addEventListener("click", function () {
        if (temporizadorRespiracion) return;

        faseRespiracion = 0;
        circulo.classList.add("activo");
        mostrarFase();
        temporizadorRespiracion = setInterval(mostrarFase, 4000);
        iniciarRespiracion.textContent = "En curso…";
    });

    detenerRespiracion.addEventListener("click", function () {
        clearInterval(temporizadorRespiracion);
        temporizadorRespiracion = null;
        circulo.classList.remove("activo");
        textoRespiracion.textContent = "Pausa";
        instruccionRespiracion.textContent =
            "Puedes volver cuando quieras. Respira siempre a tu ritmo.";
        iniciarRespiracion.textContent = "Comenzar";
    });


    // 5. MITOS Y REALIDADES
    document.querySelectorAll(".tarjeta-mito").forEach(function (tarjeta) {
        tarjeta.addEventListener("click", function () {
            const abierto = tarjeta.classList.toggle("abierto");
            tarjeta.querySelector("span").textContent =
                abierto ? "Ocultar respuesta −" : "Ver respuesta +";
        });
    });


    // 6. CALENDARIO DE HÁBITOS
    const calendario = document.getElementById("calendarioHabitos");
    const resumenCalendario = document.getElementById("resumenCalendario");
    const habitoElegido = document.getElementById("habitoElegido");
    const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const nombresDias = [
        "Lunes", "Martes", "Miércoles", "Jueves",
        "Viernes", "Sábado", "Domingo"
    ];

    const diasMarcados = new Set();

    diasSemana.forEach(function (dia, indice) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "dia-habito";
        boton.textContent = dia;
        boton.setAttribute("aria-pressed", "false");
        boton.setAttribute("aria-label", nombresDias[indice]);

        boton.addEventListener("click", function () {
            if (diasMarcados.has(indice)) {
                diasMarcados.delete(indice);
                boton.classList.remove("marcado");
                boton.setAttribute("aria-pressed", "false");
            } else {
                diasMarcados.add(indice);
                boton.classList.add("marcado");
                boton.setAttribute("aria-pressed", "true");
            }

            actualizarCalendario();
        });

        calendario.appendChild(boton);
    });

    function actualizarCalendario() {
        const habito = habitoElegido.value.trim() || "tu hábito";
        const cantidad = diasMarcados.size;

        resumenCalendario.textContent = cantidad
            ? "Elegiste " + cantidad + " día(s) para " + habito + ": " +
              [...diasMarcados].sort((a, b) => a - b)
                  .map(i => nombresDias[i]).join(", ") + "."
            : "Aún no has seleccionado días.";
    }

    habitoElegido.addEventListener("input", actualizarCalendario);

    document.getElementById("limpiarCalendario").addEventListener("click", function () {
        diasMarcados.clear();
        calendario.querySelectorAll(".dia-habito").forEach(function (boton) {
            boton.classList.remove("marcado");
            boton.setAttribute("aria-pressed", "false");
        });
        actualizarCalendario();
    });


    // 7. MODO OSCURO Y CLARO
    const cambiarTema = document.getElementById("cambiarTema");

    cambiarTema.addEventListener("click", function () {
        const oscuro = document.body.classList.toggle("modo-oscuro");

        cambiarTema.textContent = oscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
        cambiarTema.setAttribute("aria-pressed", String(oscuro));
    });


    // 8. BOTÓN PARA VOLVER ARRIBA
    const volverArriba = document.getElementById("volverArriba");

    function revisarDesplazamiento() {
        volverArriba.classList.toggle("visible", window.scrollY > 300);
    }

    window.addEventListener("scroll", revisarDesplazamiento, { passive: true });
    revisarDesplazamiento();

    volverArriba.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    // 9. SONIDO SUAVE GENERADO POR EL NAVEGADOR
    const iniciarSonido = document.getElementById("iniciarSonido");
    const detenerSonido = document.getElementById("detenerSonido");
    const estadoSonido = document.getElementById("estadoSonido");

    let contextoAudio = null;
    let oscilador = null;
    let volumen = null;

    iniciarSonido.addEventListener("click", async function () {
        const AudioContextClase = window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClase) {
            estadoSonido.textContent =
                "Tu navegador no permite generar este sonido. Puedes usar música relajante externa.";
            return;
        }

        try {
            if (oscilador) return;

            contextoAudio = contextoAudio || new AudioContextClase();
            await contextoAudio.resume();

            oscilador = contextoAudio.createOscillator();
            volumen = contextoAudio.createGain();

            oscilador.type = "sine";
            oscilador.frequency.value = 220;
            volumen.gain.value = 0.025;

            oscilador.connect(volumen);
            volumen.connect(contextoAudio.destination);
            oscilador.start();

            estadoSonido.textContent =
                "Sonido suave activado. Puedes detenerlo cuando quieras.";
        } catch (error) {
            oscilador = null;
            estadoSonido.textContent =
                "No se pudo iniciar el sonido en este navegador.";
        }
    });

    detenerSonido.addEventListener("click", function () {
        if (oscilador) {
            oscilador.stop();
            oscilador.disconnect();
            volumen.disconnect();
            oscilador = null;
            volumen = null;
        }

        estadoSonido.textContent = "El sonido está apagado.";
    });

});

function revisarEmociones() {
    const respuesta1 = document.getElementById("emocion1").value;
    const respuesta2 = document.getElementById("emocion2").value;
    const resultado = document.getElementById("resultado-emociones");

    if (respuesta1 === "" || respuesta2 === "") {
        resultado.textContent = "Completa las dos respuestas primero 💜";
    } else if (respuesta1 === "respirar" && respuesta2 === "hablar") {
        resultado.textContent =
            "¡Excelente! Elegiste dos formas saludables de afrontar tus emociones. 🌷";
    } else {
        resultado.textContent =
            "¡Inténtalo otra vez! Piensa en opciones que te ayuden a sentirte mejor. 💜";
    }
}

function guardarMeta() {
    const campo = document.getElementById("meta-semanal");
    const mostrar = document.getElementById("mostrar-meta");
    const meta = campo.value.trim();

    if (meta === "") {
        mostrar.textContent = "Escribe tu meta primero 😊";
    } else {
        mostrar.textContent = "Tu meta de esta semana: " + meta + " ✨";
    }
}

function elegirActividad() {
    const actividades = [
        "Escucha tu canción favorita 🎵",
        "Toma un descanso de las pantallas 📵",
        "Ordena un pequeño espacio de tu habitación 🪻",
        "Escribe tres cosas buenas de tu día 💜",
        "Sal a caminar un ratito, si es seguro 🚶‍♀️",
        "Dedica unos minutos a respirar con calma 🌬️",
        "Habla con alguien que te haga sentir bien 🫶"
    ];

    const numero = Math.floor(Math.random() * actividades.length);
    const sorpresa = document.getElementById("actividad-sorpresa");

    sorpresa.textContent = actividades[numero];
}

console.log("JavaScript conectado correctamente");

function cambiarTema() {
    document.body.classList.toggle("modo-oscuro");

    const boton = document.getElementById("boton-tema");

    if (document.body.classList.contains("modo-oscuro")) {
        boton.textContent = "☀️";
    } else {
        boton.textContent = "🌙";
    }
}

window.addEventListener("scroll", function () {
    const boton = document.getElementById("volver-arriba");

    if (boton) {
        if (window.scrollY > 200) {
            boton.style.display = "block";
        } else {
            boton.style.display = "none";
        }
    }
});


const sonidoLluvia = document.querySelector("#sonidoLluvia");
const iniciarSonido = document.querySelector("#iniciarSonido");
const detenerSonido = document.querySelector("#detenerSonido");
const estadoSonido = document.querySelector("#estadoSonido");

iniciarSonido.addEventListener("click", async () => {
    try {
        await sonidoLluvia.play();
        estadoSonido.textContent = "La lluvia está sonando 🌧️";
    } catch (error) {
        estadoSonido.textContent =
            "No se pudo reproducir. Revisa que el archivo de audio exista.";
    }
});

detenerSonido.addEventListener("click", () => {
    sonidoLluvia.pause();
    sonidoLluvia.currentTime = 0;
    estadoSonido.textContent = "El sonido está apagado.";
});

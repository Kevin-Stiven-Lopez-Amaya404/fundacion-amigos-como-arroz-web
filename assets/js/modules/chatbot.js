import { SELECTORS, CONTACT, WHATSAPP_URL } from "./config.js";

// Chatbot de la portada: las preguntas rápidas responden al instante con textos fijos; lo que la persona
// escribe se responde con Claude (/api/chat). Si la API falla o no existe (npm start), vuelve a los textos fijos.
export function initChatbot() {
  const toggle = document.querySelector(SELECTORS.chatbotToggle);
  const panel = document.querySelector(SELECTORS.chatbotPanel);
  const close = document.querySelector(SELECTORS.chatbotClose);
  const messages = document.querySelector(SELECTORS.chatbotMessages);
  const form = document.querySelector(SELECTORS.chatbotForm);
  const input = document.querySelector(SELECTORS.chatbotInput);
  const quickButtons = document.querySelectorAll(SELECTORS.chatbotQuick);

  if (!toggle || !panel || !messages || !form || !input) return;

  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  // Cada respuesta es una lista de partes: texto o enlace { text, href }. Nunca HTML.
  const whatsapp = (href = WHATSAPP_URL) => ({ text: CONTACT.whatsappLabel, href });
  const answers = {
    phone: ["Puedes comunicarte con la fundación al WhatsApp ", whatsapp(), "."],
    location: ["Estamos ubicados en la Carrera 7A No. 16-25, barrio Quirinal, Neiva, Huila."],
    programs: ["Nuestros programas principales son Semilla, Siembra, Cosecha y Acompañamiento Psicosocial."],
    support: [
      "Puedes apoyar como voluntario, aliado o donante. Escríbenos por WhatsApp al ",
      whatsapp(`${WHATSAPP_URL}?text=${encodeURIComponent("Hola, quiero apoyar a la Fundación Amigos Como Arroz.")}`),
      "."
    ],
    default: [
      "Puedo ayudarte con teléfono, WhatsApp, ubicación, programas o formas de apoyo. Si necesitas atención directa, escríbenos al ",
      whatsapp(),
      "."
    ]
  };

  const getAnswer = (question) => {
    const text = normalize(question);

    if (/(telefono|celular|whatsapp|contacto|comunicar|llamar|numero)/.test(text)) {
      return answers.phone;
    }

    if (/(ubicacion|direccion|donde|carrera|quirinal|neiva|barrio)/.test(text)) {
      return answers.location;
    }

    if (/(programa|semilla|siembra|cosecha|psicosocial|actividad)/.test(text)) {
      return answers.programs;
    }

    if (/(apoyar|donar|donacion|voluntario|aliado|ayudar)/.test(text)) {
      return answers.support;
    }

    return answers.default;
  };

  // Enlaces que puede traer una respuesta de Claude: solo https y solo estos sitios.
  const HOSTS_PERMITIDOS = /^(wa\.me|(www\.)?instagram\.com|(www\.)?facebook\.com|fundacionamigoscomoarroz\.com)$/;
  const enlazar = (texto) => {
    const partes = [];
    let resto = 0;
    for (const m of texto.matchAll(/https:\/\/[^\s)]+/g)) {
      const url = m[0].replace(/[.,;:!?]+$/, "");
      let host = "";
      try { host = new URL(url).hostname; } catch { continue; }
      if (!HOSTS_PERMITIDOS.test(host)) continue;
      partes.push(texto.slice(resto, m.index), { text: url.replace(/^https:\/\//, ""), href: url });
      resto = m.index + url.length;
    }
    partes.push(texto.slice(resto));
    return partes.filter((p) => p !== "");
  };

  // Se arma con nodos DOM y textContent (sin innerHTML): así es seguro aunque las respuestas
  // pasen a un archivo de datos editable o el texto venga del usuario.
  const appendMessage = (content, type) => {
    const message = document.createElement("div");
    message.className = `chatbot-message chatbot-message--${type}`;

    for (const part of [].concat(content)) {
      if (typeof part === "string") {
        message.append(part);
        continue;
      }
      const link = document.createElement("a");
      link.href = part.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = part.text;
      message.append(link);
    }

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  };

  const historial = []; // { role: "user" | "assistant", text } de lo escrito a mano, para dar contexto a Claude
  let esperando = false;

  const preguntarAClaude = async (pregunta) => {
    historial.push({ role: "user", text: pregunta.slice(0, 600) });
    const escribiendo = appendMessage("Escribiendo…", "bot");
    escribiendo.classList.add("chatbot-message--typing");
    esperando = true;
    input.disabled = true;
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historial.slice(-8) }),
        signal: AbortSignal.timeout(30000)
      });
      const datos = await r.json().catch(() => ({}));
      if (!r.ok || typeof datos.reply !== "string") throw new Error(datos.error || String(r.status));
      historial.push({ role: "assistant", text: datos.reply.slice(0, 600) });
      escribiendo.remove();
      appendMessage(enlazar(datos.reply), "bot");
    } catch {
      historial.pop(); // la pregunta sin respuesta no se manda como contexto la próxima vez
      escribiendo.remove();
      appendMessage(getAnswer(pregunta), "bot");
    } finally {
      esperando = false;
      input.disabled = false;
      input.focus();
    }
  };

  const setOpen = (isOpen) => {
    panel.hidden = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      setTimeout(() => input.focus(), 80);
    }
  };

  const ask = (question) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    appendMessage(cleanQuestion, "user");
    appendMessage(getAnswer(cleanQuestion), "bot");
  };

  toggle.addEventListener("click", () => {
    setOpen(panel.hidden);
  });

  close?.addEventListener("click", () => {
    setOpen(false);
  });

  quickButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setOpen(true);
      ask(button.dataset.chatQuestion || button.textContent);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const pregunta = input.value.trim();
    if (!pregunta || esperando) return;
    input.value = "";
    appendMessage(pregunta, "user");
    preguntarAClaude(pregunta);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      setOpen(false);
    }
  });
}

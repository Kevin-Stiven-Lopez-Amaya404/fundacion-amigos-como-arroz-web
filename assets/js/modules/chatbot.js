import { SELECTORS, CONTACT, WHATSAPP_URL } from "./config.js";

// Chatbot basico con respuestas frecuentes de la fundacion.
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
    ask(input.value);
    input.value = "";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      setOpen(false);
    }
  });
}

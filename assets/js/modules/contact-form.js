import { SELECTORS, WHATSAPP_URL } from "./config.js";

// Valida el formulario antes de abrir WhatsApp con el mensaje armado por el usuario.
// Teléfono y correo son opcionales (WhatsApp ya muestra el número); si se escriben, deben ser válidos.
export function initContactForm() {
  const form = document.querySelector(SELECTORS.form);
  const status = document.querySelector(SELECTORS.formStatus);

  if (!form || !status) return;

  const fields = {
    name: form.elements.name,
    phone: form.elements.phone,
    email: form.elements.email,
    interest: form.elements.interest,
    message: form.elements.message
  };

  const setStatus = (message, color) => {
    status.textContent = message;
    status.style.color = color;
  };

  const setFieldError = (field, message) => {
    const error = document.querySelector(`#${field.id}-error`);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) {
      error.textContent = message;
    }
  };

  const validators = {
    name(value) {
      if (!value) return "Escribe tu nombre completo.";
      if (value.length < 3) return "El nombre debe tener al menos 3 caracteres.";
      if (!/^[\p{L}\s.'-]+$/u.test(value)) return "Usa solo letras y espacios en el nombre.";
      if (value.trim().split(/\s+/).length < 2) return "Incluye nombre y apellido.";
      return "";
    },
    phone(value) {
      const digits = value.replace(/\D/g, "");
      if (!value) return "";
      if (digits.length < 7 || digits.length > 15) return "El teléfono debe tener entre 7 y 15 dígitos.";
      if (/^(\d)\1+$/.test(digits)) return "Ingresa un teléfono válido.";
      return "";
    },
    email(value) {
      if (!value) return "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "Ingresa un correo electrónico válido.";
      return "";
    },
    interest(value) {
      if (!value) return "Selecciona un interés.";
      return "";
    },
    message(value) {
      if (!value) return "Escribe tu mensaje.";
      if (value.length < 10) return "Cuéntanos un poco más (al menos 10 caracteres).";
      if (value.length > 700) return "El mensaje no debe superar los 700 caracteres.";
      return "";
    }
  };

  const getValues = () => ({
    name: fields.name.value.trim(),
    phone: fields.phone.value.trim(),
    email: fields.email.value.trim(),
    interest: fields.interest.value.trim(),
    message: fields.message.value.trim()
  });

  const validateField = (name) => {
    const field = fields[name];
    const value = field.value.trim();
    const error = validators[name](value);
    setFieldError(field, error);
    return !error;
  };

  Object.keys(fields).forEach((name) => {
    const eventName = fields[name].tagName === "SELECT" ? "change" : "input";
    fields[name].addEventListener(eventName, () => {
      if (fields[name].getAttribute("aria-invalid") === "true") {
        validateField(name);
      }
      setStatus("", "");
    });

    fields[name].addEventListener("blur", () => {
      validateField(name);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = Object.keys(fields).map(validateField).every(Boolean);
    const values = getValues();

    if (!isValid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      setStatus("Revisa los campos marcados antes de enviar.", "#b42318");
      return;
    }

    const interestLabels = {
      programas: "Inscripción a un programa",
      donacion: "Donación",
      voluntariado: "Voluntariado",
      alianza: "Alianza",
      informacion: "Información general"
    };

    const whatsappMessage = [
      "Hola, quiero contactar a la Fundación Amigos Como Arroz.",
      "",
      `Nombre: ${values.name}`,
      values.phone ? `Teléfono: ${values.phone}` : null,
      values.email ? `Correo: ${values.email}` : null,
      `Interés: ${interestLabels[values.interest] || values.interest}`,
      "",
      `Mensaje: ${values.message}`
    ]
      .filter((linea) => linea !== null)
      .join("\n");

    const whatsappUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`;

    setStatus("Validación correcta. Te redirigiremos a WhatsApp para completar el envío.", "#5f8f73");
    if (typeof window.gtag === "function") {
      window.gtag("event", "envio_formulario_whatsapp", {
        event_category: "contacto",
        event_label: interestLabels[values.interest] || values.interest
      });
    }
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    form.reset();
    Object.values(fields).forEach((field) => setFieldError(field, ""));
  });
}

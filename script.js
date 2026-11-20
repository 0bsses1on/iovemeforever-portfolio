// ============================================
// НАСТРОЙКИ TELEGRAM
// ============================================
const TELEGRAM_TOKEN = "97d40f94-e32a-4ee1-8b94-a0beb2817441";
const CHAT_ID = "808720203";

// Ждём, когда страница загрузится
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lead-form");
  const status = document.getElementById("form-status");
  const btn = form.querySelector(".submit-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Отменяем стандартную отправку формы

    // Собираем данные
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Простая проверка
    if (!name || !phone || !message) {
      showStatus("Заполни все поля", "error");
      return;
    }

    // Формируем текст заявки
    const text = `🔔 НОВАЯ ЗАЯВКА\n\nИмя: ${name}\nКонтакт: ${phone}\nСообщение: ${message}`;

    btn.disabled = true;
    btn.textContent = "Отправляю...";

    try {
      // Отправляем в Telegram
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
          }),
        },
      );

      const data = await res.json();

      if (data.ok) {
        showStatus("✅ Заявка отправлена! Я свяжусь с тобой.", "success");
        form.reset();
      } else {
        showStatus("❌ Ошибка: " + (data.description || "неизвестно"), "error");
      }
    } catch (err) {
      showStatus("❌ Ошибка сети. Попробуй позже.", "error");
    } finally {
      btn.disabled = false;
      btn.textContent = "Отправить заявку";
    }
  });

  function showStatus(msg, type) {
    status.textContent = msg;
    status.className = "form-status " + type;
  }
});

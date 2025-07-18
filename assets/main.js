// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Chatbot integration

document.addEventListener('DOMContentLoaded', function () {
  const fab = document.getElementById('open-chatbot');
  const modal = document.getElementById('chatbot-modal');
  const closeBtn = document.getElementById('close-chatbot');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');

  fab.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const userMsg = input.value;
    if (!userMsg) return;
    // Show user message
    messages.innerHTML += `<div class='mb-2 text-right'><span class='inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full'>${userMsg}</span></div>`;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    // Call Shapes Inc chatbot API
    try {
      const res = await fetch('https://api.shapes.inc/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer RHUFDYW7E4PA71KJV8DUXZXJZRIAJN5WOM4QIWXZJTO'
        },
        body: JSON.stringify({
          model: 'shapesinc/dexpie',
          messages: [
            { role: 'user', content: userMsg }
          ]
        })
      });
      const data = await res.json();
      // OpenAI-compatible response: data.choices[0].message.content
      const botMsg = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ? data.choices[0].message.content : 'No response.';
      messages.innerHTML += `<div class='mb-2 text-left'><span class='inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full'>${botMsg}</span></div>`;
      messages.scrollTop = messages.scrollHeight;
    } catch (err) {
      messages.innerHTML += `<div class='mb-2 text-left'><span class='inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full'>Error connecting to chatbot.</span></div>`;
      messages.scrollTop = messages.scrollHeight;
    }
  });
});

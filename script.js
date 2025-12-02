// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function() {

    // Seleciona o link do botão "Agendamento"
    const whatsappLink = document.getElementById("whatsapp-link");

    // Número da barbearia (altere para o número real)
    const numeroWhatsApp = "+5511999999999";

    // Mensagem que aparecerá automaticamente no WhatsApp
    const mensagem = encodeURIComponent(
        "Olá! Gostaria de agendar um horário na Barbearia Old Style."
    );

    // Monta a URL completa do WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace(/\D/g, "")}?text=${mensagem}`;

    // Define o link no botão
    whatsappLink.href = urlWhatsApp;

    // Abre em nova aba
    whatsappLink.target = "_blank";
});

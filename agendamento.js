/* ==========================================================
   Conexão do formulário de agendamento com o Supabase.
   Cole este arquivo como agendamento.js e inclua no HTML com:
   <script src="agendamento.js"></script>
   (depois da tag do supabase-js, veja agendamento-secao.html)
   ========================================================== */

// TROQUE pelos valores do seu projeto (Project Settings > API)
const SUPABASE_URL = https://tfnishpevzkqoazvtgyy.supabase.co;
const SUPABASE_ANON_KEY = sb_publishable_iFccM5aDwe1vOuyD9oin1Q_ABJd6jvE;

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const formAgendamento = document.getElementById('form-agendamento');
const mensagemAgendamento = document.getElementById('mensagem-agendamento');

formAgendamento.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const dados = Object.fromEntries(new FormData(formAgendamento).entries());

  mensagemAgendamento.textContent = 'Enviando...';
  mensagemAgendamento.style.color = '';

  const { error } = await supabase.from('agendamentos').insert({
    nome: dados.nome,
    telefone: dados.telefone,
    data: dados.data,
    horario: dados.horario,
    servico: dados.servico,
  });

  if (error) {
    // Código 23505 = violação da regra "unique (data, horario)" que criamos no SQL
    if (error.code === '23505') {
      mensagemAgendamento.textContent = 'Esse horário já foi reservado. Escolha outro.';
    } else {
      mensagemAgendamento.textContent = 'Não foi possível agendar. Tente novamente.';
      console.error(error);
    }
    mensagemAgendamento.style.color = '#b00020';
    return;
  }

  mensagemAgendamento.textContent = 'Agendamento confirmado! Te esperamos.';
  mensagemAgendamento.style.color = 'green';
  formAgendamento.reset();
});

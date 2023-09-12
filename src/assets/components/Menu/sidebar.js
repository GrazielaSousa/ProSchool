// Inicialização de tipoUsuario
export let tipoUsuario = localStorage.getItem('tipoUsuario'); // Valor padrão 'admin'

// Função para atualizar e armazenar o valor em localStorage
export function setTipoUsuarioLogado(valor) {
  tipoUsuario = valor;
  localStorage.setItem('tipoUsuario', valor);
  console.log('Tipo de usuário logado em sidebar: ', tipoUsuario);
}


export const menuTipoUsuario = {
  aluno: [
    { label: 'Dashboard', link: '/Dashboard', icon: 'grid_view' },
    // { label: 'Tarefas', link: '/Tarefas', icon: 'task_alt' },
    { label: 'Desempenho', link: '/Desempenho', icon: 'pie_chart' },
    { label: 'Materiais', link: '/Materiais', icon: 'collections_bookmark' },
    { label: 'Configurações', link: '/Configurações', icon: 'settings' },
    { label: 'Sair', link: '/Sair', icon: 'logout' },
  ],
  professor: [
    { label: 'Dashboard', link: '/Dashboard', icon: 'grid_view' },
    { label: 'Alunos', link: '/Alunos', icon: 'school' },
    // { label: 'Atividades', link: '/Atividades', icon: 'task_alt' },
    { label: 'Materiais', link: '/Materiais', icon: 'collections_bookmark' },
    { label: 'Configurações', link: '/Configurações', icon: 'settings' },
    { label: 'Sair', link: '/Sair', icon: 'logout' },
  ],
  responsavel: [
    // { label: 'Dashboard', link: '/Dashboard', icon: 'grid_view' },
    { label: 'Dados do Aluno', link: '/DadosAluno', icon: 'description' },
    { label: 'Configurações', link: '/Configurações', icon: 'settings' },
    { label: 'Sair', link: '/Sair', icon: 'logout' },
  ],
  admin: [
    { label: 'Dashboard', link: '/Dashboard', icon: 'grid_view' },
    // { label: 'Alunos', link: '/Alunos', icon: 'school' },
    { label: 'Cadastrar usuário', link: '/Professores', icon: 'people_alt' },
    // { label: 'Configurações', link: '/Configurações', icon: 'settings' },
    { label: 'Sair', link: '/Sair', icon: 'logout' },
  ],
};

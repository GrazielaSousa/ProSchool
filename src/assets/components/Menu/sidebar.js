// Inicialização de tipoUsuario
export let tipoUsuario = localStorage.getItem('tipoUsuario'); // Valor padrão 'admin'

// Função para atualizar e armazenar o valor em localStorage
export function setTipoUsuarioLogado(valor) {
  tipoUsuario = valor;
  localStorage.setItem('tipoUsuario', valor);
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
<<<<<<< HEAD
=======
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
>>>>>>> parent of 67f6227 (Servidor backend)
  admin: [
    { label: 'Usuários', link: '/Usuarios', icon: 'people_alt' },
    { label: 'Cadastrar usuário', link: '/Professores', icon: 'person' },
    {label: 'Adicional material', link: '/AdicionalMaterial', icon: 'add'},
    { label: 'Sair', link: '/Sair', icon: 'logout' },
  ],
};

export const tipoUsuario = 'responsavel'; // DEVE VIR DO BANCO DE DADOS O TIPO DE USUARIO

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

// Inicialização de tipoUsuario
export let tipoUsuario = localStorage.getItem('tipoUsuario'); // Valor padrão 'admin'

// Função para atualizar e armazenar o valor em localStorage
export function setTipoUsuarioLogado(valor) {
  tipoUsuario = valor;
  localStorage.setItem('tipoUsuario', valor);
}

export const menuTipoUsuario = {
  aluno: [
    { label: 'Materiais', link: '/Materiais', icon: 'collections_bookmark' },
    { label: 'Desempenho', link: '/Desempenho', icon: 'pie_chart' },
    { label: 'Sair', link: '/Sair', icon: 'logout' },
  ],
  admin: [
    { label: 'Usuários', link: '/Usuarios', icon: 'people_alt' },
    { label: 'Cadastrar usuário', link: '/Professores', icon: 'person' },
    {label: 'Adicional material', link: '/AdicionalMaterial', icon: 'add'},
    { label: 'Sair', link: '/Sair', icon: 'logout' },
  ],
};

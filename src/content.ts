// Todo o texto e os dados da página ficam aqui. Edite este arquivo para trocar conteúdo.

export const contact = {
  whatsappNumber: '5598984194798',
  whatsappDisplay: '(98) 98419-4798',
  instagramHandle: '@suna.develop',
  instagramUrl: 'https://www.instagram.com/suna.develop/',
};

export function whatsappLink(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultMessage = 'Olá, SUNA! Vim pelo site e quero conversar sobre um projeto.';

export const nav = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#processo', label: 'Como trabalhamos' },
];

export const pains = [
  {
    message: 'Alguém tem a planilha atualizada? Achei três versões aqui.',
    time: '08:12',
    cost: 'Planilha e WhatsApp viraram o sistema. A informação se espalha e o retrabalho cresce.',
  },
  {
    message: 'O sistema parou de novo e o rapaz que fez não responde mais.',
    time: '10:47',
    cost: 'O freelancer sumiu. Ninguém sabe como o sistema foi feito nem quem pode consertar.',
  },
  {
    message: 'Chegou a proposta da consultoria. Prazo de um ano e o valor não cabe.',
    time: '16:30',
    cost: 'Consultoria grande demais: prazo longo e um preço fora do seu orçamento.',
  },
];

export type ServiceIcon = 'system' | 'platform' | 'data' | 'infra';

export const services: { title: string; text: string; examples: string; icon: ServiceIcon }[] = [
  {
    title: 'sistemas web',
    text: 'Cadastros, controles, relatórios e rotinas da sua equipe reunidos em um só sistema.',
    examples: 'gestão escolar, controle de estoque, atendimento, agendamentos',
    icon: 'system',
  },
  {
    title: 'plataformas',
    text: 'Portais e ambientes online para clientes, alunos, parceiros ou cidadãos.',
    examples: 'portais de serviço, ensino a distância, áreas do cliente',
    icon: 'platform',
  },
  {
    title: 'dados e relatórios',
    text: 'Seus números organizados em painéis e relatórios fáceis de entender.',
    examples: 'painéis de indicadores, relatórios automáticos, integração de bases',
    icon: 'data',
  },
  {
    title: 'infraestrutura',
    text: 'Servidores, backups e segurança cuidados por quem construiu o sistema.',
    examples: 'hospedagem, backups, monitoramento, atualizações',
    icon: 'infra',
  },
];

// Projetos de exemplo. Troque cada item por um projeto real (nome, desafio, resultado, tecnologias)
// e, se tiver, uma captura de tela: importe o arquivo e passe em `image`, com `imageAlt` descrevendo a tela.
export const projects: {
  category: string;
  name: string;
  challenge: string;
  result: string;
  stack: string[];
  image?: string;
  imageAlt?: string;
  placeholder: boolean;
}[] = [
  {
    category: 'Sistema de gestão',
    name: '[nome do projeto]',
    challenge: '[A situação do cliente antes do projeto, em uma frase.]',
    result: '[O que mudou depois, de preferência com um número.]',
    stack: ['[Tecnologia]', '[Tecnologia]'],
    placeholder: true,
  },
  {
    category: 'Plataforma de ensino',
    name: '[nome do projeto]',
    challenge: '[A situação do cliente antes do projeto, em uma frase.]',
    result: '[O que mudou depois, de preferência com um número.]',
    stack: ['[Tecnologia]', '[Tecnologia]'],
    placeholder: true,
  },
  {
    category: 'Painel de dados',
    name: '[nome do projeto]',
    challenge: '[A situação do cliente antes do projeto, em uma frase.]',
    result: '[O que mudou depois, de preferência com um número.]',
    stack: ['[Tecnologia]', '[Tecnologia]'],
    placeholder: true,
  },
  {
    category: 'Aplicativo',
    name: '[nome do projeto]',
    challenge: '[A situação do cliente antes do projeto, em uma frase.]',
    result: '[O que mudou depois, de preferência com um número.]',
    stack: ['[Tecnologia]', '[Tecnologia]'],
    placeholder: true,
  },
  {
    category: 'Chatbot de WhatsApp',
    name: '[nome do projeto]',
    challenge: '[A situação do cliente antes do projeto, em uma frase.]',
    result: '[O que mudou depois, de preferência com um número.]',
    stack: ['[Tecnologia]', '[Tecnologia]'],
    placeholder: true,
  },
];

export const reasons = [
  {
    title: 'Equipe completa',
    text: 'Backend, frontend, dados e infraestrutura. Seu projeto não depende de uma única pessoa.',
  },
  {
    title: 'Do código à infraestrutura',
    text: 'Quem desenvolve também publica, monitora e mantém o sistema no ar.',
  },
  {
    title: 'Acompanhamento próximo',
    text: 'Conversa direta, entregas em etapas e você vendo o sistema crescer.',
  },
];

export const steps = [
  { title: 'Conversa', text: 'Entendemos seu problema, sua rotina e o que realmente precisa mudar.' },
  { title: 'Proposta', text: 'Escopo, prazo e valor claros, por escrito, antes de começar.' },
  { title: 'Desenvolvimento', text: 'Entregas em etapas curtas, com você validando cada uma.' },
  { title: 'Entrega e suporte', text: 'Sistema no ar, equipe treinada e suporte para o que vier depois.' },
];

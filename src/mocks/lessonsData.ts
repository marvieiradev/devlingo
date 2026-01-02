export interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface Lesson {
  id: string;
  unitId: number;
  unit: number;
  title: string;
  description: string;
  questions: Question[];
  xpReward: number;
}
export const lessonsData: Lesson[] = [
  {
    id: "js-beginner-1",
    unitId: 1,
    unit: 1,
    title: "Variáveis e tipos",
    description: "Aprenda a declarar e usar variáveis no JavaScript.",
    xpReward: 10,
    questions: [
      {
        id: "q1",
        question: "Qual palavra-chave permite alterar o valor depois?",
        options: ["const", "let", "function", "class"],
        correctAnswer: 1,
        explanation: "`let` permite reatribuição de valor.",
      },
      {
        id: "q2",
        question: "Qual palavra-chave cria uma constante?",
        options: ["var", "let", "const", "static"],
        correctAnswer: 2,
        explanation: "`const` cria uma variável que não pode ser reatribuída.",
      },
      {
        id: "q3",
        question: "Qual dessas NÃO é uma forma válida de declarar variável?",
        options: ["var nome", "let nome", "const nome", "define nome"],
        correctAnswer: 3,
        explanation: "`define` não existe no JavaScript.",
      },
      {
        id: "q4",
        question: "Qual escopo o `let` possui?",
        options: ["Global", "De bloco", "Somente função", "Nenhum"],
        correctAnswer: 1,
        explanation: "`let` possui escopo de bloco.",
      },
    ],
  },

  {
    id: "js-beginner-2",
    unitId: 2,
    unit: 2,
    title: "Condicionais",
    description: "Use if, else e switch para controlar decisões.",
    xpReward: 10,
    questions: [
      {
        id: "q1",
        question:
          "Qual palavra-chave usamos para executar um bloco quando a condição é verdadeira?",
        options: ["for", "if", "switch", "while"],
        correctAnswer: 1,
        explanation: "`if` executa o bloco quando a condição é verdadeira.",
      },
      {
        id: "q2",
        question: "Qual estrutura é usada para testar múltiplos casos?",
        options: ["if", "else", "switch", "for"],
        correctAnswer: 2,
        explanation: "`switch` é usado quando há vários casos possíveis.",
      },
      {
        id: "q3",
        question: "Qual operador compara valores e tipos?",
        options: ["=", "==", "===", "!="],
        correctAnswer: 2,
        explanation: "`===` compara valor e tipo (comparação estrita).",
      },
      {
        id: "q4",
        question: "O que o `else` faz em uma estrutura condicional?",
        options: [
          "Repete o código",
          "Finaliza o programa",
          "Executa quando o if é falso",
          "Cria uma variável",
        ],
        correctAnswer: 2,
        explanation: "`else` executa quando a condição do `if` é falsa.",
      },
    ],
  },

  {
    id: "js-beginner-3",
    unitId: 3,
    unit: 3,
    title: "Funções",
    description: "Use funções para organizar e reutilizar código.",
    xpReward: 10,
    questions: [
      {
        id: "q1",
        question: "Qual palavra-chave cria uma função tradicional?",
        options: ["func", "def", "function", "create"],
        correctAnswer: 2,
        explanation: "`function` define uma função tradicional.",
      },
      {
        id: "q2",
        question: "O que uma função pode retornar?",
        options: [
          "Apenas números",
          "Apenas strings",
          "Apenas booleanos",
          "Qualquer valor",
        ],
        correctAnswer: 3,
        explanation: "Funções podem retornar qualquer tipo de dado.",
      },
      {
        id: "q3",
        question: "Qual símbolo é usado em arrow functions?",
        options: ["=>", "->", "::", "**"],
        correctAnswer: 0,
        explanation: "`=>` define uma arrow function.",
      },
      {
        id: "q4",
        question: "Como chamamos os valores passados para a função?",
        options: ["Variáveis", "Retornos", "Parâmetros", "Argumentos"],
        correctAnswer: 3,
        explanation: "Os valores passados são chamados de argumentos.",
      },
    ],
  },
  {
    id: "js-beginner-4",
    unitId: 4,
    unit: 4,
    title: "Arrays e Objetos",
    description: "Organize dados usando arrays e objetos.",
    xpReward: 10,
    questions: [
      {
        id: "q1",
        question: "Qual estrutura armazena uma lista de valores?",
        options: ["Objeto", "Array", "Função", "Classe"],
        correctAnswer: 1,
        explanation: "Arrays armazenam listas de valores.",
      },
      {
        id: "q2",
        question: "Como acessamos o primeiro item de um array?",
        options: ["array(1)", "array[1]", "array[0]", "array.first"],
        correctAnswer: 2,
        explanation: "Arrays começam no índice 0.",
      },
      {
        id: "q3",
        question: "Como acessamos uma propriedade de objeto?",
        options: ["obj->prop", "obj.prop", "obj[prop()]", "obj::prop"],
        correctAnswer: 1,
        explanation: "Usamos ponto ou colchetes para acessar propriedades.",
      },
      {
        id: "q4",
        question: "Qual tipo de dado é um objeto?",
        options: ["string", "number", "object", "array"],
        correctAnswer: 2,
        explanation: "Objetos possuem o tipo `object`.",
      },
    ],
  },
  {
    id: "js-beginner-5",
    unitId: 5,
    unit: 5,
    title: "Laços de Repetição",
    description: "Repita código usando estruturas de loop.",
    xpReward: 10,
    questions: [
      {
        id: "q1",
        question:
          "Qual laço é mais usado quando sabemos a quantidade de repetições?",
        options: ["while", "do while", "for", "if"],
        correctAnswer: 2,
        explanation: "`for` é ideal quando sabemos o número de repetições.",
      },
      {
        id: "q2",
        question: "Qual método percorre arrays facilmente?",
        options: ["map()", "forEach()", "filter()", "reduce()"],
        correctAnswer: 1,
        explanation: "`forEach()` percorre cada item do array.",
      },
      {
        id: "q3",
        question: "Qual laço executa pelo menos uma vez?",
        options: ["for", "while", "do while", "switch"],
        correctAnswer: 2,
        explanation: "`do while` executa ao menos uma vez.",
      },
      {
        id: "q4",
        question: "O que acontece se um while nunca for falso?",
        options: [
          "O código para",
          "Erro de sintaxe",
          "Loop infinito",
          "Nada acontece",
        ],
        correctAnswer: 2,
        explanation: "Isso gera um loop infinito.",
      },
    ],
  },

  {
    id: "js-beginner-6",
    unitId: 6,
    unit: 6,
    title: "Operadores",
    description: "Utilize operadores aritméticos, lógicos e de comparação.",
    xpReward: 10,
    questions: [
      {
        id: "q1",
        question: "Qual operador é usado para somar valores?",
        options: ["-", "*", "+", "/"],
        correctAnswer: 2,
        explanation: "O operador `+` é usado para soma.",
      },
      {
        id: "q2",
        question: "Qual operador lógico representa o E (AND)?",
        options: ["||", "&&", "!", "??"],
        correctAnswer: 1,
        explanation:
          "`&&` retorna true se ambas as condições forem verdadeiras.",
      },
      {
        id: "q3",
        question: "Qual operador inverte um valor booleano?",
        options: ["&&", "||", "!", "=="],
        correctAnswer: 2,
        explanation: "`!` inverte o valor booleano.",
      },
      {
        id: "q4",
        question: "Qual operador verifica se valores são diferentes?",
        options: ["==", "===", "!=", "="],
        correctAnswer: 2,
        explanation: "`!=` verifica se os valores são diferentes.",
      },
    ],
  },

  {
    id: "js-beginner-7",
    unitId: 7,
    unit: 7,
    title: "Manipulação de Strings",
    description: "Use métodos para manipular textos no JavaScript.",
    xpReward: 10,
    questions: [
      {
        id: "q1",
        question: "Qual método retorna o tamanho de uma string?",
        options: ["length()", "size()", "count()", "length"],
        correctAnswer: 3,
        explanation: "`length` retorna a quantidade de caracteres da string.",
      },
      {
        id: "q2",
        question: "Qual método transforma texto em maiúsculo?",
        options: ["toUpper()", "upperCase()", "toUpperCase()", "capitalize()"],
        correctAnswer: 2,
        explanation: "`toUpperCase()` transforma o texto em maiúsculo.",
      },
      {
        id: "q3",
        question: "Qual método divide uma string em partes?",
        options: ["slice()", "split()", "join()", "replace()"],
        correctAnswer: 1,
        explanation: "`split()` divide a string em um array.",
      },
      {
        id: "q4",
        question: "Qual método substitui parte de uma string?",
        options: ["change()", "replace()", "swap()", "update()"],
        correctAnswer: 1,
        explanation: "`replace()` substitui parte de uma string.",
      },
    ],
  },
];

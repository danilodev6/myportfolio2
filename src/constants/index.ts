import {
  car,
  contact,
  css,
  estate,
  git,
  github,
  html,
  javascript,
  linkedin,
  pricewise,
  python,
  react,
  sass,
  snapgram,
  solidity,
  summiz,
  tailwindcss,
  threads,
  typescript,
  sql,
  django,
  githublight,
  linkedinlight,
} from "../assets/icons";

const skills = [
  {
    imageUrl: html,
    name: "HTML",
    type: "Frontend",
  },
  {
    imageUrl: css,
    name: "CSS",
    type: "Frontend",
  },
  {
    imageUrl: tailwindcss,
    name: "Tailwind CSS",
    type: "Frontend",
  },
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Frontend",
  },
  {
    imageUrl: solidity,
    name: "Solidity",
    type: "Backend",
  },
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  {
    imageUrl: typescript,
    name: "TypeScript",
    type: "Frontend",
  },

  {
    imageUrl: python,
    name: "Python",
    type: "Backend",
  },
  // {
  //   imageUrl: django,
  //   name: "Django",
  //   type: "Backend",
  // },
  {
    imageUrl: sql,
    name: "SQL",
    type: "Data Base",
  },
  {
    imageUrl: git,
    name: "Git",
    type: "Version Control",
  },
  {
    imageUrl: github,
    name: "GitHub",
    type: "Version Control",
  },
  {
    imageUrl: sass,
    name: "Sass",
    type: "Frontend",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    iconUrl: githublight,
    link: "https://github.com/danilodev6",
  },
  {
    name: "LinkedIn",
    iconUrl: linkedinlight,
    link: "https://www.linkedin.com/in/danilozabalet",
  },
];

const projects = [
  {
    iconUrl: summiz,
    theme: "btn-back-red",
    name: "Auction App",
    description:
      "Currently in working. React web app for auctioning items, featuring user authentication, item listing, and bidding functionality",
    link: "https://github.com/danilodev6/auction-app",
  },
  {
    iconUrl: pricewise,
    theme: "btn-back-green",
    name: "Crowdfunding web3 dApp",
    description:
      "A decentralized crowdfunding application enabling creators to raise funds transparently through smart contracts built with thirdweb platform.",
    link: "https://github.com/danilodev6/Crowdfunding-web3-dApp",
  },
  {
    iconUrl: summiz,
    theme: "btn-back-red",
    name: "Movie Finder API",
    description: "React app fetching movie data from external APIm demonstrating API calls and dynamic rendering",
    link: "https://github.com/danilodev6/Movie-Finder",
  },
  {
    iconUrl: threads,
    theme: "btn-back-green",
    name: "TicTacToePRO version",
    description: "React-based game featuring state management , game logic and a dynamic UI",
    link: "https://github.com/danilodev6/TicTacToePRO",
  },
  // {
  //   iconUrl: estate,
  //   theme: "btn-back-blue",
  //   name: "Image-Phrase Fetching",
  //   description:
  //     "Fetching random images and phrases from an API, delivers a unique combination with every refresh. Built with React, it provides a simple yet engaging experience.",
  //   link: "https://github.com/danilodev6/Phrase-Image-Fetch",
  // },
  // {
  //   iconUrl: snapgram,
  //   theme: "btn-back-pink",
  //   name: "Connect Four Game",
  //   description:
  //     "a React-powered strategy game where two players compete to connect four pieces in a row. With a sleek interface and real-time updates, state management and game logic",
  //   link: "https://github.com/danilodev6/4inline",
  // },
  {
    iconUrl: car,
    theme: "btn-back-black",
    name: "Weather APP",
    description:
      "Vanilla JS weather app, fetching and displaying real-time weather data from an API and dynamic rendering",
    link: "https://github.com/danilodev6/weather-app",
  },
  {
    iconUrl: pricewise,
    theme: "btn-back-yellow",
    name: "To-do List",
    description:
      "Basic to-do list application built with vanilla JS, IT demonstrate fundamental DOM manipulation, event handling, and local storage usage",
    link: "https://github.com/danilodev6/todo-list",
  },
];

export { skills, socialLinks, projects };

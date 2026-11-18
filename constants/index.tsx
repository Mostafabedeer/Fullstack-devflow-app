export const themes = [
  { value: "light", label: "Light", icon: "/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/icons/moon.svg" },
  { value: "system", label: "System", icon: "/icons/computer.svg" },
];

export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },

  {
    imgURL: "/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const FILTER_OPTIONS = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Rcommended Questions",
    value: "recommended",
  },
  {
    name: "Frequent",
    value: "frequent",
  },
  {
    name: "Unanswered",
    value: "unanswered",
  },
];

export const TAG_FILTER_OPTIONS = [
  { name: "Popular", value: "popular" },
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
  { name: "Name", value: "name" },
];

// upvote, answer, view,

export const AUTHOR_QUESTION_DATA = [
  {
    upvotes: 10,
    answers: 5,
    views: 100,
  },
  {
    upvotes: 20,
    answers: 8,
    views: 300,
  },
  {
    upvotes: 5,
    answers: 2,
    views: 50,
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

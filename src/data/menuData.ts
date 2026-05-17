// import MenuOne from "../../public/assets/img/menu/img-1.jpg";
// import MenuTwo from "../../public/assets/img/menu/img-2.jpg";
// import MenuThree from "../../public/assets/img/menu/img-3.jpg";
// import MenuFour from "../../public/assets/img/menu/img-4.jpg";
// import MenuFive from "../../public/assets/img/menu/img-5.jpg";

const menu_data_one = [
  {
    id: 1,
    label: "Buy",
    url: "/",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 1,
        label: "Residential",
        url: "/search",
        img: "",
      },
      {
        id: 2,
        label: "Commercial",
        url: "/search",
        img: "",
      },
      {
        id: 3,
        label: "New Launch",
        url: "/search",
        img: "",
      },
      {
        id: 4,
        label: "Auction",
        url: "/search",
        img: "",
      },
    ],
  },
  {
    id: 2,
    label: "Rent",
    url: "/",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 1,
        label: "Residential",
        url: "/search",
        img: "",
      },
      {
        id: 2,
        label: "Commercial",
        url: "/search",
        img: "",
      },
    ],
  },
  {
    id: 3,
    label: "New Projects",
    url: "/",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 1,
        label: "Residential",
        url: "/search",
        img: "",
      },
      {
        id: 2,
        label: "Commercial",
        url: "/search",
        img: "",
      },
    ],
  },
  {
    id: 4,
    label: "Services",
    url: "#",
    submenu: [
      { id: 1, label: "Home loan", url: "/error" },
      { id: 2, label: "EMI calculator", url: "/emi-calculator" },
      { id: 3, label: "Interior design", url: "/interior-design" },
    ],
  },
  {
    id: 5,
    label: "More",
    url: "#",
    submenu: [
      { id: 1, label: "About", url: "/about" },
      { id: 2, label: "Pricing", url: "/pricing" },
      { id: 3, label: "Contact", url: "/contact" },
      { id: 4, label: "Faq", url: "/faq" },
    ],
  },
];

export default menu_data_one;

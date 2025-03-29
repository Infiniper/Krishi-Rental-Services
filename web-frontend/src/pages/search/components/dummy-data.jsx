import React from "react";

const dummyData = [
    {
      image: "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg",
      title: "John Deere 5050D",
      distance: 5,
      price: 1200,
      available: "Available",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },

    {
      image: "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg",
      title: "Mahindra Arjun Novo",
      distance: 12,
      price: 1500,
      available: "Available",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },

    {
      image: "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg",
      title: "Swaraj 744 FE",
      distance: 8,
      price: 1100,
      available: "Not Available",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },

    {
      image: "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg",
      title: "Kubota MU4501",
      distance: 15,
      price: 1700,
      available: "Not Available",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },

    {
      image: "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg",
      title: "New Holland 3630 TX",
      distance: 10,
      price: 1400,
      available: "Available",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },

    {
      image: "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg",
      title: "John Deere 5050D",
      distance: 5,
      price: 1200,
      available: "Not Available",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },

    {
      image: "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg",
      title: "Mahindra Arjun Novo",
      distance: 12,
      price: 1500,
      available: "Not Available",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },

    {
      image: "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg",
      title: "Swaraj 744 FE",
      distance: 8,
      price: 1100,
      available: "Available",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    
    {
      image: "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg",
      title: "Kubota MU4501",
      distance: 15,
      price: 1700,
      available: "Not Available",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      image: "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg",
      title: "New Holland 3630 TX",
      distance: 10,
      price: 1400,
      available: "Available",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }
  ];
  

  export default dummyData;
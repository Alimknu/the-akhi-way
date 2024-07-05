const restaurants = [
  {
    id: "1",
    name: "Restaurant A",
    rating: 4.5,
    reviews: 120,
    priceRange: "$$",
    cuisine: "Italian",
    description: "Restaurant A is known for its delicious Italian cuisine.",
    images: ["path-to-image1.jpg", "path-to-image2.jpg", "path-to-image3.jpg"],
    location: "123 Blank St, City, Province, Postal Code",
    hours: "11 a.m. - 10 p.m. every day",
    phone: "+1234567890",
    reviewsData: [
      {
        date: "June 6, 2024",
        rating: 5,
        text: "Amazing food, loved the environment. Great customer service!",
        author: "DL",
      },
    ],
    menu: [
      { name: "Spaghetti Carbonara", price: "$15.99" },
      { name: "Margherita Pizza", price: "$12.99" },
      { name: "Caesar Salad", price: "$8.99" },
    ],
  },
  {
    id: "2",
    name: "Restaurant B",
    rating: 4.0,
    reviews: 80,
    priceRange: "$$$",
    cuisine: "Mexican",
    description: "Restaurant B offers the best Mexican food in town.",
    images: ["path-to-image4.jpg", "path-to-image5.jpg", "path-to-image6.jpg"],
    location: "456 Blank St, City, Province, Postal Code",
    hours: "10 a.m. - 9 p.m. every day",
    phone: "+1234567890",
    reviewsData: [
      {
        date: "May 5, 2024",
        rating: 4,
        text: "Great atmosphere and delicious food.",
        author: "AB",
      },
    ],
    menu: [
      { name: "Tacos", price: "$9.99" },
      { name: "Burritos", price: "$12.99" },
      { name: "Quesadillas", price: "$10.99" },
    ],
  },
  {
    id: "3",
    name: "Restaurant C",
    rating: 3.5,
    reviews: 60,
    priceRange: "$",
    cuisine: "Chinese",
    description: "Restaurant C specializes in authentic Chinese cuisine.",
    images: ["path-to-image7.jpg", "path-to-image8.jpg", "path-to-image9.jpg"],
    location: "789 Blank St, City, Province, Postal Code",
    hours: "12 p.m. - 8 p.m. every day",
    phone: "+1234567890",
    reviewsData: [
      {
        date: "April 4, 2024",
        rating: 3,
        text: "Good food but the service could be better.",
        author: "CD",
      },
    ],
    menu: [
      { name: "Kung Pao Chicken", price: "$13.99" },
      { name: "Sweet and Sour Chicken", price: "$11.99" },
      { name: "Spring Rolls", price: "$6.99" },
    ],
  },
  {
    id: "4",
    name: "Restaurant D",
    rating: 5,
    reviews: 280,
    priceRange: "$$",
    cuisine: "Persian",
    description: "Restaurant D specializes in authentic Persian cuisine.",
    images: ["path-to-image10.jpg", "path-to-image11.jpg", "path-to-image12.jpg"],
    location: "1347 Blank St, City, Province, Postal Code",
    hours: "12 p.m. - 10 p.m. every day",
    phone: "+1234567890",
    reviewsData: [
      {
        date: "April 8, 2024",
        rating: 5,
        text: "The food was both amazing and delicious. Loved the ambiance.",
        author: "MK",
      },
      {
        date: "March 1, 2024",
        rating: 5,
        text: "Great food and excellent service. Highly recommended!",
        author: "TS",
      },
    ],
    menu: [
      { name: "Kebab", price: "$19.99" },
      { name: "Fesenjan", price: "$21.99" },
      { name: "Tahchin", price: "$16.99" },
    ],
  },
];

export const addReview = (restaurantId, newReview) => {
  const restaurant = restaurants.find((r) => r.id === restaurantId);
  if (restaurant) {
    restaurant.reviewsData.push(newReview);
  }
};

export default restaurants;

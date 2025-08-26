const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Happiness is not something readymade. It comes from your own actions.", author: "Dalai Lama" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" }
];

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const btn = document.getElementById("new-quote");

btn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];
  quoteText.textContent = `"${selectedQuote.text}"`;
  authorText.textContent = `- ${selectedQuote.author}`;
});

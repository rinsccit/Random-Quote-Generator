const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("tweet-quote");

// Function to fetch a random quote from QuoteSlate
async function fetchQuote() {
  try {
    quoteText.textContent = "Loading quote...";
    quoteAuthor.textContent = "";

    const response = await fetch(
      "https://quoteslate.vercel.app/api/quotes/random?count=1"
    );

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();

    let quoteObj;

    // Handle all known API response shapes
    if (Array.isArray(data)) {
      quoteObj = data[0];
    } else if (data.data && Array.isArray(data.data)) {
      quoteObj = data.data[0];
    } else {
      quoteObj = data;
    }

    if (!quoteObj || !quoteObj.quote) {
      throw new Error("Invalid quote format");
    }

    quoteText.textContent = `"${quoteObj.quote}"`;
    quoteAuthor.textContent = quoteObj.author
      ? `— ${quoteObj.author}`
      : "— Unknown";

  } catch (error) {
    console.error("Quote fetch failed:", error);

    // Fallback quote (IMPORTANT)
    quoteText.textContent =
      `"Success is not final, failure is not fatal: it is the courage to continue that counts."`;
    quoteAuthor.textContent = "— Winston Churchill";
  }
}

// Tweet the current quote
function tweetQuote() {
  const quote = quoteText.textContent;
  const author = quoteAuthor.textContent;
  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(quote + " " + author)}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", fetchQuote);
tweetBtn.addEventListener("click", tweetQuote);

// Initial fetch
fetchQuote();
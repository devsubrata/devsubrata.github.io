const quoteContainer = document.querySelector('.quote-container');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const category = document.querySelector('.category');

const getQuote = async () => {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {headers: {'X-Api-Key': '3Jv07cnSjRyZ3pTvRvHUYw==A6Vz5B5Fu9IQybsS'} });
    const quote_data = await response.json();
    console.log(quote_data);
    quote.textContent = `🙶 ${quote_data[0]['quote']} 🙷`;
    author.textContent = `---- ${quote_data[0]['author']}`;
    category.textContent = `Quote about 🙶${quote_data[0]['category'].toUpperCase()}🙷`;
    quoteContainer.style.display = "block";
}

getQuote();




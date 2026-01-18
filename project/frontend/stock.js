const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY";

const company = localStorage.getItem("company");
const selectedDate = localStorage.getItem("date");

const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&apikey=${API_KEY}`;

fetch(url)
  .then(res => res.json())
  .then(data => {

    
    if (data.Note) {
      document.getElementById("result").innerText =
        "API limit exceeded. Try again later.";
      return;
    }

    const series = data["Time Series (Daily)"];

    if (!series) {
      document.getElementById("result").innerText =
        "Invalid company symbol";
      return;
    }

    
    let date = new Date(selectedDate);

    while (true) {
      const formatted =
        date.toISOString().split("T")[0];

      if (series[formatted]) {
        const closePrice = series[formatted]["4. close"];

        document.getElementById("result").innerText =
          `Company: ${company}
Requested Date: ${selectedDate}
Actual Trading Date: ${formatted}
Closing Price: $${closePrice}`;

        break;
      }

      // go back 1 day
      date.setDate(date.getDate() - 1);
    }
  })
  .catch(err => {
    document.getElementById("result").innerText =
      "Error fetching stock data";
    console.error(err);
  });
const express = require("express");
const chrono = require("chrono-node");

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("Dialogflow data:", req.body);

  const userQuery = req.body.queryResult.queryText;

  // koristimo chrono da parsiramo slobodni tekst
  const parsedDate = chrono.parseDate(userQuery);

  let responseText = "Nisam prepoznao datum i vrijeme.";

  if (parsedDate) {
    // formatiramo datum i vrijeme u čitljiv oblik
    const dateString = parsedDate.toLocaleDateString("bs-BA");
    const timeString = parsedDate.toLocaleTimeString("bs-BA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    responseText = `Termin je rezervisan za ${dateString} u ${timeString}.`;
  }

  return res.json({
    fulfillmentText: responseText,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});

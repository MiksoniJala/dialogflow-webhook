import express from "express";

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("Primljeni podaci iz Dialogflowa:", JSON.stringify(req.body, null, 2));

  const params = req.body.queryResult?.parameters || {};
  const date = params.date || "nepoznat datum";
  const time = params.time || "nepoznato vrijeme";

  // primjer provjere: sutra u 12 je zauzeto
  if (date.includes("2025-06-28") && time.includes("12:00:00")) {
    return res.json({
      fulfillmentText: `Nažalost termin ${date} u ${time} je već zauzet. Molim odaberite drugi.`,
    });
  }

  const responseText = `Rezervisano za ${date} u ${time}.`;

  res.json({
    fulfillmentText: responseText,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server radi na portu ${port}`);
});

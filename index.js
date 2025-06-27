import express from "express";

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("Dialogflow data:", req.body);

  const date = req.body.queryResult.parameters.date;
  const time = req.body.queryResult.parameters.time;

  let responseText = `Rezervisano za ${date} u ${time}.`;

  return res.json({
    fulfillmentText: responseText,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});

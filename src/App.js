import { useState } from "react";
import useWindowDimensions from "./components/hooks/useWindowDimensions";
import Input from "./components/UI/Input";

const types = ["Cash", "Cheque", "Bill", "Transfer"];

function divvy(number, parts, min) {
  var randombit = number - min * parts;
  var out = [];

  for (var i = 0; i < parts; i++) {
    out.push(Math.random());
  }

  var mult =
    randombit /
    out.reduce(function (a, b) {
      return a + b;
    });

  return out.map(function (el) {
    return el * mult + min;
  });
}

function App() {
  const { height } = useWindowDimensions();
  const [nbr, setNbr] = useState(null);
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState(0);
  const [sDate, setSDate] = useState(new Date().toLocaleDateString());
  const [fDate, setFDate] = useState("");
  const [payments, setPayments] = useState([]);

  const form = {
    nbr: nbr,
    client: client,
    amount: amount,
    sDate: sDate,
    fDate: fDate,
  };

  const handleGenerate = () => {
    // const arr = divvy(amount, nbr, 0);
    let max = amount;
    let sum = 0;
    for (let i = 0; i < nbr; i++) {
      let res = Math.random() * (max - 0) + 0;
      if (i === nbr - 1) {
        res = amount - sum;
      }

      const payment = {
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        date: new Date(
          Date.parse(sDate) +
            Math.random() * (Date.parse(fDate) - Date.parse(sDate))
        ).toLocaleDateString(),
        // cost: arr[i].toFixed(2),
        cost: +res.toFixed(2),
      };

      sum += payment.cost;
      max -= payment.cost;

      setPayments((prev) => [...prev, payment]);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#001430",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: height,
      }}
    >
      <h2># Payments Generator #</h2>
      <div
        style={{
          display: "flex",
          margin: 30,
          border: "1px solid white",
          padding: 30,
          borderRadius: 15,
          flexDirection: "column",
          minWidth: 700,
          backgroundColor: "#eee",
          color: "#001430",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 15,
          }}
        >
          <Input
            placeholder={"# of payments"}
            span={nbr ? "Number of payments #" + nbr : "Number of payments"}
            type={"number"}
            onValueChange={(e) => setNbr(e.target.value)}
          />
          <Input
            placeholder={"Client name"}
            span={client ? "Client : " + client : "Client"}
            type={"text"}
            onValueChange={(e) => setClient(e.target.value)}
          />
        </div>
        <div>
          <Input
            placeholder={"Amount"}
            span={amount ? "Amount : " + amount : "Amount"}
            type={"text"}
            onValueChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 15,
          }}
        >
          <Input
            span={sDate ? "Start Date : " + sDate : "Start Date"}
            type={"date"}
            onValueChange={(e) => setSDate(e.target.value)}
          />
          <Input
            span={fDate ? "Finish Date : " + fDate : "Finish Date"}
            type={"date"}
            onValueChange={(e) => setFDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{
            paddingBlock: 10,
            borderRadius: 10,
            border: "1px solid #001430",
            backgroundColor: "rgb(0,0,0,0)",
            color: "#001430",
          }}
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>
      {payments.length !== 0 && (
        <div
          style={{
            display: "flex",
            margin: 30,
            border: "1px solid white",
            padding: 30,
            borderRadius: 15,
            flexDirection: "column",
            minWidth: 700,
          }}
        >
          <table
            style={{
              textAlign: "left",
              // border: "1px solid",
              color: "white",
            }}
          >
            <tr
              style={{
                // backgroundColor: "red",
                border: "1px solid white",
              }}
            >
              <th>#Id</th>
              <th>Type</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
            {payments.map((payment) => (
              <tr>
                <td>{payment.id + 1}</td>
                <td>{payment.type}</td>
                <td>{payment.date}</td>
                <td>{payment.cost}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default App;

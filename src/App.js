import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

function App() {
  const allNotes = [
    { natural: "C", sharp: "B#" },
    { sharp: "C#", flat: "Db" },
    { natural: "D", doubleSharp: "C##" },
    { sharp: "D#", flat: "Eb" },
    { natural: "E", flat: "Fb" },
    { natural: "F", sharp: "E#", flat: "Eb" },
    { sharp: "F#", flat: "Gb" },
    { natural: "G", doubleSharp: "F##" },
    { sharp: "G#", flat: "Ab" },
    { natural: "A" },
    { sharp: "A#", flat: "Bb" },
    { natural: "B", flat: "Cb" },
  ];
  const degrees = ["Maior" /* , "Minor" */];
  const [noteIndex, setNoteIndex] = useState(0);
  const [noteSelected, setNoteSelected] = useState();
  const [degree, setDegree] = useState("Maior");
  const [result, setResult] = useState("");

  const handleResult = () => {
    if (degree === "Maior") {
      let first = allNotes[noteIndex];
      let second =
        allNotes[noteIndex + 4 > 11 ? (noteIndex + 4) % 12 : noteIndex + 4];
      let third =
        allNotes[noteIndex + 7 > 11 ? (noteIndex + 7) % 12 : noteIndex + 7];
      // All Naturals
      if (noteIndex === 0 || noteIndex === 5 || noteIndex === 7) {
        setResult(`${first.natural}, ${second.natural}, ${third.natural}`);
        // Natural, Sharp, Natural
      } else if (noteIndex === 2 || noteIndex === 4 || noteIndex === 9) {
        setResult(`${first.natural}, ${second.sharp}, ${third.natural}`);
        // All Sharps
      } else if (noteIndex === 1 || noteIndex === 6 || noteIndex === 8) {
        setResult(`${first.sharp}, ${second.sharp}, ${third.sharp}`);
        // Sharp, Double Sharp, Sharp
      } else if (noteIndex === 3 || noteIndex === 10) {
        setResult(`${first.sharp}, ${second.doubleSharp}, ${third.sharp}`);
        // Natural, Sharp, Sharp
      } else if (noteIndex === 11) {
        setResult(`${first.natural}, ${second.sharp}, ${third.sharp}`);
      }
    } /*  else if (degree === "Menor") {
      const first = allNotes[noteIndex].natural || allNotes[noteIndex].sharp;
      const second = allNotes[noteIndex + 3];
      const third = allNotes[noteIndex + 7];
    } */
  };
  return (
    <div className="App">
      <div className="notes">
        {allNotes.slice(0, 12).map((note) => (
          <Button
            name="group1"
            value={allNotes.indexOf(note)}
            key={allNotes.indexOf(note)}
            onClick={(e) => {
              setNoteIndex(parseInt(e.target.value));
              e.preventDefault();
            }}
          >
            {note.natural || note.sharp} {allNotes.indexOf(note)}
          </Button>
        ))}
      </div>
      <div className="degrees">
        {degrees.map((degree) => (
          <Button
            name="group2"
            value={degree}
            onClick={(e) => {
              setDegree(e.target.value);
              handleResult();
              e.preventDefault();
            }}
          >
            {degree}
          </Button>
        ))}
      </div>
      <div className="Chords">
        <h3>Acorde:</h3>{" "}
        {result ? (
          <h2>{result}</h2>
        ) : (
          <h4>Seleciona a Nota e o Grau musical.</h4>
        )}
      </div>
    </div>
  );
}

export default App;

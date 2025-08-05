import { useState, useCallback, useEffect, useMemo } from "react";

export const useMusicTheory = () => {
  // Using useMemo to prevent re-creation on every render
  const naturalNotes = useMemo(() => ["C", "D", "E", "F", "G", "A", "B"], []);
  const orderSharps = useMemo(() => ["F", "C", "G", "D", "A", "E", "B"], []);
  const orderFlats = useMemo(() => ["B", "E", "A", "D", "G", "C", "F"], []);
  const circleFifthsArrayRight = useMemo(() => ["C", "G", "D", "A", "E", "B", "F#"], []);
  const circleFifthsArrayLeft = useMemo(() => ["C", "F", "Bb", "Eb", "Ab", "Db", "Gb"], []);

  // Relative minor keys for each major key
  const relativeMinors = useMemo(
    () => ({
      C: "Am",
      G: "Em",
      D: "Bm",
      A: "F#m",
      E: "C#m",
      B: "G#m",
      "F#": "D#m",
      F: "Dm",
      Bb: "Gm",
      Eb: "Cm",
      Ab: "Fm",
      Db: "Bbm",
      Gb: "Ebm",
    }),
    []
  );

  const [scales, setScales] = useState({});
  const [selectedKey, setSelectedKey] = useState("C");
  const [currentScale, setCurrentScale] = useState([]);
  const [keyType, setKeyType] = useState("major"); // "major" or "minor"

  const generateScales = useCallback(() => {
    let allScales = {};

    // Generate major scales with sharp keys
    for (let i = 0; i < circleFifthsArrayRight.length; i++) {
      const keyNote = circleFifthsArrayRight[i];
      const note = keyNote.length > 1 ? keyNote.slice(0, 1) : keyNote;
      const noteIndex = naturalNotes.indexOf(note);
      const scale = [...naturalNotes];

      // Rotate scale to start with the key note
      for (let j = 0; j < noteIndex; j++) {
        scale.push(scale.shift());
      }

      // Apply sharps
      scale.forEach((note, j) => {
        orderSharps.slice(0, i).forEach((sharp) => {
          if (note === sharp) scale[j] = note + "#";
        });
      });

      allScales[keyNote] = scale;
    }

    // Generate major scales with flat keys
    for (let i = 1; i < circleFifthsArrayLeft.length; i++) {
      const keyNote = circleFifthsArrayLeft[i];
      const note = keyNote.length > 1 ? keyNote.slice(0, 1) : keyNote;
      const noteIndex = naturalNotes.indexOf(note);
      const scale = [...naturalNotes];

      // Rotate scale to start with the key note
      for (let j = 0; j < noteIndex; j++) {
        scale.push(scale.shift());
      }

      // Apply flats
      scale.forEach((note, j) => {
        orderFlats.slice(0, i).forEach((flat) => {
          if (note === flat) scale[j] = note + "b";
        });
      });

      allScales[keyNote] = scale;
    }

    // Generate natural minor scales for all relative minors
    Object.entries(relativeMinors).forEach(([majorKey, minorKey]) => {
      const majorScale = allScales[majorKey];
      if (majorScale) {
        // Natural minor starts from the 6th degree of relative major
        const minorScale = [...majorScale.slice(5), ...majorScale.slice(0, 5)];
        allScales[minorKey] = minorScale;
      }
    });

    return allScales;
  }, [naturalNotes, orderSharps, orderFlats, circleFifthsArrayRight, circleFifthsArrayLeft, relativeMinors]);

  const selectKey = useCallback(
    (key) => {
      setSelectedKey(key);
      const scale = scales[key];
      if (scale) {
        setCurrentScale(scale);

        // Determine if it's a minor key
        const isMinor = key.includes("m") || key.includes("°");
        setKeyType(isMinor ? "minor" : "major");
      }
    },
    [scales]
  );

  useEffect(() => {
    const allScales = generateScales();
    setScales(allScales);

    // Set default to C major
    if (allScales["C"]) {
      setCurrentScale(allScales["C"]);
      setKeyType("major");
    }
  }, [generateScales]);

  return {
    scales,
    selectedKey,
    currentScale,
    keyType,
    selectKey,
    circleFifthsArrayRight,
    circleFifthsArrayLeft,
    relativeMinors,
  };
};

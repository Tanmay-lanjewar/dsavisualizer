import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BubbleSort.css";

function BubbleSort() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [arraySize, setArraySize] = useState(8);
  const [explanation, setExplanation] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [iterations, setIterations] = useState([]);
  // Generate random array
  const generateArray = () => {
    if (isSorting) return;
    const arr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 99) + 1
    );
    setArray(arr);
    setActiveIndices([]);
    setIterations([]);
    setExplanation("");
  };
  const setCustomArray = () => {
    if (isSorting) return;
    const nums = customInput
      .split(",")
      .map(n => Number(n.trim()))
      .filter(n => !isNaN(n) && n >= 0);
    if (nums.length > 1) {
      setArray(nums);
      setArraySize(nums.length);
      setIterations([]);
      setExplanation("Custom array set!");
    } else {
      setExplanation("Please enter at least two valid numbers separated by commas.");
    }
  };
  // Bubble sort animation
  const bubbleSort = async () => {
    setIsSorting(true);
    setIterations([]);
    let arr = [...array];
    let n = arr.length;
    const history = [];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]); // highlight comparing
        setExplanation(`Comparing ${arr[j]} and ${arr[j + 1]} `);
        await new Promise(res => setTimeout(res, 1500));

        if (arr[j] > arr[j + 1]) {
          // swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

          setArray([...arr]); // update UI
          setExplanation(`Swapping ${arr[j]} and ${arr[j + 1]}`);
          await new Promise(res => setTimeout(res, 1500));
        } else {
          setExplanation(`No swap needed `);
        }
      }
      history.push([...arr]);
      setIterations([...history]);
    }
    setExplanation("Array is sorted ");
    setActiveIndices([]);
    setIsSorting(false);
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  return (
    <div className="bubble-page">
      <header className="bubble-header">
        <h1>Bubble Sort Visualization</h1>
        <Link to="/" className="back-btn">
          ⬅ Back to Home
        </Link>
      </header>

      <main className="bubble-content">

        <div className="bubble-box-container">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`bubble-box ${activeIndices.includes(idx) ? "active" : ""
                }`}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="bubble-explanation">{explanation && <p>{explanation}</p>}</div>

        <div className="bubble-controls">
          <label>
            Number of Boxes:{" "}
            <input
              type="number"
              min="2"
              max="15"
              value={arraySize}
              disabled={isSorting}
              onChange={(e) => setArraySize(Number(e.target.value))}
            />
          </label>
          <button onClick={generateArray} disabled={isSorting}>
            Generate New Array
          </button>
          <button onClick={bubbleSort} disabled={isSorting}>
            Start Bubble Sort
          </button>
        </div>

        {/* Custom input section */}
        <div className="bubble-controls" style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="e.g. 5,12,7,3"
            value={customInput}
            disabled={isSorting}
            onChange={(e) => {
              const raw = e.target.value;

              // Split by comma, trim spaces, remove empties
              const parts = raw.split(',')
                .map(s => s.trim())
                .filter(Boolean);

              // Only keep first 15 numbers
              if (parts.length <= 15) {
                setCustomInput(raw);
              }
            }}
          />
          <button onClick={setCustomArray} disabled={isSorting}>
            Set Custom Array
          </button>
        </div>


        {/* Iteration snapshots */}
        <div className="bubble-sections">
          {iterations.length > 0 && (
            <div className="bubble-iterations">
              <h3>Iteration States</h3>
              {iterations.map((it, idx) => (
                <p key={idx}><strong>Pass {idx + 1}:</strong> {it.join(", ")}</p>
              ))}
            </div>
          )}


          <div className="bubble-algo-box">
            <h3>Bubble Sort Algorithm </h3>
            <ol>
              <li>Compare two neighbors </li>
              <li>If left &gt; right → swap </li>
              <li>Otherwise → move ahead </li>
              <li>Repeat until sorted </li>
            </ol>
          </div>
        </div>

      </main>
    </div>
  );
}

export default BubbleSort;


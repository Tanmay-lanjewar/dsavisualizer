import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./InsertionSort.css";

function InsertionSort() {
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
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n) && n >= 0);

    if (nums.length > 1) {
      setArray(nums);
      setArraySize(nums.length);
      setIterations([]);
      setExplanation("Custom array set!");
    } else {
      setExplanation("Please enter at least two valid numbers separated by commas.");
    }
  };

  // Insertion sort animation
  const insertionSort = async () => {
    setIsSorting(true);
    setIterations([]);
    let arr = [...array];
    let n = arr.length;
    const history = [];

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      setActiveIndices([i]);
      setExplanation(`Pass ${i}: Taking ${key} as the key`);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      while (j >= 0 && arr[j] > key) {
        setActiveIndices([j, j + 1]);
        setExplanation(`${arr[j]} > ${key}, shifting ${arr[j]} to the right`);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 1300));
        j = j - 1;
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setExplanation(`Placed ${key} at correct position`);
      await new Promise((resolve) => setTimeout(resolve, 1300));

      history.push([...arr]);
      setIterations([...history]);
    }

    setActiveIndices([]);
    setIsSorting(false);
    setExplanation("Array is sorted ");
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  return (
    <div className="insertion-page">
      <header className="insertion-header">
        <h1>Insertion Sort Visualization</h1>
        <Link to="/" className="back-btn">
          ⬅ Back to Home
        </Link>
      </header>

      <main className="insertion-content">
        {/* --- Array Boxes --- */}
        <div className="insertion-box-container">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`insertion-box ${activeIndices.includes(idx) ? "active" : ""
                }`}
            >
              {value}
            </div>
          ))}
        </div>

        {/* --- Step Narration --- */}
        <div className="insertion-explanation">
          {explanation && <p>{explanation}</p>}
        </div>

        {/* --- Controls --- */}
        <div className="insertion-controls">
          <label>
            Number of Boxes:{" "}
            <input
              type="number"
              min="2"
              max="30"
              value={arraySize}
              disabled={isSorting}
              onChange={(e) => setArraySize(Number(e.target.value))}
            />
          </label>

          <button onClick={generateArray} disabled={isSorting}>
            Generate New Array
          </button>
          <button onClick={insertionSort} disabled={isSorting}>
            Start Insertion Sort
          </button>
        </div>

        <div className="insertion-controls" style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="e.g. 10,5,3,8"
            value={customInput}
            disabled={isSorting}
            onChange={(e) => {
              const raw = e.target.value;
              const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
              if (parts.length <= 15) setCustomInput(raw);
            }}
          />
          <button onClick={setCustomArray} disabled={isSorting}>
            Set Custom Array
          </button>
        </div>
        <div className="insertion-sections">
          {iterations.length > 0 && (
            <div className="insertion-iterations">
              <h3>Iteration States</h3>
              {iterations.map((it, idx) => (
                <p key={idx}>
                  <strong>Pass {idx + 1}:</strong> {it.join(", ")}
                </p>
              ))}
            </div>
          )}

          {/* --- Algo Steps --- */}
          <div className="insertion-algo-box">
            <h3>Insertion Sort Algorithm</h3>
            <ol className="insertion-steps">
              <li>Start from the 2nd element (key)</li>
              <li>Compare key with elements before it</li>
              <li>Shift elements greater than key to the right</li>
              <li>Insert key at the correct position</li>
              <li>Repeat until array is sorted</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InsertionSort;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SelectionSort.css";

function SelectionSort() {
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
    setExplanation(null);
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

  // Selection sort animation
  const selectionSort = async () => {
    setIsSorting(true);
    setIterations([]);
    let arr = [...array];
    let n = arr.length;
    const history = [];

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      setActiveIndices([i]);
      setExplanation(`Starting Pass ${i + 1}: assume ${arr[i]} is the minimum`);
      await new Promise((res) => setTimeout(res, 1000));

      for (let j = i + 1; j < n; j++) {
        setActiveIndices([minIndex, j]);
        setExplanation(`Comparing ${arr[minIndex]} and ${arr[j]}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          setExplanation(`New minimum found: ${arr[minIndex]}`);
          await new Promise((res) => setTimeout(res, 1000));
        }
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        setExplanation(`Swapping ${arr[i]} and ${arr[minIndex]}`);
        await new Promise((res) => setTimeout(res, 1200));
      } else {
        setExplanation(`No swap needed, ${arr[i]} is already in correct position`);
        await new Promise((res) => setTimeout(res, 1000));
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
    <div className="selection-page">
      <header className="selection-header">
        <h1>Selection Sort Visualization</h1>
        <Link to="/" className="back-btn">
          ⬅ Back to Home
        </Link>
      </header>

      <main className="selection-content">
        <div className="selection-box-container">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`selection-box ${activeIndices.includes(idx) ? "active" : ""
                }`}
            >
              {value}
            </div>
          ))}
        </div>

        {/* --- Step Narration --- */}
        <div className="selection-explanation">
          {explanation && <p>{explanation}</p>}
        </div>

        {/* --- Controls --- */}
        <div className="selection-controls">
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
          <button onClick={selectionSort} disabled={isSorting}>
            Start Selection Sort
          </button>
        </div>

        <div className="selection-controls" style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="e.g. 10,5,3,8"
            value={customInput}
            disabled={isSorting}
            onChange={(e) => {
              const raw = e.target.value;
              const parts = raw
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
              if (parts.length <= 15) {
                setCustomInput(raw);
              }
            }}
          />
          <button onClick={setCustomArray} disabled={isSorting}>
            Set Custom Array
          </button>
        </div>
        <div className="selection-sections">
          {iterations.length > 0 && (
            <div className="selection-iterations">
              <h3>Iteration States</h3>
              {iterations.map((it, idx) => (
                <p key={idx}>
                  <strong>Pass {idx + 1}:</strong> {it.join(", ")}
                </p>
              ))}
            </div>
          )}


          <div className="selection-algo-box">
            <h3>Selection Sort Algorithm </h3>
            <ol className="selection-steps">
              <li>Start from first element</li>
              <li>Find the smallest element </li>
              <li>Swap with current position </li>
              <li>Move to next position </li>
              <li>Repeat until sorted </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SelectionSort;

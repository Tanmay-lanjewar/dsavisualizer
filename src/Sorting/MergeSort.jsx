
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MergeSort.css";

function MergeSort() {
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

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Merge two halves
  const merge = async (arr, l, m, r) => {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);

    setExplanation(`Merging [${left.join(", ")}] and [${right.join(", ")}]`);
    await delay(1000);

    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      setActiveIndices([k]);
      await delay(500);
      if (left[i] <= right[j]) {
        arr[k] = left[i++];
      } else {
        arr[k] = right[j++];
      }
      setArray([...arr]);
      await delay(500);
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i++];
      setArray([...arr]);
      setActiveIndices([k]);
      await delay(500);
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j++];
      setArray([...arr]);
      setActiveIndices([k]);
      await delay(500);
      k++;
    }

    setIterations((prev) => [...prev, [...arr]]);
  };

  const mergeSortHelper = async (arr, l, r) => {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      setExplanation(`Splitting at index ${m}`);
      await delay(800);

      await mergeSortHelper(arr, l, m);
      await mergeSortHelper(arr, m + 1, r);

      await merge(arr, l, m, r);
    }
  };

  const mergeSort = async () => {
    setIsSorting(true);
    setIterations([]);
    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    setActiveIndices([]);
    setIsSorting(false);
    setExplanation("Array is fully sorted ");
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  return (
    <div className="merge-page">
      <header className="merge-header">
        <h1>Merge Sort Visualization</h1>
        <Link to="/" className="back-btn">
          ⬅ Back to Home
        </Link>
      </header>

      <main className="merge-content">
        <div className="merge-box-container">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`merge-box ${activeIndices.includes(idx) ? "active" : ""}`}
            >
              {value}
            </div>
          ))}
        </div>

        <div className="merge-explanation">{explanation && <p>{explanation}</p>}</div>

        <div className="merge-controls">
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
          <button onClick={mergeSort} disabled={isSorting}>
            Start Merge Sort
          </button>
        </div>

        <div className="merge-controls" style={{ marginTop: "15px" }}>
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
              if (parts.length <= 15) setCustomInput(raw);
            }}
          />
          <button onClick={setCustomArray} disabled={isSorting}>
            Set Custom Array
          </button>
        </div>

        <div className="merge-sections">
          {iterations.length > 0 && (
            <div className="merge-iterations">
              <h3>Iteration States</h3>
              {iterations.map((it, idx) => (
                <p key={idx}>
                  <strong>Step {idx + 1}:</strong> {it.join(", ")}
                </p>
              ))}
            </div>
          )}

          <div className="merge-algo-box">
            <h3>Merge Sort Algorithm</h3>
            <ol className="merge-steps">
              <li>Divide array into two halves</li>
              <li>Recursively sort each half</li>
              <li>Merge two sorted halves</li>
              <li>Repeat until one sorted array</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MergeSort;

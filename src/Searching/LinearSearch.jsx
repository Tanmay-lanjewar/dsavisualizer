import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LinearSearch.css";

function LinearSearch() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(8);
  const [customInput, setCustomInput] = useState("");
  const [target, setTarget] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [iterations, setIterations] = useState([]);

  // Generate random array
  const generateArray = () => {
    if (isSearching) return;
    const arr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 99) + 1
    );
    setArray(arr);
    setFoundIndex(null);
    setCurrentIndex(null);
    setIterations([]);
    setExplanation("New array generated!");
  };

  // Set custom array
  const setCustomArray = () => {
    if (isSearching) return;
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
      setExplanation(
        "Please enter at least two valid numbers separated by commas."
      );
    }
  };

  // Linear Search animation
  const handleSearch = async () => {
    if (target === "" || array.length === 0) {
      setExplanation("Please enter a target and ensure array is not empty.");
      return;
    }

    setIsSearching(true);
    setFoundIndex(null);
    setIterations([]);
    setExplanation("Starting Linear Search...");

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      setExplanation(`Checking index ${i}: ${array[i]} with target ${target}`);
      await new Promise((res) => setTimeout(res, 1000));

      if (array[i] === Number(target)) {
        setFoundIndex(i);
        setExplanation(` Found ${target} at index ${i}!`);
        setIterations((prev) => [
          ...prev,
          `Iteration ${i + 1}: Found target ${target} at index ${i}`,
        ]);
        setIsSearching(false);
        setCurrentIndex(null);
        return;
      } else {
        setIterations((prev) => [
          ...prev,
          `Iteration ${i + 1}: ${array[i]} ≠ ${target}`,
        ]);
      }
    }

    setExplanation(` Target ${target} not found in array`);
    setIsSearching(false);
    setCurrentIndex(null);
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  return (
    <div className="linear-page">
      <header className="linear-header">
        <h1>Linear Search Visualization</h1>
        <Link to="/" className="back-btn">
          ⬅ Back to Home
        </Link>
      </header>

      <main className="linear-content">
        <div className="linear-box-container">
          {array.map((num, index) => (
            <div
              key={index}
              className={`linear-box ${
                index === currentIndex
                  ? "active"
                  : index === foundIndex
                  ? "found"
                  : ""
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="linear-explanation">
          {explanation && <p>{explanation}</p>}
        </div>

        <div className="linear-controls">
          <label>
            Number of Boxes:{" "}
            <input
              type="number"
              min="2"
              max="15"
              value={arraySize}
              disabled={isSearching}
              onChange={(e) => setArraySize(Number(e.target.value))}
            />
          </label>
          <button onClick={generateArray} disabled={isSearching}>
            Generate New Array
          </button>
        </div>

        <div className="linear-controls" style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="e.g. 5,12,7,3"
            value={customInput}
            disabled={isSearching}
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
          <button onClick={setCustomArray} disabled={isSearching}>
            Set Custom Array
          </button>
        </div>

        <div className="linear-controls" style={{ marginTop: "15px" }}>
          <input
            type="number"
            placeholder="Enter target value"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            disabled={isSearching}
          />
          <button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? "Searching..." : "Start Search"}
          </button>
        </div>

        <div className="linear-sections">
          {iterations.length > 0 && (
            <div className="linear-iterations">
              <h3>Iteration States</h3>
              {iterations.map((it, idx) => (
                <p key={idx}>
                  <strong>Step {idx + 1}:</strong> {it}
                </p>
              ))}
            </div>
          )}

          <div className="linear-algo-box">
            <h3>Linear Search Algorithm</h3>
            <ol>
              <li>Start from the first element.</li>
              <li>Compare the current element with the target.</li>
              <li>If equal → Target found!</li>
              <li>If not equal → Move to the next element.</li>
              <li>Repeat until the end of the array.</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LinearSearch;




import React, { useState } from "react";
import "./BinarySearch.css";

const BinarySearch = () => {
  const [array, setArray] = useState([10, 20, 30, 40, 50, 60, 70]);
  const [target, setTarget] = useState("");
  const [numBoxes, setNumBoxes] = useState(7);
  const [current, setCurrent] = useState(null);
  const [found, setFound] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [iterations, setIterations] = useState([]);
  const [running, setRunning] = useState(false);

  // Generate random sorted array
  const generateArray = () => {
    let arr = [];
    for (let i = 0; i < numBoxes; i++) {
      arr.push(Math.floor(Math.random() * 90) + 10);
    }
    arr.sort((a, b) => a - b);
    setArray(arr);
    resetState();
  };

  // Reset all visual states
  const resetState = () => {
    setCurrent(null);
    setFound(null);
    setExplanation("");
    setIterations([]);
  };

  const handleCustomArray = (e) => {
    const input = e.target.value
      .split(",")
      .map((num) => parseInt(num))
      .filter((num) => !isNaN(num))
      .sort((a, b) => a - b);
    setArray(input);
  };

  const handleTargetChange = (e) => setTarget(e.target.value);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const binarySearch = async () => {
    if (running) return;
    setRunning(true);
    resetState();

    const arr = [...array];
    let left = 0;
    let right = arr.length - 1;
    let iter = [];

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      setCurrent(mid);
      iter.push(`Checking index ${mid} (value ${arr[mid]})`);
      setIterations([...iter]);
      setExplanation(`Checking middle index ${mid}...`);
      await sleep(1000);

      if (arr[mid] === parseInt(target)) {
        setExplanation(` Element ${target} found at index ${mid}`);
        setFound(mid);
        break;
      } else if (arr[mid] < parseInt(target)) {
        setExplanation(`Target > mid → move right`);
        left = mid + 1;
      } else {
        setExplanation(`Target < mid → move left`);
        right = mid - 1;
      }
      await sleep(1000);
    }

    if (left > right) {
      setExplanation(` Element ${target} not found`);
      setFound(-1);
    }

    setRunning(false);
  };

  return (
    <div className="binary-page">
      <div className="binary-header">
        
        <h2>Binary Search Visualizer</h2>
        <a href="/" className="back-btn">
          ⬅ Back to Home
        </a>
      </div>

      <div className="binary-box-container">
        {array.map((num, index) => (
          <div
            key={index}
            className={`binary-box ${
              index === current
                ? "active"
                : found === index
                ? "found"
                : found === -1
                ? "not-found"
                : ""
            }`}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="binary-explanation">{explanation}</div>

      {/* Control Section */}
      <div className="binary-controls">
        <div className="binary-inputs">
          <label>Number of Boxes:</label>
          <input
            type="number"
            min="3"
            max="15"
            value={numBoxes}
            onChange={(e) => setNumBoxes(e.target.value)}
          />
          <button onClick={generateArray}>Generate New Array</button>
        </div>

        <div className="binary-inputs">
          <label>Set Custom Array:</label>
          <input
            type="text"
            placeholder="e.g. 5,10,15,20"
            onChange={handleCustomArray}
          />
        </div>

        <div className="binary-inputs">
          <input
            type="number"
            placeholder="Enter target"
            value={target}
            onChange={handleTargetChange}
          />
          <button onClick={binarySearch} disabled={running}>
            Start Search
          </button>
        </div>
      </div>

      {/* Array Boxes */}
      

      {/* Algorithm and Iteration Sections */}
      <div className="binary-sections">
        {iterations.length > 0 && (
        <div className="binary-iterations">
          <h3>Iterations</h3>
          {iterations.length === 0 ? (
            <p>No iterations yet.</p>
          ) : (
            iterations.map((step, i) => <p key={i}>{step}</p>)
          )}
        </div>
        )}
        <div className="binary-algo-box">
          <h3>Binary Search Algorithm</h3>
          <ol>
            <li>Start with left = 0 and right = n - 1</li>
            <li>Find mid = (left + right) / 2</li>
            <li>If arr[mid] == target → found!</li>
            <li>If target &lt; arr[mid] → move left</li>
            <li>If target &gt; arr[mid] → move right</li>
            <li>Repeat until found or left &gt; right</li>
          </ol>
        </div>

        
      </div>

      
    </div>
  );
};

export default BinarySearch;




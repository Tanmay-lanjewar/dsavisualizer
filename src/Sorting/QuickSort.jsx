// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./QuickSort.css";

// function QuickSort() {
//   const [array, setArray] = useState([]);
//   const [isSorting, setIsSorting] = useState(false);
//   const [activeIndices, setActiveIndices] = useState([]);
//   const [arraySize, setArraySize] = useState(8);
//   const [explanation, setExplanation] = useState(null);

//   // Generate random array
//   const generateArray = () => {
//     if (isSorting) return;
//     const arr = Array.from({ length: arraySize }, () =>
//       Math.floor(Math.random() * 99) + 1
//     );
//     setArray(arr);
//     setActiveIndices([]);
//     setExplanation(null);
//   };

//   // Helper delay
//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   // Partition function
//   const partition = async (arr, low, high) => {
//     let pivot = arr[high];
//     let i = low - 1;

//     setExplanation(
//       <span>
//         Choosing pivot <b>{pivot}</b> at index {high}
//       </span>
//     );
//     await delay(1200);

//     for (let j = low; j < high; j++) {
//       setActiveIndices([j, high]);
//       setExplanation(
//         <span>
//           Comparing <b>{arr[j]}</b> with pivot <b>{pivot}</b>
//         </span>
//       );
//       await delay(1000);

//       if (arr[j] < pivot) {
//         i++;
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//         setArray([...arr]);
//         setExplanation(
//           <span>
//             Swapping <b>{arr[i]}</b> and <b>{arr[j]}</b>
//           </span>
//         );
//         await delay(1200);
//       }
//     }

//     [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
//     setArray([...arr]);
//     setExplanation(
//       <span>
//         Placing pivot <b>{pivot}</b> at correct position
//       </span>
//     );
//     await delay(1400);

//     return i + 1;
//   };

//   // QuickSort recursive
//   const quickSortHelper = async (arr, low, high) => {
//     if (low < high) {
//       let pi = await partition(arr, low, high);
//       await quickSortHelper(arr, low, pi - 1);
//       await quickSortHelper(arr, pi + 1, high);
//     }
//   };

//   const quickSort = async () => {
//     setIsSorting(true);
//     let arr = [...array];
//     await quickSortHelper(arr, 0, arr.length - 1);
//     setActiveIndices([]);
//     setIsSorting(false);
//     setExplanation("Array is sorted ");
//   };

//   useEffect(() => {
//     generateArray();
//   }, [arraySize]);

//   return (
//     <div className="quick-page">
//       <header className="quick-header">
//         <h1>Quick Sort Visualization</h1>
//         <Link to="/" className="back-btn">
//           ← Back to Home
//         </Link>
//       </header>

//       <main className="quick-content">
//         {/* --- Array Boxes --- */}
//         <div className="quick-box-container">
//           {array.map((value, idx) => (
//             <div
//               key={idx}
//               className={`quick-box ${
//                 activeIndices.includes(idx) ? "active" : ""
//               }`}
//             >
//               {value}
//             </div>
//           ))}
//         </div>

//         {/* --- Step Narration --- */}
//         {explanation && (
//           <div className="quick-explanation">
//             <p>{explanation}</p>
//           </div>
//         )}

//         {/* --- Controls --- */}
//         <div className="quick-controls">
//           <label>
//             Number of Boxes:{" "}
//             <input
//               type="number"
//               min="2"
//               max="30"
//               value={arraySize}
//               disabled={isSorting}
//               onChange={(e) => setArraySize(Number(e.target.value))}
//             />
//           </label>

//           <button onClick={generateArray} disabled={isSorting}>
//             Generate New Array
//           </button>
//           <button onClick={quickSort} disabled={isSorting}>
//             Start Quick Sort
//           </button>
//         </div>

//         {/* --- Algo Steps --- */}
//         <div className="quick-algo-box">
//           <h3>Quick Sort Algorithm</h3>
//           <ol className="quick-steps">
//             <li>Pick a pivot (last element)</li>
//             <li>Partition: put smaller elements left, larger right</li>
//             <li>Place pivot at correct position</li>
//             <li>Recursively sort left & right subarrays</li>
//             <li>Repeat until sorted</li>
//           </ol>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default QuickSort;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./QuickSort.css";

function QuickSort() {
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

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    setExplanation(`Choosing pivot ${pivot} at index ${high}`);
    await delay(1000);

    for (let j = low; j < high; j++) {
      setActiveIndices([j, high]);
      setExplanation(`Comparing ${arr[j]} with pivot ${pivot}`);
      await delay(800);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setExplanation(`Swapping ${arr[i]} and ${arr[j]}`);
        await delay(1000);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    setExplanation(`Placing pivot ${pivot} at correct position`);
    await delay(1200);

    setIterations((prev) => [...prev, [...arr]]);

    return i + 1;
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const quickSort = async () => {
    setIsSorting(true);
    setIterations([]);
    let arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    setActiveIndices([]);
    setIsSorting(false);
    setExplanation("Array is sorted ");
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  return (
    <div className="quick-page">
      <header className="quick-header">
        <h1>Quick Sort Visualization</h1>
        <Link to="/" className="back-btn">⬅ Back to Home</Link>
      </header>

      <main className="quick-content">
        <div className="quick-box-container">
          {array.map((value, idx) => (
            <div key={idx} className={`quick-box ${activeIndices.includes(idx) ? "active" : ""}`}>
              {value}
            </div>
          ))}
        </div>

        {explanation && <div className="quick-explanation"><p>{explanation}</p></div>}

        <div className="quick-controls">
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

          <button onClick={generateArray} disabled={isSorting}>Generate New Array</button>
          <button onClick={quickSort} disabled={isSorting}>Start Quick Sort</button>
        </div>

        <div className="quick-controls" style={{ marginTop: "15px" }}>
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
          <button onClick={setCustomArray} disabled={isSorting}>Set Custom Array</button>
        </div>

        <div className="quick-sections">
          {iterations.length > 0 && (
            <div className="quick-iterations">
              <h3>Iteration States</h3>
              {iterations.map((it, idx) => (
                <p key={idx}><strong>Step {idx + 1}:</strong> {it.join(", ")}</p>
              ))}
            </div>
          )}

          <div className="quick-algo-box">
            <h3>Quick Sort Algorithm</h3>
            <ol className="quick-steps">
              <li>Pick a pivot (last element)</li>
              <li>Partition: smaller elements left, larger right</li>
              <li>Place pivot at correct position</li>
              <li>Recursively sort left & right subarrays</li>
              <li>Repeat until sorted</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QuickSort;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BubbleSort from "./Sorting/BubbleSort";
import SelectionSort from "./Sorting/SelectionSort";
import InsertionSort from "./Sorting/InsertionSort";
import QuickSort from "./Sorting/QuickSort";
import MergeSort from "./Sorting/MergeSort";
import LinearSearch from "./Searching/LinearSearch";
import BinarySearch from "./Searching/BinarySearch";
function App() {
  return (

      <Routes>
        {/* Home Route */}
        <Route path="/" element={<HomePage />} />
        {/* Sorting Routes */}
        <Route path="/bubble-sort" element={<BubbleSort />} />
        <Route path="/selection-sort" element={<SelectionSort />} />
        <Route path="/insertion-sort" element={<InsertionSort />} />
        <Route path="/merge-sort" element={<MergeSort />} />
        <Route path="/quick-sort" element={<QuickSort />} />
        <Route path="/linear-search" element={<LinearSearch />}/>
        <Route path="/binary-search" element={<BinarySearch />}/>
      </Routes>

  );
}

export default App;



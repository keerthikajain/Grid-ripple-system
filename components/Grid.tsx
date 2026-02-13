"use client";

import { useState } from "react";

type Cell = {
  value: number;
  locked: boolean;
};

const GRID_SIZE = 3;

function createInitialGrid(): Cell[][] {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({
      value: 0,
      locked: false,
    }))
  );
}

export default function Grid() {
  const [grid, setGrid] = useState<Cell[][]>(createInitialGrid());

  const handleClick = (row: number, col: number) => {
    setGrid((prevGrid) => {
      // Prevent clicking locked cell
      if (prevGrid[row][col].locked) {
        return prevGrid;
      }

      const newGrid = structuredClone(prevGrid);

      // Increment clicked cell
      newGrid[row][col].value += 1;

      // Lock if >= 15
      if (newGrid[row][col].value >= 15) {
        newGrid[row][col].locked = true;
      }

      const newValue = newGrid[row][col].value;

      // Rule A: Divisible by 3 → decrement right cell
      if (newValue % 3 === 0) {
        if (col < GRID_SIZE - 1) {
          if (!newGrid[row][col + 1].locked) {
            newGrid[row][col + 1].value -= 1;

            if (newGrid[row][col + 1].value >= 15) {
              newGrid[row][col + 1].locked = true;
            }
          }
        }
      }

      // Rule B: Divisible by 5 → increment below cell
      if (newValue % 5 === 0) {
        if (row < GRID_SIZE - 1) {
          if (!newGrid[row + 1][col].locked) {
            newGrid[row + 1][col].value += 2;

            if (newGrid[row + 1][col].value >= 15) {
              newGrid[row + 1][col].locked = true;
            }
          }
        }
      }

      return newGrid;
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 gap-6">
      <div className="grid grid-cols-3 gap-4">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
  key={`${rowIndex}-${colIndex}`}
  onClick={() => handleClick(rowIndex, colIndex)}
  className={`w-24 h-24 rounded-[4px] shadow-[2px_2px_0px_black] flex items-center justify-center text-2xl font-bold select-none ${
    cell.locked
      ? "bg-red-600 text-white cursor-not-allowed"
      : cell.value % 2 === 0
      ? "bg-[#e0e0e0] text-gray-900 cursor-pointer"
      : "bg-[#1a237e] text-white cursor-pointer"
  }`}
>
  {cell.value}
</div>

          ))
        )}
      </div>
      <button
      onClick={() => setGrid(createInitialGrid())}
      className="text-sm px-4 py-1 border border-gray-500 rounded-[4px] text-gray-300 hover:text-white hover:border-white transition-colors"

    >
      Reset
    </button>
    </div>
  );
}

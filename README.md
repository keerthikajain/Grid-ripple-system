# Grid Ripple System

This project is a 3x3 interactive grid built using Next.js and Tailwind CSS.  
It implements custom ripple logic and a locking mechanism based on number rules.

The goal was to build a clean, predictable state system that handles edge cases properly and follows the exact visual and logical constraints provided in the assignment.


## How It Works

Each cell in the grid stores:

- value (number)
- locked (boolean)

All cells start at 0.

Clicking a cell increases its value by 1.  
After each click, specific ripple rules may affect neighboring cells.


## Ripple Rules

After a cell is incremented:

- If the new value is divisible by 3  
  → The cell immediately to the right is decremented by 1  
  → If the cell is in the last column, nothing happens  

- If the new value is divisible by 5  
  → The cell immediately below is incremented by 2  
  → If the cell is in the bottom row, nothing happens  

Ripple effects apply only once per click and do not cascade further.


## Locking Behavior

If any cell reaches 15 or more:

- It turns red
- It becomes locked
- It cannot be clicked
- It cannot be modified by ripple effects


## Visual Design

- 3x3 grid centered on screen
- Even numbers → Light gray (#e0e0e0)
- Odd numbers → Navy blue (#1a237e) with white text
- Locked cells → Red with white text
- Rounded corners: 4px
- Shadow: 2px 2px 0px black

The styling strictly follows the assignment requirements.

## Technical Approach

- The grid is represented as a 2D array.
- State updates are handled immutably using structuredClone.
- Boundary checks prevent crashes at the edges.
- Ripple logic is deterministic and non-recursive.
- Locked state is enforced at both click and ripple levels.

The focus was to keep the logic clean, predictable, and easy to reason about.


## Design Decisions

- Used a 2D array to naturally represent row and column relationships.
- Ripple logic is applied once per click to maintain deterministic behavior.
- Explicit boundary checks prevent edge crashes.
- Locked state is validated before any modification to preserve rule integrity.


## Running Locally

npm install
npm run dev

Then open:
http://localhost:3000

## Deployment

The project is deployed using Vercel (Hobby tier).

## Author 

Keerthika Jain

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"The Drain" is an interactive horror story web application presented as a retro terminal interface. It's a text-based adventure where players navigate through a horror narrative involving a creature emerging from a kitchen sink drain, with combat mechanics and multiple endings.

**Tech Stack:**
- React 19 with hooks (no class components)
- Vite for build tooling
- Vanilla CSS (no CSS-in-JS or preprocessors)
- ESLint for linting
- GitHub Pages for deployment

**Live Site:** drain.ohkayblanket.com

## Development Commands

```bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Architecture

### Game State Management

The entire game is driven by a **reducer pattern** in `src/hooks/useGameState.js`. This is the single source of truth for all game logic.

**Game Phases:**
1. `welcome` - Title screen
2. `intro` - Story narration (14 segments)
3. `combat` - Fight/run mechanics
4. `ended` - Game over (victory, death, or escape)

**Critical State Fields:**
- `outputLines` - Array of line objects with `{ id, text, speed, isUserInput?, isHealthStats? }`
- `isTyping` - Boolean controlling input blocking during text animation
- `skipTyping` - Counter that triggers skip animation
- `phase` - Current game phase
- `playerHealth` / `creatureHealth` - Combat stats (not displayed but used for logic)

### Sequential Typing System

Text types out **sequentially**, not simultaneously. This is managed in `TerminalOutput.jsx`:

1. Track `completedLines` Set with line IDs
2. Before rendering a line, check if previous non-user-input, non-health-stats line is complete
3. If not complete, return `null` (don't render yet)
4. When a line completes typing, add its ID to `completedLines`

**Important:** When new lines are added, preserve completed line IDs that still exist (don't reset the Set completely).

### Input Handling

**Dual Input System:**
- **Desktop:** Global keydown listener in `TerminalContainer.jsx` (lines 39-60)
- **Mobile:** On-screen keyboard component (`OnScreenKeyboard.jsx`)

**Critical:** No hidden input fields are used to prevent mobile keyboard popup. Input is managed entirely through state and event listeners.

Current input is displayed inline at the bottom of terminal output with a blinking cursor.

### Line Types

Lines in `outputLines` array have special flags:

- `isUserInput: true` - Echoed user commands (display with `#` prefix, no typing animation)
- `isHealthStats: true` - Hidden placeholder lines (return `null` in render)
- Regular lines - Story/combat text with typing animation

### Command Processing

Commands are parsed in `utils/commandParser.js` based on current phase:

**Welcome Phase:** Any key advances
**Intro Phase:** Enter to continue, "skip" to fast-forward
**Combat Phase:** "fight" or "run"
**Ended Phase:** "reset" to restart

## Styling & Visual Design

**Retro Terminal Aesthetic:**
- Glass TTY VT220 font (loaded from `/public/Glass_TTY_VT220.ttf`)
- Green terminal text (#81fc16) with glow effect
- Dark background (#222)
- Vintage beige computer border (#d0c9be)
- 80s-style trapezoidal keyboard keys (mobile only)

**Viewport:** Uses `100dvh` (dynamic viewport height) to account for mobile address bars

**Scrolling:** Auto-scrolls terminal output every 100ms + on line completion. Scrollbar is hidden but scrolling is functional.

## Data Organization

**Story Content** (`src/data/story.js`):
- `storySegments` - 14 intro segments with typing speeds
- `welcomeMessage` - Title screen text

**Combat Logic** (`src/data/combat.js`):
- `calculateFightOutcome()` - RNG-based combat with 6 body part descriptions
- `calculateRunOutcome()` - 33% success rate
- Victory/death message getters

**Speed Values:** Lower = faster typing (30-60ms typical range)

## Deployment

**GitHub Pages Setup:**
- CNAME file in `/public/CNAME` (copied to dist during build)
- Custom domain: drain.ohkayblanket.com
- Vite config has `base: '/'` for custom domain
- Deploy command builds and pushes to `gh-pages` branch

**Important:** The CNAME file MUST be in `/public/` to be included in the build output.

## Key Implementation Patterns

### Adding New Story Segments

1. Add to `storySegments` array in `src/data/story.js`
2. Each segment: `{ text: "...", speed: 30 }`
3. Speed determines typing animation rate

### Adding New Combat Outcomes

1. Add description to `bodyParts` array in `src/data/combat.js`
2. RNG in `calculateFightOutcome()` selects random index
3. Damage calculation is separate from message selection

### Modifying Game Phases

All phase transitions happen in `useGameState.js` reducer. Look for:
- `ADVANCE_STORY` - Progressing intro
- `FIGHT` / `RUN` - Combat actions
- `RESET` - Restart game

### Adding New Commands

1. Update `parseCommand()` in `utils/commandParser.js`
2. Add case to command switch in `App.jsx`
3. Add reducer case in `useGameState.js`

## Common Gotchas

1. **Lines typing simultaneously:** Ensure sequential typing logic properly checks `completedLines` Set
2. **Mobile keyboard popup:** Never use real input elements; use event listeners only
3. **Completed lines disappearing:** When adding new lines, filter `completedLines` to preserve IDs that still exist
4. **Input not enabled:** Check that `TYPING_COMPLETE` finds the last **non-userInput, non-healthStats** line
5. **CNAME missing after deploy:** CNAME must be in `/public/` directory

## File Structure

```
src/
├── components/Terminal/
│   ├── TerminalContainer.jsx    # Input handling + layout
│   ├── TerminalOutput.jsx       # Line rendering + sequential typing
│   ├── TypedLine.jsx            # Single line typing animation
│   ├── OnScreenKeyboard.jsx     # Mobile keyboard UI
│   └── Terminal.css             # All terminal styles
├── hooks/
│   └── useGameState.js          # Game state reducer (CORE LOGIC)
├── data/
│   ├── story.js                 # Story text content
│   └── combat.js                # Combat mechanics
├── utils/
│   └── commandParser.js         # Command parsing by phase
├── App.jsx                      # Root component + command dispatcher
└── main.jsx                     # React root render

public/
├── CNAME                        # Custom domain config
├── Glass_TTY_VT220.ttf          # Terminal font
└── vt52.otf                     # Alternative font (unused)
```

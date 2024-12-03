import { useEffect, useState } from "react";
import "./App.css";
import replay from "./replay.png";
import xtrophy from "./xtrophy.png";
import otrophy from "./otrophy.png";
import reset from "./reset.png";

function App() {
  const [player, setplayer] = useState("X");
  const [cells, setcells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [xrole, setxrole] = useState(true);
  const [orole, setorole] = useState(false);
  const [winx, setwinx] = useState(false);
  const [wino, setwino] = useState(false);
  const [numberXwin, setnumberXwin] = useState(0);
  const [numberOwin, setnumberOwin] = useState(0);
  const [mode, setmode] = useState("PvP");
  const [aimode, setaimode] = useState(false);
  const handllecells = (index) => {
    const newcells = cells.map((item, i) => {
      if (i === index) {
        if (xrole === true && orole === false && (item === "X" || item === ""))
          return "X";
        else if (
          xrole === false &&
          orole === true &&
          (item === "O" || item === "")
        )
          return "O";
      }
      return item;
    });
    setcells(newcells);
  };
  const switchroles = () => {
    if (xrole === true && orole === false) {
      setxrole(false);
      setorole(true);
    } else {
      setorole(false);
      setxrole(true);
    }
  };
  const switchaimodes = () => {
    if (aimode === false) {
      setxrole(false);
      setaimode(true);
      setorole(true);
    } else {
      setxrole(true);
      setaimode(false);
      setorole(false);
    }
  };
  const handlewin = () => {
    if (
      (cells[0] === cells[1] && cells[0] === cells[2] && cells[0] === "X") ||
      (cells[3] === cells[4] && cells[3] === cells[5] && cells[3] === "X") ||
      (cells[6] === cells[7] && cells[6] === cells[8] && cells[6] === "X") ||
      (cells[0] === cells[3] && cells[0] === cells[6] && cells[0] === "X") ||
      (cells[1] === cells[4] && cells[1] === cells[7] && cells[1] === "X") ||
      (cells[2] === cells[5] && cells[2] === cells[8] && cells[2] === "X") ||
      (cells[0] === cells[4] && cells[0] === cells[8] && cells[0] === "X") ||
      (cells[2] === cells[4] && cells[2] === cells[6] && cells[2] === "X")
    ) {
      setwinx(true);
      setwino(false);
    } else if (
      (cells[0] === cells[1] && cells[0] === cells[2] && cells[0] === "O") ||
      (cells[3] === cells[4] && cells[3] === cells[5] && cells[3] === "O") ||
      (cells[6] === cells[7] && cells[6] === cells[8] && cells[6] === "O") ||
      (cells[0] === cells[3] && cells[0] === cells[6] && cells[0] === "O") ||
      (cells[1] === cells[4] && cells[1] === cells[7] && cells[1] === "O") ||
      (cells[2] === cells[5] && cells[2] === cells[8] && cells[2] === "O") ||
      (cells[0] === cells[4] && cells[0] === cells[8] && cells[0] === "O") ||
      (cells[2] === cells[4] && cells[2] === cells[6] && cells[2] === "O")
    ) {
      setwino(true);
      setwinx(false);
    } else {
      setwino(false);
      setwinx(false);
    }
  };
  const handlereplay = () => {
    const newcells = ["", "", "", "", "", "", "", "", ""];
    setcells(newcells);
    setwino(false);
    setwinx(false);
    setxrole(true);
    setorole(false);
  };
  const notempty = cells.every((item) => item !== "");
  useEffect(() => {
    if (winx) {
      setnumberXwin((prev) => prev + 1);
    } else if (wino) {
      setnumberOwin((prev) => prev + 1);
    } else {
      setnumberXwin(numberXwin);
      setnumberOwin(numberOwin);
    }
  }, [winx, wino]);

  const Aimode = () => {
    setaimode(true);
    const indexcells = cells
      .map((item, i) => (item === "" ? i : null))
      .filter((i) => i !== null);
    if (indexcells.length > 0) {
      const random = Math.floor(Math.random() * indexcells.length);
      const newcells = cells.map((item, i) =>
        i === indexcells[random] ? (item = "O") : item
      );
      setcells(newcells);
      setxrole(true);
      setorole(false);
    }
  };
  useEffect(() => {
    handlewin();
  }, [xrole, orole, wino, winx]);
  useEffect(() => {
    if (aimode && !xrole && orole && !winx && !wino) Aimode();
  }, [aimode, xrole, orole, wino, winx]);

  const handleresetscore = () => {
    setnumberOwin(0);
    setnumberXwin(0);
  };

  return (
    <body>
      <section>
        <div className="title-mode">
          <h1>Tic-Tac-Toe</h1>
          <div className="modes-buttons">
            <button
              id={aimode ? "" : "ai"}
              className="mode"
              onClick={() => {
                Aimode();
                switchaimodes();
                handlereplay();
              }}
            >
              PvP
            </button>
            <button
              id={aimode ? "ai" : ""}
              onClick={() => {
                Aimode();
                handlereplay();
              }}
              className="mode"
            >
              vs AI
            </button>
          </div>
        </div>
        <div className="X-O-Scores">
          <div className="xscore">
            <img src={xtrophy} alt="" />
            <p id="xscorenumber">{numberXwin}</p>
          </div>
          <div className="oscore">
            <p id="oscorenumber">{numberOwin}</p>
            <img src={otrophy} alt="" />
          </div>
        </div>
        <main>
          {cells.map((item, index) => {
            return (
              <div
                className="cells"
                id={item === "O" ? "o" : ""}
                onClick={() => {
                  handllecells(index);
                  switchroles();
                }}
                key={index}
              >
                {item}
              </div>
            );
          })}
        </main>
        <div className="currentWin">
          {winx || wino ? (
            <h1>
              Winner: <span>{winx ? "X" : "O"}</span>
            </h1>
          ) : (
            <h1>
              Current Player:
              <span id={orole ? "0" : "X"}>{xrole ? "X" : "O"}</span>
            </h1>
          )}
        </div>
        <div className="buttons-replay-reset">
          <button
            className="Replay"
            id={winx || wino || notempty ? "showbutton" : ""}
            onClick={handlereplay}
          >
            <img src={replay} alt="" /> Replay
          </button>
          <button
            className="Replay"
            id={winx || wino || notempty ? "showbutton" : ""}
            onClick={handleresetscore}
          >  <img src={reset} alt="" />
             Reset score
          </button>
        </div>
      </section>
    </body>
  );
}

export default App;

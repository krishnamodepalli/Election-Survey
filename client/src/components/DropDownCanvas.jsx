import './DropDownCanvas.css';

export function closeCanvas () {
  // getting the canvas
  const canvas = document.getElementsByClassName('dropdown-canvas')[0];
  canvas.style.top = "-100%";
}

export default function DropDownCanvas({ children }) {
  return (
      <div className="dropdown-canvas">
        {/* this will have a small btn to toggle the canvas */}
        <div className="dd-canvas-nav">
          <span className="dd-canvas-close" onClick={closeCanvas}>
            close &nbsp;
            <i className="fa-solid fa-x fa-xl" style={{
              fontsize: '4rem',
            }}></i>
          </span>
        </div>
        {children}
      </div>
  );
};

import './Toggle.css';

const Toggle = ({leftLabel, rightLabel, onToggle = () => null}) => {
  const toggle = (event) => {
    const target = event.target;
    const parent = target.parentElement;

    parent.classList.toggle('left-enabled');
    parent.classList.toggle('right-enabled');

    target.classList.toggle('toggle-left');
    target.classList.toggle('toggle-right');

    // performing the event specified
    onToggle();
  }
  return (
      <table className="toggle-wrapper">
        <tbody>
        <tr>
          <td colSpan={2} align={"center"}>
            <div className="toggle-container left-enabled">
              <div className="toggler toggle-left" onClick={toggle}></div>
            </div>
          </td>
        </tr>
        <tr className="toggle-labels">
          <td>{leftLabel}</td>
          <td>{rightLabel}</td>
        </tr>
        </tbody>
      </table>
  );
};

export default Toggle;

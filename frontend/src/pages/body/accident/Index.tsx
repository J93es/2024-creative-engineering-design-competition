import AccidentControl from "pages/body/accident/AccidentControl";
import AccidentInfo from "pages/body/accident/AccidentInfo";

function Accident() {
  return (
    <div className="card d-flex justify-content-center m-3">
      <div className="card-header h3">사고 정보 관리</div>
      <div className="card-body">
        <AccidentInfo />
        <AccidentControl />
      </div>
    </div>
  );
}

export default Accident;

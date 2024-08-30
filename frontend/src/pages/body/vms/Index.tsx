import VmsControl from "pages/body/vms/VmsControl";
import VmsInfo from "pages/body/vms/VmsInfo";

function Vms() {
  return (
    <div className="card d-flex justify-content-center m-3">
      <div className="card-header h3">VMS 관리</div>
      <div className="card-body">
        <VmsInfo />
        <VmsControl />
      </div>
    </div>
  );
}

export default Vms;

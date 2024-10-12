import VmsControl from "pages/body/vms/VmsControl";
import VmsTransmissionStatus from "pages/body/vms/VmsTransmissionStatus";
import GrafanaCard from "component/GrafanaCard";

function Vms() {
  return (
    <div>
      <GrafanaCard
        title="VMS 송출 현황"
        childrenJsx={<VmsTransmissionStatus />}
      />
      <GrafanaCard title="VMS 관리" childrenJsx={<VmsControl />} />
    </div>
  );
}

export default Vms;

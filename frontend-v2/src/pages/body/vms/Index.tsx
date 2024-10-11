import VmsControl from "pages/body/vms/VmsControl";
import VmsInfo from "pages/body/vms/VmsInfo";
import GrafanaCard from "component/GrafanaCard";

function Vms() {
  return (
    <div>
      <GrafanaCard title="VMS 정보" childrenJsx={<VmsInfo />} />
      <GrafanaCard title="VMS 관리" childrenJsx={<VmsControl />} />
    </div>
  );
}

export default Vms;

import SystemControl from "pages/body/tunnel-system/SystemControl";
import GrafanaCard from "component/GrafanaCard";

export default function TunnelSystem() {
  return (
    <div>
      <GrafanaCard title="시스템 관리" childrenJsx={<SystemControl />} />
    </div>
  );
}

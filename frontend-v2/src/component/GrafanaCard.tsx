import "component/Garafana.css";

export default function GrafanaCard({
  title,
  childrenJsx,
}: {
  title: string;
  childrenJsx: React.JSX.Element;
}) {
  return (
    <div className="gf-card">
      <h2 className="gf-h2">{title}</h2>
      <div className="gf-text-color">{childrenJsx}</div>
    </div>
  );
}

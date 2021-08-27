import * as AntIcons from "@ant-design/icons";

export default function Icon({ name, ...props }) {
  if (!name) return null;

  const AntIcon = AntIcons[name];
  return <AntIcon {...props} />;
}

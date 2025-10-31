import { HeartHandshake } from "lucide-react";

type Props = {
  iconColor: string;
  logoColor: string;
  iconSize: number;
  logoSize: "xl" | "2xl" | "3xl" | "4xl";
};

const Logo = ({
  iconColor = "indigo-600",
  iconSize = 7,
  logoColor = "indigo-600",
  logoSize,
}: Props) => {
  return (
    <div className={`flex items-center space-x-2 text-lg font-bold`}>
      <HeartHandshake
        className={`h-${iconSize} w-${iconSize} text-${iconColor}`}
      />
      <span className={`text-${logoColor} text-${logoSize}`}>
        CommunityConnect
      </span>
    </div>
  );
};

export default Logo;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ElementType;
  valueColorClass?: string;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  valueColorClass = "text-primary",
  className,
}) => {
  return (
    <Card className={cn(
      "overflow-hidden border-none shadow-sm bg-white hover:shadow-md transition-all duration-300 group rounded-2xl",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-gray-50 group-hover:bg-primary/5 transition-colors">
            {Icon && <Icon className="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors" />}
          </div>
          <div className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600">
            +12%
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <div className={cn("text-3xl font-extrabold tracking-tight", valueColorClass)}>
            {value}
          </div>
          <p className="text-xs text-gray-400 mt-2 font-medium">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;


import { Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const HelperHeader = () => {
  return (
    <div className="flex items-center justify-between h-[50px] bg-black text-white p-2">
      <div className="flex gap-2">
        <Button variant="success" className="flex items-center gap-1">
          <Save size={16} />
          Save
        </Button>
        <Button variant="secondary" className="flex items-center gap-1">
          <Share2 size={16} />
          Share
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <small>Current Language:</small>
        <Select defaultValue="html">
          <SelectTrigger className="w-[110px] focus:ring-0">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">Javascript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

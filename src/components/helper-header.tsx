import { Loader2, Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LanguageState, changeLanguage } from "@/redux/slices/language-slice";
import { ApiError, handleError } from "@/utils/handle-error";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const HelperHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const fullCode = useAppSelector((state) => state.language.fullCode);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/compiler/save", {
        fullCode,
      });
      navigate(`/compiler/${response.data.data}`, { replace: true });
    } catch (error) {
      handleError(error as ApiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between h-[50px] bg-black text-white p-2">
      <div className="flex gap-2">
        <Button
          className="flex items-center gap-1"
          variant="success"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving..
            </>
          ) : (
            <>
              <Save size={16} />
              Save
            </>
          )}
        </Button>
        <Button className="flex items-center gap-1" variant="secondary">
          <Share2 size={16} />
          Share
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <small>Current Language:</small>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(changeLanguage(value as LanguageState["currentLanguage"]))
          }
        >
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

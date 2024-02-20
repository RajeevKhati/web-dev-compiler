import { Code, Copy, Loader2, Save, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { BASE_URL } from "@/utils/base-url";

export const HelperHeader = () => {
  const navigate = useNavigate();
  const { urlId } = useParams();
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const fullCode = useAppSelector((state) => state.language.fullCode);
  const [loading, setLoading] = useState(false);

  const showShareButton = !!urlId;

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/compiler/save`, {
        fullCode,
      });
      navigate(`/compiler/${response.data.data}`, { replace: true });
    } catch (error) {
      handleError(error as ApiError);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyClick = () => {
    window.navigator.clipboard.writeText(window.location.href);
    toast("URL copied to clipboard!!");
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
        {showShareButton ? (
          <Dialog>
            <DialogTrigger className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex items-center gap-1">
              <Share2 size={16} />
              Share
            </DialogTrigger>
            <DialogContent className="p-4">
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center gap-2 mb-3">
                  <Code size={20} />
                  Share your code
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-2 items-center">
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      disabled
                      className="w-full p-2 rounded bg-slate-800 text-slate-400 select-none"
                      value={window.location.href}
                    />
                    <Button variant="outline" onClick={handleCopyClick}>
                      <Copy size={16} />
                    </Button>
                  </div>

                  <p>Share this URL to collaborate!!</p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : null}
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

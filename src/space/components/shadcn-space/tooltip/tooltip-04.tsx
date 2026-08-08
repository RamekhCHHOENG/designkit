import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RoundedTooltipDemo = () => {
  return (
     <Tooltip>
      <TooltipTrigger render={
        <Button variant='outline'>
          Rounded
        </Button>
      } />
      <TooltipContent className='rounded-full'>
        <p>This tooltip is rounded</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default RoundedTooltipDemo;

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const TooltipDirectionsDemo = () => {
  return (
    <div className='flex flex-wrap gap-2'>
      <Tooltip>
        <TooltipTrigger render={<Button variant='outline'>Left</Button>} />
        <TooltipContent side='left'>Left</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant='outline'>Top</Button>} />
        <TooltipContent side='top'>Top</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant='outline'>Bottom</Button>} />
        <TooltipContent side='bottom'>Bottom</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant='outline'>Right</Button>} />
        <TooltipContent side='right'>Right</TooltipContent>
      </Tooltip>
    </div>
  )
}

export default TooltipDirectionsDemo

import LogoSvg from '@/app/assets/svg/logo'
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoSvg className='size-8.5' />
      <span className='text-xl dark:text-[#A78BFA] font-semibold'>NinnaHub</span>
    </div>
  )
}

export default Logo

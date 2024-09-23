import { Button } from '@/components/ui/button'
import Navigation from './navigation'
// import logo from '@assets/images/logoW.webp'
import { PanelLeftCloseIcon, PanelLeftOpenIcon, ShoppingBag } from 'lucide-react'
import { useSidebar } from '@/context/siderbarContext'
import { CardTitle } from '@/components/ui/card'

const Aside = () => {
  const { isContract, toggleContract } = useSidebar()

  return (
    <aside className='hidden md:flex md:flex-col h-[100dvh] relative border-r bg-background border bg-light-bg-primary'>
    {/* <aside className='hidden md:flex md:flex-col h-[100dvh] relative border-r dark:bg-dark-bg-secondary bg-light-bg-primary'> */}
      <div
        className={'h-14 border-b lg:h-[60px] border-secondary bg-dark-primary-foreground flex gap-3 px-4 items-center justify-center relative shrink-0 text-light-text-primary dark:text-dark-text-primary font-medium text-lg'}
      >
        <div className={`${isContract ? 'hidden' : ''} flex items-center gap-3 w-full justify-center px-4`}>
          <ShoppingBag className='text-light-primary'/>
          <CardTitle>FashionScape</CardTitle>
        </div>
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleContract}
          className={`shrink-0 h-8 w-8 ${isContract ? 'text-black' : 'text-light-primary'}`}
          title={isContract ? 'Expandir menú' : 'Contraer menú'}
        >
          {isContract ? <PanelLeftOpenIcon strokeWidth={1.5} /> : <PanelLeftCloseIcon strokeWidth={1.5} />}
        </Button>
      </div>
      <Navigation />
    </aside>
  )
}

export default Aside

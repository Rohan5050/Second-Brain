import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { Sidebaritem } from "./Sidebaritem";
import { Logo } from "../Icons/Logo";


 export function Sidebar () {
  return (<div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-2">
    <div className="flex text-2xl pt-8 items-center">
        <div className="pl-2 pr-6 text-purple-400">
            <Logo />
        </div>
        Second Brain
    </div>
    <div className="pt-8 pl-4">
      <Sidebaritem text="Twitter" icon={<TwitterIcon />} />
      <Sidebaritem text="Youtube" icon={<YoutubeIcon />} />
    </div>
  </div>
  )
}

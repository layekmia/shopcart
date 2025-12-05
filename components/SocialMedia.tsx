import { Facebook, Github, Linkedin, TwitterIcon, } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
   className?: string;
   iconClassName?: string;
   tooltipClassName?: string;
}

const socialLink = [
   {
      title: 'Twitter', href: '/', icon: <TwitterIcon className="w-5 h-5" />
   },
   {
      title: "Github", href: '/', icon: <Github className="w-5 h-5" />
   },
   {
      title: "Linkedin", href: '/', icon: <Linkedin className="w-5 h-5" />
   },
   {
      title: 'Facebook', href: '/', icon: <Facebook className="w-5 h-5" />
   }
]

export default function SocialMedia({ className, iconClassName, tooltipClassName }: Props) {
   
   return (
      <TooltipProvider>
         <div className={cn("flex items-center gap-3.5", className)}>
            {socialLink?.map(item =>
               <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                     <Link rel="noopener noreferrer" href={item?.href} className={cn("p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect", iconClassName)}>
                        {item?.icon}
                     </Link>
                  </TooltipTrigger>
                  <TooltipContent className={cn("")}>
                     {item?.title}
                  </TooltipContent>
               </Tooltip>)}
         </div>
      </TooltipProvider>
   )
}
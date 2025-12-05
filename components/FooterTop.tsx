import { Clock, Mail, MapPin, Phone } from "lucide-react";

interface ContactItemData {
   title: string;
   subtitle: string;
   icon: React.ReactNode;
}

const data: ContactItemData[] = [
   {
      title: 'Visit Us',
      subtitle: "New Orlean, USA",
      icon: <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
   },
   {
      title: 'Call Us',
      subtitle: "+8801794700226",
      icon: <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
   },
   {
      title: 'Working Hours',
      subtitle: "Mon - Sat 10:00 AM - 7:00 PM",
      icon: <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
   },
   {
      title: 'Email Us',
      subtitle: "support@gmail.com",
      icon: <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
   }
]


export default function FooterTop() {
   return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b p-4">{data.map((item, index) => <ContactItem key={index + 1} item={item} />)}</div>
   )
}

function ContactItem({ item }: { item: ContactItemData }) {
   return <div>
      <div className="flex items-center gap-3 group hover:bg-gray-50 hoverEffect">
         {item?.icon}
         <div>
            <h3 className="font-semibold text-gray-900
             group-hover:text-black hoverEffect">{item?.title}</h3>
            <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 hoverEffect">{item.subtitle}</p>
         </div>
      </div>

   </div>

}
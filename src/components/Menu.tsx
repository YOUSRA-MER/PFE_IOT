import Link from "next/link";
import Image from "next/image";
const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Dashboard",
        href: "/admin",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/utilisateur.png",
        label: "Administrateurs",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Managers",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Employees",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/class.png",
        label: "Attendance",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Reports",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
     


      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
      
      {
        icon: "/calendar.png",
        label: "Work Schedule",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/settings.png",
        label: "Settings",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
     
    ],
  },
];

const Menu = () => {
  return (
    <div className='mt-4 text-sm'>
      {menuItems.map(i=>(
        <div className='flex flex-col gap-2' key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4 ">{i.title}</span>
          {i.items.map(item=>(
            <Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2">
            <Image src={item.icon} alt="" width={20} height={20}/>
            <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
    </div>
  ))}
  </div>
  )
}

export default Menu
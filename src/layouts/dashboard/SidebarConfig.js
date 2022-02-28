import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import settingsFill from "@iconify/icons-eva/settings-fill";
import clipboardTaskListLtr20Filled from "@iconify/icons-fluent/clipboard-task-list-ltr-20-filled";
import awardIcon from "@iconify/icons-fa-solid/award";
import umbrellaBeach from "@iconify/icons-fa-solid/umbrella-beach";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/home",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "associates",
    // path: "/dashboard/associates",
    icon: getIcon(peopleFill),
    children: [
      {
        title: "all associates",
        path: "/dashboard/associates/",
      },
      {
        title: "New Associate",
        path: "/dashboard/associates/newassociate",
      },
    ],
  },
  // {
  //   title: "login",
  //   path: "/login",
  //   icon: getIcon(lockFill),
  // },
  {
    title: "Tasks",
    path: "/tasks",
    icon: getIcon(clipboardTaskListLtr20Filled),
  },
  {
    title: "Holidays",
    path: "/holidays",
    icon: getIcon(umbrellaBeach),
  },
  {
    title: "Thanks",
    path: "/thanks",
    icon: getIcon(awardIcon),
    children: [
      {
        title: "all thanks",
        path: "/thanks",
      },
      {
        title: "Give thanks",
        path: "/thanks/givethanks",
      },
    ],
  },
  // {
  //   title: "register",
  //   path: "/dashboard/register",
  //   icon: getIcon(personAddFill),
  // },
  {
    title: "admin",
    path: "/admin",
    icon: getIcon(settingsFill),
    children: [
      {
        title: "Database",
        path: "/admin/database",
      },
      {
        title: "Import Data",
        path: "/admin/import",
      },
    ],
  },
  // {
  //   title: "Not found",
  //   path: "/dashboard/error",
  //   icon: getIcon(alertTriangleFill),
  // },
];

export default sidebarConfig;

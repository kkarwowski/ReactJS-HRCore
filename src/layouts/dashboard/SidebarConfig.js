import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
// import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
// import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import personFill from "@iconify/icons-eva/person-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import settingsFill from "@iconify/icons-eva/settings-fill";
import clipboardTaskListLtr20Filled from "@iconify/icons-fluent/clipboard-task-list-ltr-20-filled";
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
  {
    title: "login",
    path: "/login",
    icon: getIcon(lockFill),
  },
  {
    title: "My Tasks",
    path: "/dashboard/tasks",
    icon: getIcon(clipboardTaskListLtr20Filled),
  },
  {
    title: "register",
    path: "/dashboard/register",
    icon: getIcon(personAddFill),
  },
  {
    title: "admin",
    path: "/dashboard/admin",
    icon: getIcon(settingsFill),
    children: [
      {
        title: "Database",
        path: "/dashboard/admin/database",
      },
      {
        title: "Import Data",
        path: "/dashboard/admin/import",
      },
    ],
  },
  {
    title: "Not found",
    path: "/dashboard/error",
    icon: getIcon(alertTriangleFill),
  },
];

export default sidebarConfig;

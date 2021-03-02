import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
	{
		title: "Sessions",
		path: "/sessions",
		icon: <FaIcons.FaCalendarAlt />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "My Sessions",
				path: "/sessions/my-sessions",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Requests",
				path: "/sessions/requests",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
	{
		title: "Calls",
		path: "/calls",
		icon: <IoIcons.IoMdCall />,
	},
	{
		title: "Patients",
		path: "/patients",
		icon: <FaIcons.FaUserAlt />,
	},
	{
		title: "Media",
		path: "/media",
		icon: <FaIcons.FaFileVideo />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,
		subNav: [
			{
				title: "All Media",
				path: "/media/all",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Downloads",
				path: "/media/downloads",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
];

CREATE TABLE `about_page` (
	`id` int AUTO_INCREMENT NOT NULL,
	`whatIsDockly` text NOT NULL,
	`whatDocklyDoes` text NOT NULL,
	`whatDocklyDoesNot` text NOT NULL,
	`ethicalCommitment` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `about_page_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`action` varchar(100) NOT NULL,
	`entityType` varchar(100) NOT NULL,
	`entityId` int NOT NULL,
	`changes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `boarding_steps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`approximateTime` varchar(100) NOT NULL,
	`commonErrors` text NOT NULL,
	`candidateActions` text NOT NULL,
	`shipperRequests` text NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `boarding_steps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fraud_signals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`signal` text NOT NULL,
	`category` varchar(50) NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fraud_signals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `legal_disclaimers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `legal_disclaimers_id` PRIMARY KEY(`id`),
	CONSTRAINT `legal_disclaimers_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `myths` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`verdict` varchar(50) NOT NULL,
	`shortDescription` text NOT NULL,
	`detailedExplanation` text NOT NULL,
	`details` text NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `myths_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `requirements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(100) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `requirements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `salary_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`department` varchar(100) NOT NULL,
	`position` varchar(255) NOT NULL,
	`minSalary` int NOT NULL,
	`maxSalary` int NOT NULL,
	`tips` varchar(100),
	`notes` text,
	`order` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `salary_data_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `work_areas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`functions` text NOT NULL,
	`requirements` text NOT NULL,
	`entryLevel` varchar(50) NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `work_areas_id` PRIMARY KEY(`id`)
);

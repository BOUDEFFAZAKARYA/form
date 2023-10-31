CREATE TABLE `carts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`paymentIntentId` varchar(191),
	`clientSecret` varchar(191),
	`items` json DEFAULT ('null'),
	`closed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`images` json DEFAULT ('null'),
	`category` enum('skateboards','clothing','shoes','accessories') NOT NULL DEFAULT 'skateboards',
	`subcategory` varchar(191),
	`price` decimal(10,2) NOT NULL DEFAULT '0',
	`inventory` int NOT NULL DEFAULT 0,
	`rating` int NOT NULL DEFAULT 0,
	`tags` json DEFAULT ('null'),
	`storeId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stores` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`slug` text,
	`active` boolean NOT NULL DEFAULT false,
	`stripeAccountId` varchar(191),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `stores_id` PRIMARY KEY(`id`)
);

CREATE TABLE `pokemon` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`pkId` int NOT NULL,
	`bufferQrCode` text NOT NULL,
	CONSTRAINT `pokemon_id` PRIMARY KEY(`id`)
);

ALTER TABLE "customer" DROP CONSTRAINT "customer_Email_unique";--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "firstName" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "lastName" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "phoneNumber" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "address" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "verificationCode" varchar(6);--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "isVerified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "FirstName";--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "LastName";--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "Email";--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "PhoneNumber";--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "Address";
ALTER TABLE "customer" ADD COLUMN "verificationCode" varchar(10);--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "isVerified" boolean DEFAULT false;
ALTER TABLE "customer" ADD COLUMN "verificationCode" varchar(6);--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "isVerified" boolean DEFAULT false;
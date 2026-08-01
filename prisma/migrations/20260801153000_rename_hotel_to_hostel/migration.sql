-- The initial migration created this table as "Hotel". The Prisma model and
-- application have always used "Hostel", so rename the table without changing
-- or deleting any existing records.
ALTER TABLE "Hotel" RENAME TO "Hostel";

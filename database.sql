CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "pet" (
	"id" SERIAL PRIMARY KEY,
	"pet_name" VARCHAR(255) NOT NULL,
	"pet_type" VARCHAR(25) NOT NULL
);

CREATE TABLE "user_pet" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"pet_id" INT REFERENCES "pet" ON DELETE CASCADE,
	"role" VARCHAR(50) DEFAULT 'owner'
);

CREATE TABLE "care_item" (
	"id" SERIAL PRIMARY KEY,
	"pet_id" INT REFERENCES "pet" ON DELETE CASCADE,
	"description" VARCHAR(255) NOT NULL,
	"frequency" VARCHAR(25) NOT NULL,
	"start_date" DATE NOT NULL,
	"details" VARCHAR(500)
);

CREATE TABLE "pet_care_item" (
	"id" SERIAL PRIMARY KEY,
	"care_item_id" INT REFERENCES "care_item",
	"date_complete" DATE
);

CREATE TABLE "vet_note" (
	"id" SERIAL PRIMARY KEY,
	"pet_id" INT REFERENCES "pet" ON DELETE CASCADE,
	"date" DATE DEFAULT CURRENT_DATE,
	"vet" VARCHAR(255),
	"note" VARCHAR(1000)
);
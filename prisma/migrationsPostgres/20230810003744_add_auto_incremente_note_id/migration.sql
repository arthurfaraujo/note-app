-- AlterTable
CREATE SEQUENCE note_noteid_seq;
ALTER TABLE "note" ALTER COLUMN "noteId" SET DEFAULT nextval('note_noteid_seq');
ALTER SEQUENCE note_noteid_seq OWNED BY "note"."noteId";

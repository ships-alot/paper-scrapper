// here we going to insert to the papers database

// source: json file

// destination: database in supabase called papers

// Steps:
// 1. Read the papers.json file
// 2. Connect to the papers table in the database
// 3. Insert the papers from the json file to the database

import { readFileSync } from "fs";
import { supabase } from "./client";

const papersFromJson = readFileSync("papers.json", "utf-8");

export async function insertData() {
  const parsedForInsert = JSON.parse(papersFromJson).map(
    (paper: { title: string; summary: string; paper_id: string }) => {
      return {
        paper_id: paper.paper_id,
        title: paper.title,
        summary: paper.summary,
      };
    }
  );

  const { data, error } = await supabase.from("papers").upsert(parsedForInsert); // we are using upsert to avoid duplicates and update the existing ones

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully:", data);
  }
}

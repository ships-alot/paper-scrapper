import axios from "axios";
import { writeFileSync } from "fs";
import { parseStringPromise } from "xml2js";

async function fetchArxivPapers(): Promise<string> {
  const baseUrl = "http://export.arxiv.org/api/query";
  const params = {
    search_query: "cat:cs.AI", // Category: Artificial Intelligence
    start: 0,
    max_results: 5,
    sortBy: "submittedDate",
    sortOrder: "descending",
  };

  try {
    const response = await axios.get(baseUrl, { params });
    console.log(response.data); // XML data
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching papers: ${error.message}`);
  }
}

const formatString = (text: string) => {
  return text.replace(/\n/g, " ").trim();
};

const papers: any[] = [];

async function parseArxivXml(xml: string) {
  const json = await parseStringPromise(xml);
  const entries = json.feed.entry;
  entries.forEach((entry: any) => {
    try {
      papers.push({
        //replace new line chars with empty string
        title: formatString(entry.title[0]),
        summary: formatString(entry.summary[0]),
        arxiv_paper_id: entry.id[0].replace("http://arxiv.org/abs/", ""),
      });
    } catch (error: any) {
      console.log(`Error parsing entry: ${entry} ${error.message}`);
    }
  });

  writeFileSync("papers.json", JSON.stringify(papers, null, 2));
}

const run = async () => {
  parseArxivXml(await fetchArxivPapers());
};

run();

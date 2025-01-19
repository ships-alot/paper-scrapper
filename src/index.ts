import { supabase } from "./client";

export const getPaperListForNewsletter = async () => {
  const { data, error } = await supabase.from("papers").select("*");
  if (error) {
    console.log("error", error);
  } else {
    console.log(
      data.map((paper) => {
        return {
          title: paper.title,
          catchy_abstract: paper.catchy_abstract,
          pdfUrl: paper.arxiv_paper_id
            ? `https://arxiv.org/pdf/${paper.arxiv_paper_id}`
            : null,
        };
      })
    );
  }
};

getPaperListForNewsletter();
